/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * Custom React Hook for Privacy-Compliant Google Analytics 4 (GA4) Tracking
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { getStoredCookieConsent, hasThirdPartyCookieConsent } from '../utils/cookieConsent';
import { getGa4Config } from '../config/analytics';
import {
  Ga4EventName,
  Ga4EventParams,
  initializeGa4ConsentDefaults,
  sendGa4ContactLead,
  sendGa4Event,
  sendGa4PageView,
  syncGa4WithConsentState,
} from '../utils/googleAnalytics';

export interface UseGoogleAnalyticsOptions {
  currentPath: string;
  lang: Language;
  pageTitle?: string;
  disabled?: boolean;
}

export interface UseGoogleAnalyticsResult {
  consentGranted: boolean;
  measurementId: string;
  trackPageView: (overridePath?: string, overrideTitle?: string) => void;
  trackEvent: (eventName: Ga4EventName | string, params?: Ga4EventParams) => void;
  trackContactClick: (params: {
    channel: 'whatsapp' | 'phone';
    treatment?: string;
    uiLocation: string;
    pagePath?: string;
  }) => void;
  trackSpecialtySelect: (params: { slug: string; name: string }) => void;
  trackVideoEvent: (params: { action: 'play' | 'complete'; videoTitle: string }) => void;
  trackFaqExpand: (params: { question: string; specialtySlug: string }) => void;
  trackMapConsentLoad: () => void;
  trackLanguageSwitch: (params: {
    fromLang: Language;
    toLang: Language;
    targetPath: string;
  }) => void;
}

export function useGoogleAnalytics({
  currentPath,
  lang,
  pageTitle,
  disabled = false,
}: UseGoogleAnalyticsOptions): UseGoogleAnalyticsResult {
  const { measurementId } = getGa4Config();
  const [consentGranted, setConsentGranted] = useState<boolean>(() =>
    !disabled && hasThirdPartyCookieConsent()
  );

  const lastTrackedViewKeyRef = useRef<string | null>(null);

  // Initialize Consent Mode v2 defaults and listen for real-time consent updates
  useEffect(() => {
    if (typeof window === 'undefined') return;

    initializeGa4ConsentDefaults();
    const initialConsent = getStoredCookieConsent();
    const initialGranted = !disabled && initialConsent === 'accepted';
    setConsentGranted(initialGranted);
    syncGa4WithConsentState(initialConsent, disabled);

    const handleConsentChange = () => {
      const updated = getStoredCookieConsent();
      const granted = !disabled && updated === 'accepted';
      setConsentGranted(granted);
      syncGa4WithConsentState(updated, disabled);

      if (!granted) {
        lastTrackedViewKeyRef.current = null;
      }
    };

    window.addEventListener('set-cookie-consent-updated', handleConsentChange);
    return () => {
      window.removeEventListener('set-cookie-consent-updated', handleConsentChange);
    };
  }, [disabled]);

  // Automatically record deduplicated page_view events on route/language changes when consented
  useEffect(() => {
    if (!consentGranted || disabled) return;

    const viewKey = `${lang}:${currentPath}`;
    if (lastTrackedViewKeyRef.current === viewKey) return;

    const sent = sendGa4PageView({
      path: currentPath,
      title: pageTitle,
      lang,
      disabled,
    });

    if (sent) {
      lastTrackedViewKeyRef.current = viewKey;
    }
  }, [consentGranted, currentPath, lang, pageTitle, disabled]);

  const trackPageView = useCallback(
    (overridePath?: string, overrideTitle?: string) => {
      if (disabled) return;
      sendGa4PageView({
        path: overridePath || currentPath,
        title: overrideTitle || pageTitle,
        lang,
        disabled,
      });
    },
    [currentPath, pageTitle, lang, disabled]
  );

  const trackEvent = useCallback(
    (eventName: Ga4EventName | string, params: Ga4EventParams = {}) => {
      if (disabled) return;
      sendGa4Event(eventName, {
        language: lang,
        page_path: currentPath,
        ...params,
      });
    },
    [lang, currentPath, disabled]
  );

  const trackContactClick = useCallback(
    (params: {
      channel: 'whatsapp' | 'phone';
      treatment?: string;
      uiLocation: string;
      pagePath?: string;
    }) => {
      if (disabled) return;
      sendGa4ContactLead({
        channel: params.channel,
        treatment: params.treatment,
        uiLocation: params.uiLocation,
        lang,
        pagePath: params.pagePath || currentPath,
      });
    },
    [lang, currentPath, disabled]
  );

  const trackSpecialtySelect = useCallback(
    ({ slug, name }: { slug: string; name: string }) => {
      if (disabled) return;
      sendGa4Event('select_content', {
        content_type: 'dental_specialty',
        item_id: slug,
        item_name: name,
        language: lang,
        page_path: currentPath,
      });
    },
    [lang, currentPath, disabled]
  );

  const trackVideoEvent = useCallback(
    ({ action, videoTitle }: { action: 'play' | 'complete'; videoTitle: string }) => {
      if (disabled) return;
      sendGa4Event(action === 'play' ? 'video_start' : 'video_complete', {
        video_title: videoTitle,
        language: lang,
        page_path: currentPath,
      });
    },
    [lang, currentPath, disabled]
  );

  const trackFaqExpand = useCallback(
    ({ question, specialtySlug }: { question: string; specialtySlug: string }) => {
      if (disabled) return;
      sendGa4Event('faq_expand', {
        faq_question: question.slice(0, 100),
        item_id: specialtySlug,
        language: lang,
        page_path: currentPath,
      });
    },
    [lang, currentPath, disabled]
  );

  const trackMapConsentLoad = useCallback(() => {
    if (disabled) return;
    sendGa4Event('map_load', {
      ui_location: 'DirectContactAndMap',
      language: lang,
      page_path: currentPath,
    });
  }, [lang, currentPath, disabled]);

  const trackLanguageSwitch = useCallback(
    ({
      fromLang,
      toLang,
      targetPath,
    }: {
      fromLang: Language;
      toLang: Language;
      targetPath: string;
    }) => {
      if (disabled) return;
      sendGa4Event('language_change', {
        from_language: fromLang,
        to_language: toLang,
        language: toLang,
        page_path: targetPath,
      });
    },
    [disabled]
  );

  return {
    consentGranted,
    measurementId,
    trackPageView,
    trackEvent,
    trackContactClick,
    trackSpecialtySelect,
    trackVideoEvent,
    trackFaqExpand,
    trackMapConsentLoad,
    trackLanguageSwitch,
  };
}
