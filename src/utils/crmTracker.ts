/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Client-side CRM API Client for Clínica Dental SET
 * Authentication and lead records live strictly on the server (/api/crm/*).
 * Zero passwords, credentials, or contact lists are bundled into client JS.
 */


export interface CrmLead {
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

const SESSION_TOKEN_STORAGE_KEY = 'set_clinic_crm_session_token';

function getSessionToken(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return sessionStorage.getItem(SESSION_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

function setSessionToken(token: string | null): void {
  if (typeof window === 'undefined') return;
  try {
    if (token) {
      sessionStorage.setItem(SESSION_TOKEN_STORAGE_KEY, token);
    } else {
      sessionStorage.removeItem(SESSION_TOKEN_STORAGE_KEY);
    }
  } catch {
    // Ignore storage quota / privacy mode restrictions
  }
}

function buildAuthHeaders(extra?: Record<string, string>): Record<string, string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...extra,
  };
  const token = getSessionToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

/**
 * Records an outbound WhatsApp or telephone click conversion on the server.
 */
export const trackCrmLead = (params: {
  type: 'whatsapp' | 'call';
  phoneTarget?: string;
  treatment?: string;
  sourcePage?: string;
  sourceUrl?: string;
}): void => {
  const payload = {
    type: params.type,
    phoneTarget:
      params.phoneTarget ||
      (params.type === 'whatsapp' ? '697 35 85 40' : '933 09 18 71'),
    treatment: params.treatment || 'Consulta General',
    sourcePage:
      params.sourcePage ||
      (typeof document !== 'undefined' ? document.title : 'Web Clínica Dental SET'),
    sourceUrl:
      params.sourceUrl ||
      (typeof window !== 'undefined' ? window.location.pathname : '/'),
  };

  if (typeof window !== 'undefined') {
    fetch('/api/crm/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then(() => {
        window.dispatchEvent(new CustomEvent('set-crm-updated'));
      })
      .catch(() => {
        // Ignore transient network interruption on navigation
      });
  }
};

export const checkCrmSession = async (): Promise<boolean> => {
  try {
    const res = await fetch('/api/crm/session', {
      method: 'GET',
      credentials: 'include',
      headers: buildAuthHeaders(),
    });
    if (!res.ok) {
      setSessionToken(null);
      return false;
    }
    const data = (await res.json()) as { authenticated?: boolean };
    return Boolean(data.authenticated);
  } catch {
    return false;
  }
};

export const loginCrm = async (
  password: string
): Promise<{ ok: boolean; error?: string }> => {
  try {
    const res = await fetch('/api/crm/login', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      authenticated?: boolean;
      token?: string;
      error?: string;
    };

    if (!res.ok || !data.authenticated) {
      setSessionToken(null);
      return {
        ok: false,
        error: data.error || 'Contraseña incorrecta.',
      };
    }

    if (data.token) {
      setSessionToken(data.token);
    }
    return { ok: true };
  } catch {
    return {
      ok: false,
      error: 'Error de conexión con el servidor de autenticación.',
    };
  }
};

export const logoutCrm = async (): Promise<void> => {
  setSessionToken(null);
  try {
    await fetch('/api/crm/logout', {
      method: 'POST',
      credentials: 'include',
      headers: buildAuthHeaders(),
    });
  } catch {
    // Ignore network error on logout
  }
};

export const fetchCrmLeads = async (): Promise<{
  ok: boolean;
  leads: CrmLead[];
  unauthorized?: boolean;
}> => {
  try {
    const res = await fetch('/api/crm/leads', {
      method: 'GET',
      credentials: 'include',
      headers: buildAuthHeaders(),
    });
    if (res.status === 401) {
      setSessionToken(null);
      return { ok: false, leads: [], unauthorized: true };
    }
    if (!res.ok) {
      return { ok: false, leads: [] };
    }
    const data = (await res.json()) as { leads?: CrmLead[] };
    return {
      ok: true,
      leads: Array.isArray(data.leads) ? data.leads : [],
    };
  } catch {
    return { ok: false, leads: [] };
  }
};

export const updateCrmLeadStatus = async (
  leadId: string,
  status: 'sin_ver' | 'visto'
): Promise<boolean> => {
  try {
    const res = await fetch(`/api/crm/leads/${encodeURIComponent(leadId)}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: buildAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    if (res.ok && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('set-crm-updated'));
    }
    return res.ok;
  } catch {
    return false;
  }
};

export const markAllLeadsAsSeen = async (): Promise<boolean> => {
  try {
    const res = await fetch('/api/crm/leads/mark-all-seen', {
      method: 'POST',
      credentials: 'include',
      headers: buildAuthHeaders(),
    });
    if (res.ok && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('set-crm-updated'));
    }
    return res.ok;
  } catch {
    return false;
  }
};

export const updateLeadNotes = async (
  leadId: string,
  notes: string
): Promise<boolean> => {
  try {
    const res = await fetch(`/api/crm/leads/${encodeURIComponent(leadId)}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: buildAuthHeaders(),
      body: JSON.stringify({ notes }),
    });
    if (res.ok && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('set-crm-updated'));
    }
    return res.ok;
  } catch {
    return false;
  }
};

export const deleteCrmLead = async (leadId: string): Promise<boolean> => {
  try {
    const res = await fetch(`/api/crm/leads/${encodeURIComponent(leadId)}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: buildAuthHeaders(),
    });
    if (res.ok && typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('set-crm-updated'));
    }
    return res.ok;
  } catch {
    return false;
  }
};

export const changeCrmPassword = async (
  newPassword: string
): Promise<{ ok: boolean; error?: string; message?: string }> => {
  try {
    const res = await fetch('/api/crm/password', {
      method: 'POST',
      credentials: 'include',
      headers: buildAuthHeaders(),
      body: JSON.stringify({ newPassword }),
    });
    const data = (await res.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      message?: string;
    };
    if (!res.ok || !data.ok) {
      return {
        ok: false,
        error: data.error || 'No se pudo actualizar la contraseña.',
      };
    }
    return {
      ok: true,
      message: data.message || 'Contraseña actualizada correctamente en el servidor.',
    };
  } catch {
    return {
      ok: false,
      error: 'Error de conexión al actualizar la contraseña.',
    };
  }
};
