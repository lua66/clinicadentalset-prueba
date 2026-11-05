import type { IncomingMessage, ServerResponse } from 'node:http';
import {
  authenticateOwnerPassword,
  buildSessionCookieHeader,
  changeOwnerPassword,
  createSessionToken,
  deleteCrmLeadById,
  extractSessionTokenFromHeaders,
  listCrmLeads,
  markAllCrmLeadsSeen,
  recordCrmLead,
  updateCrmLead,
  verifySessionToken,
} from '../server/crmService.ts';

type VercelRequest = IncomingMessage & {
  query?: Record<string, string | string[]>;
  body?: unknown;
  url?: string;
  method?: string;
};

type VercelResponse = ServerResponse & {
  status: (code: number) => VercelResponse;
  json: (payload: unknown) => void;
};

function parseJsonBody(req: VercelRequest): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === 'object') {
    return Promise.resolve(req.body as Record<string, unknown>);
  }
  if (typeof req.body === 'string') {
    try {
      return Promise.resolve(JSON.parse(req.body) as Record<string, unknown>);
    } catch {
      return Promise.resolve({});
    }
  }
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: Buffer | string) => {
      raw += String(chunk);
    });
    req.on('end', () => {
      try {
        resolve(raw ? (JSON.parse(raw) as Record<string, unknown>) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function sendJson(res: ServerResponse, statusCode: number, payload: unknown, extraHeaders?: Record<string, string>) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  if (extraHeaders) {
    for (const [k, v] of Object.entries(extraHeaders)) {
      res.setHeader(k, v);
    }
  }
  res.end(JSON.stringify(payload));
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const method = (req.method || 'GET').toUpperCase();
  const parsedUrl = new URL(req.url || '/api/crm', 'http://localhost');
  const pathname = parsedUrl.pathname.replace(/\/+$/, '');

  // Extract sub-action after /api/crm
  const subPath = pathname.startsWith('/api/crm')
    ? pathname.slice('/api/crm'.length)
    : pathname;

  const sessionToken = extractSessionTokenFromHeaders(req.headers);
  const isAuthenticated = verifySessionToken(sessionToken);

  // 1. Check current server session
  if (subPath === '/session' && method === 'GET') {
    if (!isAuthenticated) {
      return sendJson(res, 401, { authenticated: false, error: 'No autenticado' });
    }
    return sendJson(res, 200, { authenticated: true });
  }

  // 2. Authenticate password strictly on server
  if (subPath === '/login' && method === 'POST') {
    const body = await parseJsonBody(req);
    const password = typeof body.password === 'string' ? body.password : '';
    if (!authenticateOwnerPassword(password)) {
      return sendJson(res, 401, {
        authenticated: false,
        error: 'Contraseña incorrecta. Validación denegada por el servidor.',
      });
    }

    const session = createSessionToken();
    return sendJson(
      res,
      200,
      {
        authenticated: true,
        token: session.token,
        expiresAt: session.expiresAt,
      },
      {
        'Set-Cookie': buildSessionCookieHeader(session.token),
      }
    );
  }

  // 3. Logout
  if (subPath === '/logout' && method === 'POST') {
    return sendJson(
      res,
      200,
      { authenticated: false },
      {
        'Set-Cookie': buildSessionCookieHeader('', 0),
      }
    );
  }

  // 4. Change password (Authenticated only)
  if (subPath === '/password' && method === 'POST') {
    if (!isAuthenticated) {
      return sendJson(res, 401, { error: 'No autorizado' });
    }
    const body = await parseJsonBody(req);
    const newPassword = typeof body.newPassword === 'string' ? body.newPassword : '';
    const result = changeOwnerPassword(newPassword);
    if (!result.ok) {
      return sendJson(res, 400, { error: result.error });
    }
    return sendJson(res, 200, { ok: true, message: 'Contraseña actualizada correctamente en el servidor.' });
  }

  // 5. Mark all leads seen (Authenticated only)
  if (subPath === '/leads/mark-all-seen' && method === 'POST') {
    if (!isAuthenticated) {
      return sendJson(res, 401, { error: 'No autorizado' });
    }
    const leads = markAllCrmLeadsSeen();
    return sendJson(res, 200, { leads });
  }

  // 6. Public click conversion recording (POST /api/crm/leads) - writes new lead without exposing existing ones
  if (subPath === '/leads' && method === 'POST') {
    const body = await parseJsonBody(req);
    const lead = recordCrmLead({
      type: body.type === 'call' ? 'call' : 'whatsapp',
      phoneTarget: typeof body.phoneTarget === 'string' ? body.phoneTarget : undefined,
      treatment: typeof body.treatment === 'string' ? body.treatment : undefined,
      sourcePage: typeof body.sourcePage === 'string' ? body.sourcePage : undefined,
      sourceUrl: typeof body.sourceUrl === 'string' ? body.sourceUrl : undefined,
    });
    return sendJson(res, 201, { ok: true, id: lead.id });
  }

  // 7. Read all CRM leads (Strictly Authenticated only -> HTTP 401 otherwise)
  if (subPath === '/leads' && method === 'GET') {
    if (!isAuthenticated) {
      return sendJson(res, 401, {
        error: 'Acceso denegado. Inicia sesión para consultar los registros del CRM.',
      });
    }
    return sendJson(res, 200, { leads: listCrmLeads() });
  }

  // 8. Update or Delete individual lead (/api/crm/leads/:id or query ?id=...)
  if (subPath.startsWith('/leads/')) {
    if (!isAuthenticated) {
      return sendJson(res, 401, { error: 'No autorizado' });
    }
    const leadId = decodeURIComponent(subPath.slice('/leads/'.length));
    if (!leadId) {
      return sendJson(res, 400, { error: 'ID de registro requerido' });
    }

    if (method === 'PATCH') {
      const body = await parseJsonBody(req);
      const updated = updateCrmLead(leadId, {
        status:
          body.status === 'sin_ver' || body.status === 'visto'
            ? body.status
            : undefined,
        notes: typeof body.notes === 'string' ? body.notes : undefined,
      });
      if (!updated) {
        return sendJson(res, 404, { error: 'Registro no encontrado' });
      }
      return sendJson(res, 200, { lead: updated });
    }

    if (method === 'DELETE') {
      const deleted = deleteCrmLeadById(leadId);
      if (!deleted) {
        return sendJson(res, 404, { error: 'Registro no encontrado' });
      }
      return sendJson(res, 200, { ok: true });
    }
  }

  return sendJson(res, 404, { error: 'Endpoint CRM no encontrado' });
}
