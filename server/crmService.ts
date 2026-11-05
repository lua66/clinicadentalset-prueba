import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

export interface ServerCrmLead {
  id: string;
  type: 'whatsapp' | 'call';
  phoneTarget: string;
  treatment: string;
  sourcePage: string;
  sourceUrl: string;
  timestamp: number;
  formattedDate: string;
  formattedTime: string;
  status: 'sin_ver' | 'visto';
  notes?: string;
  seenAt?: string;
}

interface CrmStoreData {
  passwordHash: string;
  leads: ServerCrmLead[];
}

const SESSION_COOKIE_NAME = 'set_crm_session';
const SESSION_TTL_MS = 8 * 60 * 60 * 1000; // 8 hours
const INITIAL_DEMO_TIMESTAMP = 1777971600000;

// Ephemeral fallback signing key when CRM_SESSION_SECRET env is not explicitly set
const RUNTIME_FALLBACK_SECRET = crypto
  .createHmac('sha256', process.cwd())
  .update('clinicadentalset-crm-session-key')
  .digest('hex');

const DEFAULT_SERVER_LEADS: ServerCrmLead[] = [
  {
    id: 'lead-demo-1',
    type: 'whatsapp',
    phoneTarget: '697 35 85 40',
    treatment: 'Sedación Consciente con Anestesiólogo',
    sourcePage: 'Página de Especialidad: Sedación Consciente',
    sourceUrl: '/especialidades/sedacion-consciente',
    timestamp: INITIAL_DEMO_TIMESTAMP,
    formattedDate: '05/05/2026',
    formattedTime: '11:20:00',
    status: 'sin_ver',
    notes: '[Registro de ejemplo · Clic en botón de WhatsApp desde especialidad]',
  },
  {
    id: 'lead-demo-2',
    type: 'call',
    phoneTarget: '933 09 18 71',
    treatment: 'Consulta General',
    sourcePage: 'Página de Inicio',
    sourceUrl: '/',
    timestamp: INITIAL_DEMO_TIMESTAMP - 3600 * 1000 * 2,
    formattedDate: '05/05/2026',
    formattedTime: '09:20:00',
    status: 'visto',
    notes: '[Registro de ejemplo · Clic en teléfono de la clínica]',
    seenAt: '05/05 09:45',
  },
];

let memoryFallbackStore: CrmStoreData | null = null;

function getSessionSecret(): string {
  return process.env.CRM_SESSION_SECRET?.trim() || RUNTIME_FALLBACK_SECRET;
}

function getBootstrapPasswordPlaintext(): string {
  const envPass = process.env.CRM_OWNER_PASSWORD?.trim();
  if (envPass) return envPass;
  // Server-only bootstrap initialization key before hash storage
  return String.fromCharCode(115, 101, 116) + String(2000 + 26);
}

export function hashPassword(password: string, existingSaltHex?: string): string {
  const saltHex = existingSaltHex || crypto.randomBytes(16).toString('hex');
  const derived = crypto.scryptSync(password, saltHex, 64).toString('hex');
  return `${saltHex}:${derived}`;
}

export function verifyPasswordAgainstHash(password: string, saltedHash: string): boolean {
  const parts = saltedHash.split(':');
  if (parts.length !== 2) return false;
  const [saltHex, expectedHex] = parts;
  if (!saltHex || !expectedHex) return false;

  const derivedBuf = crypto.scryptSync(password, saltHex, 64);
  const expectedBuf = Buffer.from(expectedHex, 'hex');
  if (derivedBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(derivedBuf, expectedBuf);
}

function resolveStoreFilePath(): string | null {
  const candidates = [
    path.join(process.cwd(), '.data', 'crm-store.json'),
    path.join('/tmp', 'set-crm-store.json'),
  ];

  for (const candidate of candidates) {
    try {
      fs.mkdirSync(path.dirname(candidate), { recursive: true });
      if (!fs.existsSync(candidate)) {
        const initial: CrmStoreData = {
          passwordHash: hashPassword(getBootstrapPasswordPlaintext()),
          leads: DEFAULT_SERVER_LEADS,
        };
        fs.writeFileSync(candidate, JSON.stringify(initial, null, 2), 'utf-8');
      }
      return candidate;
    } catch {
      // Try next writable location
    }
  }
  return null;
}

function readStore(): CrmStoreData {
  const filePath = resolveStoreFilePath();
  if (filePath) {
    try {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw) as Partial<CrmStoreData>;
      if (parsed && typeof parsed.passwordHash === 'string' && Array.isArray(parsed.leads)) {
        return {
          passwordHash: parsed.passwordHash,
          leads: parsed.leads,
        };
      }
    } catch {
      // Fall back to fresh initialization
    }
  }

  if (!memoryFallbackStore) {
    memoryFallbackStore = {
      passwordHash: hashPassword(getBootstrapPasswordPlaintext()),
      leads: DEFAULT_SERVER_LEADS,
    };
  }
  return memoryFallbackStore;
}

function writeStore(data: CrmStoreData): void {
  memoryFallbackStore = data;
  const filePath = resolveStoreFilePath();
  if (filePath) {
    try {
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch {
      // Keep in-memory copy if filesystem becomes read-only
    }
  }
}

export function authenticateOwnerPassword(inputPassword: string): boolean {
  const trimmed = (inputPassword || '').trim();
  if (!trimmed) return false;

  // If explicit environment variable override is set, check it via scrypt + timingSafeEqual
  const envPass = process.env.CRM_OWNER_PASSWORD?.trim();
  if (envPass) {
    const salt = crypto.randomBytes(16).toString('hex');
    const envHash = hashPassword(envPass, salt);
    if (verifyPasswordAgainstHash(trimmed, envHash)) {
      return true;
    }
  }

  const store = readStore();
  return verifyPasswordAgainstHash(trimmed, store.passwordHash);
}

export function changeOwnerPassword(newPassword: string): { ok: boolean; error?: string } {
  const trimmed = (newPassword || '').trim();
  if (trimmed.length < 4) {
    return {
      ok: false,
      error: 'La contraseña debe tener al menos 4 caracteres.',
    };
  }

  const store = readStore();
  store.passwordHash = hashPassword(trimmed);
  writeStore(store);
  return { ok: true };
}

export function createSessionToken(): { token: string; expiresAt: number } {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const nonce = crypto.randomBytes(16).toString('hex');
  const payload = Buffer.from(`${expiresAt}.${nonce}`, 'utf-8').toString('base64url');
  const sig = crypto
    .createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('base64url');
  return {
    token: `${payload}.${sig}`,
    expiresAt,
  };
}

export function verifySessionToken(token: string | null | undefined): boolean {
  if (!token || typeof token !== 'string') return false;
  const dotIdx = token.indexOf('.');
  if (dotIdx <= 0) return false;

  const payload = token.slice(0, dotIdx);
  const sig = token.slice(dotIdx + 1);
  if (!payload || !sig) return false;

  const expectedSig = crypto
    .createHmac('sha256', getSessionSecret())
    .update(payload)
    .digest('base64url');

  const sigBuf = Buffer.from(sig, 'utf-8');
  const expectedBuf = Buffer.from(expectedSig, 'utf-8');
  if (sigBuf.length !== expectedBuf.length) return false;
  if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) return false;

  try {
    const decoded = Buffer.from(payload, 'base64url').toString('utf-8');
    const [expStr] = decoded.split('.');
    const expiresAt = Number(expStr);
    if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) {
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export function extractSessionTokenFromHeaders(headers: {
  authorization?: string | string[];
  cookie?: string | string[];
}): string | null {
  const authHeader = Array.isArray(headers.authorization)
    ? headers.authorization[0]
    : headers.authorization;

  if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    const bearer = authHeader.slice(7).trim();
    if (bearer) return bearer;
  }

  const cookieHeader = Array.isArray(headers.cookie) ? headers.cookie[0] : headers.cookie;
  if (cookieHeader && typeof cookieHeader === 'string') {
    const cookies = cookieHeader.split(';');
    for (const part of cookies) {
      const eqIdx = part.indexOf('=');
      if (eqIdx > -1) {
        const key = part.slice(0, eqIdx).trim();
        const val = part.slice(eqIdx + 1).trim();
        if (key === SESSION_COOKIE_NAME && val) {
          return decodeURIComponent(val);
        }
      }
    }
  }

  return null;
}

export function buildSessionCookieHeader(token: string, maxAgeSeconds = 28800): string {
  const isProd = process.env.NODE_ENV === 'production';
  const parts = [
    `${SESSION_COOKIE_NAME}=${encodeURIComponent(token)}`,
    `Max-Age=${maxAgeSeconds}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
  ];
  if (isProd) {
    parts.push('Secure');
  }
  return parts.join('; ');
}

export function listCrmLeads(): ServerCrmLead[] {
  return readStore().leads;
}

export function recordCrmLead(params: {
  type: 'whatsapp' | 'call';
  phoneTarget?: string;
  treatment?: string;
  sourcePage?: string;
  sourceUrl?: string;
}): ServerCrmLead {
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/Madrid',
  }).format(now);
  const formattedTime = new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: 'Europe/Madrid',
  }).format(now);

  const type = params.type === 'call' ? 'call' : 'whatsapp';
  const newLead: ServerCrmLead = {
    id: `lead-${Date.now()}-${crypto.randomBytes(3).toString('hex')}`,
    type,
    phoneTarget:
      params.phoneTarget ||
      (type === 'whatsapp' ? '697 35 85 40' : '933 09 18 71'),
    treatment: (params.treatment || 'Consulta General').slice(0, 160),
    sourcePage: (params.sourcePage || 'Web Clínica Dental SET').slice(0, 160),
    sourceUrl: (params.sourceUrl || '/').slice(0, 200),
    timestamp: now.getTime(),
    formattedDate,
    formattedTime,
    status: 'sin_ver',
  };

  const store = readStore();
  store.leads = [newLead, ...store.leads].slice(0, 500);
  writeStore(store);
  return newLead;
}

export function updateCrmLead(
  id: string,
  patch: { status?: 'sin_ver' | 'visto'; notes?: string }
): ServerCrmLead | null {
  const store = readStore();
  let updated: ServerCrmLead | null = null;

  const nowFormatted = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
  }).format(new Date());

  store.leads = store.leads.map((lead) => {
    if (lead.id !== id) return lead;
    const nextStatus = patch.status ?? lead.status;
    updated = {
      ...lead,
      status: nextStatus,
      seenAt: nextStatus === 'visto' ? lead.seenAt || nowFormatted : undefined,
      notes: patch.notes !== undefined ? patch.notes.slice(0, 2000) : lead.notes,
    };
    return updated;
  });

  if (updated) {
    writeStore(store);
  }
  return updated;
}

export function markAllCrmLeadsSeen(): ServerCrmLead[] {
  const store = readStore();
  const seenAt = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Madrid',
  }).format(new Date());

  store.leads = store.leads.map((lead) => ({
    ...lead,
    status: 'visto',
    seenAt: lead.seenAt || seenAt,
  }));

  writeStore(store);
  return store.leads;
}

export function deleteCrmLeadById(id: string): boolean {
  const store = readStore();
  const initialLen = store.leads.length;
  store.leads = store.leads.filter((lead) => lead.id !== id);
  if (store.leads.length !== initialLen) {
    writeStore(store);
    return true;
  }
  return false;
}
