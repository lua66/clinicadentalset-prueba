/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * CRM Tracker for Clínica Dental SET
 * Tracks patient conversions (WhatsApp clicks & direct calls), timestamps,
 * treatments, origin pages, and unread ("sin ver") alert status.
 */

export interface CrmLead {
  id: string;
  type: 'whatsapp' | 'call';
  phoneTarget: string; // "+34 648 83 48 94" or "933 09 18 71"
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

const STORAGE_KEY = 'set_clinic_crm_leads';
const AUTH_KEY = 'set_clinic_crm_auth';
const PASSWORD_KEY = 'set_clinic_crm_password';
const DEFAULT_PASSWORD = 'set2026';

// Initial realistic demo leads so the owner can immediately see the CRM in action
// with 1 active 'sin_ver' lead keeping the alert button illuminated as requested.
const INITIAL_LEADS: CrmLead[] = [
  {
    id: 'lead-init-1',
    type: 'whatsapp',
    phoneTarget: '+34 648 83 48 94',
    treatment: 'Implantes Dentales',
    sourcePage: 'Página de Especialidad: Implantes',
    sourceUrl: '/especialidades/implantes-dentales',
    timestamp: Date.now() - 1000 * 60 * 25, // 25 mins ago
    formattedDate: new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(Date.now() - 1000 * 60 * 25),
    formattedTime: new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(Date.now() - 1000 * 60 * 25),
    status: 'sin_ver',
    notes: 'Interesado en sustitución de pieza posterior y presupuesto de corona.',
  },
  {
    id: 'lead-init-2',
    type: 'whatsapp',
    phoneTarget: '+34 648 83 48 94',
    treatment: 'Ortodoncia Invisible',
    sourcePage: 'Página de Inicio (Hero Principal)',
    sourceUrl: '/',
    timestamp: Date.now() - 1000 * 60 * 60 * 3, // 3 hours ago
    formattedDate: new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(Date.now() - 1000 * 60 * 60 * 3),
    formattedTime: new Intl.DateTimeFormat('es-ES', { hour: '2-digit', minute: '2-digit' }).format(Date.now() - 1000 * 60 * 60 * 3),
    status: 'visto',
    notes: 'Cita programada para primera valoración con escáner 3D.',
    seenAt: 'Hoy a las 11:30',
  },
  {
    id: 'lead-init-3',
    type: 'call',
    phoneTarget: '933 09 18 71',
    treatment: 'Higiene y Limpieza Dental',
    sourcePage: 'Contacto y Mapa (Poblenou)',
    sourceUrl: '/contacto',
    timestamp: Date.now() - 1000 * 60 * 60 * 26, // yesterday
    formattedDate: new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(Date.now() - 1000 * 60 * 60 * 26),
    formattedTime: '16:40',
    status: 'visto',
    notes: 'Vecino de Carrer Doctor Trueta, consulta por limpieza con ultrasonidos.',
    seenAt: 'Ayer a las 17:00',
  },
];

export const getCrmLeads = (): CrmLead[] => {
  if (typeof window === 'undefined') return INITIAL_LEADS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEADS));
      return INITIAL_LEADS;
    }
    return JSON.parse(raw) as CrmLead[];
  } catch (e) {
    console.error('Error reading CRM leads from localStorage:', e);
    return INITIAL_LEADS;
  }
};

export const saveCrmLeads = (leads: CrmLead[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    // Dispatch custom event to notify all components in the app
    window.dispatchEvent(new CustomEvent('set-crm-updated'));
  } catch (e) {
    console.error('Error saving CRM leads to localStorage:', e);
  }
};

/**
 * Tracks an outbound WhatsApp or phone call conversion
 */
export const trackCrmLead = (params: {
  type: 'whatsapp' | 'call';
  phoneTarget?: string;
  treatment?: string;
  sourcePage?: string;
  sourceUrl?: string;
}): CrmLead => {
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(now);
  const formattedTime = new Intl.DateTimeFormat('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(now);

  const newLead: CrmLead = {
    id: `lead-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    type: params.type,
    phoneTarget:
      params.phoneTarget ||
      (params.type === 'whatsapp' ? '+34 648 83 48 94' : '933 09 18 71'),
    treatment: params.treatment || 'Consulta General / Cita Odontológica',
    sourcePage: params.sourcePage || (typeof document !== 'undefined' ? document.title : 'Web Clínica SET'),
    sourceUrl:
      params.sourceUrl ||
      (typeof window !== 'undefined' ? window.location.pathname : '/'),
    timestamp: now.getTime(),
    formattedDate,
    formattedTime,
    status: 'sin_ver', // Always starts as 'sin_ver' so the illuminated button turns on!
  };

  const leads = getCrmLeads();
  const updatedLeads = [newLead, ...leads];
  saveCrmLeads(updatedLeads);

  return newLead;
};

/**
 * Marks an individual lead as seen ("visto")
 */
export const markLeadAsSeen = (leadId: string): void => {
  const now = new Date();
  const seenAt = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);

  const leads = getCrmLeads().map((l) =>
    l.id === leadId ? { ...l, status: 'visto' as const, seenAt } : l
  );
  saveCrmLeads(leads);
};

/**
 * Marks an individual lead as unseen ("sin_ver")
 */
export const markLeadAsUnseen = (leadId: string): void => {
  const leads = getCrmLeads().map((l) =>
    l.id === leadId ? { ...l, status: 'sin_ver' as const, seenAt: undefined } : l
  );
  saveCrmLeads(leads);
};

/**
 * Marks all leads as seen ("visto")
 */
export const markAllLeadsAsSeen = (): void => {
  const now = new Date();
  const seenAt = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);

  const leads = getCrmLeads().map((l) => ({
    ...l,
    status: 'visto' as const,
    seenAt: l.seenAt || seenAt,
  }));
  saveCrmLeads(leads);
};

/**
 * Update private notes of a lead
 */
export const updateLeadNotes = (leadId: string, notes: string): void => {
  const leads = getCrmLeads().map((l) =>
    l.id === leadId ? { ...l, notes } : l
  );
  saveCrmLeads(leads);
};

/**
 * Delete a lead
 */
export const deleteCrmLead = (leadId: string): void => {
  const leads = getCrmLeads().filter((l) => l.id !== leadId);
  saveCrmLeads(leads);
};

/**
 * Calculates current unseen count
 */
export const getUnseenLeadsCount = (): number => {
  const leads = getCrmLeads();
  return leads.filter((l) => l.status === 'sin_ver').length;
};

/**
 * Password & Authentication Management
 */
export const getStoredPassword = (): string => {
  if (typeof window === 'undefined') return DEFAULT_PASSWORD;
  return localStorage.getItem(PASSWORD_KEY) || DEFAULT_PASSWORD;
};

export const setStoredPassword = (newPass: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PASSWORD_KEY, newPass);
};

export const isCrmAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(AUTH_KEY) === 'true';
};

export const setCrmAuthenticated = (auth: boolean): void => {
  if (typeof window === 'undefined') return;
  if (auth) {
    sessionStorage.setItem(AUTH_KEY, 'true');
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
};

export const checkCrmPassword = (inputPass: string): boolean => {
  const stored = getStoredPassword();
  const isValid = inputPass.trim() === stored.trim();
  if (isValid) {
    setCrmAuthenticated(true);
  }
  return isValid;
};
