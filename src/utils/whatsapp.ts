import { Language } from '../types';
import { CLINIC_CONTACT } from '../data/clinicData';

export type WhatsAppIntent = 'general' | 'specialty' | 'team' | 'video';

export function buildWhatsAppMessage(
  lang: Language,
  options?: {
    intent?: WhatsAppIntent;
    specialtyName?: string;
  }
): string {
  const intent = options?.intent || 'general';
  const specialtyName = options?.specialtyName;

  if (intent === 'specialty' && specialtyName) {
    if (lang === 'ca') {
      return `Hola, voldria informació sobre ${specialtyName} a Clínica Dental SET.`;
    }
    if (lang === 'en') {
      return `Hello, I would like information about ${specialtyName} at Clínica Dental SET.`;
    }
    return `Hola, quisiera información sobre ${specialtyName} en Clínica Dental SET.`;
  }

  if (intent === 'video') {
    if (lang === 'ca') {
      return 'Hola Dra. Izbette, he vist el vídeo de la clínica i voldria informació per demanar cita al Poblenou.';
    }
    if (lang === 'en') {
      return 'Hello Dr. Izbette, I watched the clinic video and would like information to schedule an appointment in Poblenou.';
    }
    return 'Hola Dra. Izbette, he visto el vídeo de la clínica y quisiera información para pedir cita en Poblenou.';
  }

  if (intent === 'team') {
    if (lang === 'ca') {
      return 'Hola, voldria informació o demanar cita amb l’equip de Clínica Dental SET.';
    }
    if (lang === 'en') {
      return 'Hello, I would like information or to book an appointment with the Clínica Dental SET team.';
    }
    return 'Hola, quisiera información o pedir cita con el equipo de Clínica Dental SET.';
  }

  if (lang === 'ca') {
    return 'Hola, voldria informació per demanar cita a Clínica Dental SET.';
  }
  if (lang === 'en') {
    return 'Hello, I would like information to schedule an appointment at Clínica Dental SET.';
  }
  return 'Hola, quisiera información para pedir cita en Clínica Dental SET.';
}

export function buildWhatsAppUrl(
  lang: Language,
  options?: {
    intent?: WhatsAppIntent;
    specialtyName?: string;
  }
): string {
  const text = buildWhatsAppMessage(lang, options);
  return `https://wa.me/${CLINIC_CONTACT.whatsappClean}?text=${encodeURIComponent(text)}`;
}
