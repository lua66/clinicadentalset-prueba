/**
 * GDPR / LSSI-CE Cookie Consent Manager for Clínica Dental SET
 * Blocks third-party cookies (Google Maps embed & analytics) until explicit user consent.
 */

export type CookieConsentState = 'accepted' | 'essential_only' | null;

const CONSENT_STORAGE_KEY = 'set_clinic_cookie_consent_v1';
const CONSENT_TIMESTAMP_KEY = 'set_clinic_cookie_consent_ts_v1';

export function getStoredCookieConsent(): CookieConsentState {
  if (typeof window === 'undefined') return null;
  try {
    const val = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (val === 'accepted' || val === 'essential_only') {
      return val;
    }
    return null;
  } catch {
    return null;
  }
}

export function saveCookieConsent(state: Exclude<CookieConsentState, null>): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, state);
    window.localStorage.setItem(CONSENT_TIMESTAMP_KEY, new Date().toISOString());
    window.dispatchEvent(new CustomEvent('set-cookie-consent-updated', { detail: state }));
  } catch {
    // Ignore storage quota errors in restricted browsing modes
  }
}

export function resetCookieConsentPrompt(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('set-cookie-consent-reopen'));
  } catch {
    // Ignore
  }
}

export function hasThirdPartyCookieConsent(): boolean {
  return getStoredCookieConsent() === 'accepted';
}
