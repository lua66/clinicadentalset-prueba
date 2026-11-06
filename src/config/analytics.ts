/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Google Analytics 4 (GA4) Configuration for Clínica Dental SET
 * Supports build-time VITE_GA4_MEASUREMENT_ID and server-injected meta configuration.
 */

const VALID_GA4_ID_REGEX = /^G-[A-Z0-9]{6,16}$/i;
const DEFAULT_FALLBACK_GA4_ID = 'G-SET2026BCN';

export interface Ga4ResolvedConfig {
  measurementId: string;
  isCustomConfigured: boolean;
  scriptBaseUrl: string;
}

export const GA4_PRIVACY_SETTINGS = {
  sendPageViewOnConfig: false,
  anonymizeIp: true,
  allowGoogleSignals: false,
  allowAdPersonalizationSignals: false,
  cookieExpiresSeconds: 60 * 60 * 24 * 365, // 12 months (AEPD compliant retention)
  cookieFlags: 'SameSite=Lax;Secure',
} as const;

function sanitizeMeasurementId(raw: unknown): string {
  if (typeof raw !== 'string') return '';
  const trimmed = raw.trim().toUpperCase();
  if (!trimmed || trimmed === 'G-XXXXXXXXXX' || !VALID_GA4_ID_REGEX.test(trimmed)) {
    return '';
  }
  return trimmed;
}

export function getGa4Config(): Ga4ResolvedConfig {
  const envId = sanitizeMeasurementId(
    (import.meta as { env?: Record<string, string | undefined> }).env
      ?.VITE_GA4_MEASUREMENT_ID
  );

  let metaId = '';
  if (typeof document !== 'undefined') {
    const metaEl = document.querySelector('meta[name="ga4-measurement-id"]');
    metaId = sanitizeMeasurementId(metaEl?.getAttribute('content') || '');
  }

  const resolvedCustomId = envId || metaId;

  return {
    measurementId: resolvedCustomId || DEFAULT_FALLBACK_GA4_ID,
    isCustomConfigured: Boolean(resolvedCustomId),
    scriptBaseUrl: 'https://www.googletagmanager.com/gtag/js',
  };
}
