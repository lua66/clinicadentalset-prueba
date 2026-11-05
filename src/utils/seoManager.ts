import { Language, Specialty, MedicalTeamMemberSchedule } from '../types';
import { SPECIALTIES, CLINIC_CONTACT, MEDICAL_TEAM_SCHEDULES } from '../data/clinicData';
import { parseUrlPath, buildLocalizedPath } from './routing';

export interface PageSeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  canonicalUrl: string;
  alternates: {
    es: string;
    ca: string;
    en: string;
    'x-default': string;
  };
  robots: string;
  ogType: string;
  ogLocale: string;
  ogImage: string;
  schemaJson: object;
}

export const BASE_URL = 'https://clinicadentalset.com';

const CLINIC_POSTAL_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: CLINIC_CONTACT.address,
  addressLocality: 'Barcelona',
  addressRegion: 'Cataluña',
  postalCode: '08005',
  addressCountry: 'ES',
};

const CLINIC_GEO_COORDINATES = {
  '@type': 'GeoCoordinates',
  latitude: CLINIC_CONTACT.geo.latitude,
  longitude: CLINIC_CONTACT.geo.longitude,
};

const CLINIC_OPENING_HOURS_SPEC = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '10:00',
    closes: '14:00',
    description: 'Horario asistencial de mañana (Lunes a Viernes)',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '15:00',
    closes: '20:00',
    description: 'Horario asistencial de tarde (Lunes a Viernes)',
  },
];

const CLINIC_AREA_SERVED = [
  { '@type': 'Place', name: 'El Poblenou, Barcelona' },
  { '@type': 'AdministrativeArea', name: 'Sant Martí, Barcelona' },
  { '@type': 'City', name: 'Barcelona' },
  { '@type': 'PostalCodeSpecification', postalCode: '08005', addressCountry: 'ES' },
];

function buildAlternates(basePath: string) {
  const esPath = buildLocalizedPath(basePath, 'es');
  const caPath = buildLocalizedPath(basePath, 'ca');
  const enPath = buildLocalizedPath(basePath, 'en');
  return {
    es: `${BASE_URL}${esPath}`,
    ca: `${BASE_URL}${caPath}`,
    en: `${BASE_URL}${enPath}`,
    'x-default': `${BASE_URL}${esPath}`,
  };
}

function getOgLocale(lang: Language): string {
  if (lang === 'ca') return 'ca_ES';
  if (lang === 'en') return 'en_US';
  return 'es_ES';
}

function buildMedicalTeamSchema(
  members: MedicalTeamMemberSchedule[],
  localBusinessId: string
) {
  return members.map((member) => ({
    '@type':
      member.name.startsWith('Dra.') || member.medicalSpecialty === 'Anesthesia'
        ? ['Person', 'Physician']
        : ['Person'],
    name: member.name,
    jobTitle: member.role,
    medicalSpecialty: member.medicalSpecialty,
    worksFor: {
      '@type': 'LocalBusiness',
      '@id': localBusinessId,
      name: 'Clínica Dental SET',
    },
    workLocation: {
      '@type': 'Place',
      name: 'Clínica Dental SET - Poblenou',
      address: CLINIC_POSTAL_ADDRESS,
      geo: CLINIC_GEO_COORDINATES,
      hasMap: CLINIC_CONTACT.googleMapsUrl,
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: CLINIC_CONTACT.phoneClean,
      contactType: 'appointment scheduling',
      areaServed: 'ES-B',
      availableLanguage: ['Spanish', 'Catalan', 'English'],
      hoursAvailable: CLINIC_OPENING_HOURS_SPEC,
    },
  }));
}

export function getSeoMetadata(rawPath: string, explicitLang?: Language): PageSeoMetadata {
  const parsed = parseUrlPath(rawPath);
  const lang: Language = explicitLang || parsed.lang;
  const basePath = parsed.basePath;

  const allTeamMembers = [
    MEDICAL_TEAM_SCHEDULES.izbette,
    MEDICAL_TEAM_SCHEDULES.ruby,
    MEDICAL_TEAM_SCHEDULES.anestesiologo,
    MEDICAL_TEAM_SCHEDULES.silvia,
  ];

  // Explicit 404 route metadata
  if (parsed.isNotFound || basePath === '/404') {
    const canonicalPath = buildLocalizedPath('/404', lang);
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;
    return {
      title:
        lang === 'ca'
          ? '404 · Pàgina no trobada | Clínica Dental SET'
          : lang === 'en'
          ? '404 · Page Not Found | Clínica Dental SET'
          : '404 · Página no encontrada | Clínica Dental SET',
      description:
        lang === 'ca'
          ? 'L’adreça sol·licitada no existeix a Clínica Dental SET Barcelona.'
          : lang === 'en'
          ? 'The requested address does not exist on Clínica Dental SET Barcelona.'
          : 'La dirección solicitada no existe en Clínica Dental SET Barcelona.',
      canonicalPath,
      canonicalUrl,
      alternates: buildAlternates('/404'),
      robots: 'noindex, nofollow',
      ogType: 'website',
      ogLocale: getOgLocale(lang),
      ogImage: `${BASE_URL}/assets/logo-blanc.png`,
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: '404 - Clínica Dental SET',
      },
    };
  }

  // Individual specialty page
  if (parsed.specialtySlug || basePath.startsWith('/especialidades/')) {
    const slug = parsed.specialtySlug || basePath.replace('/especialidades/', '').split('/')[0];
    const specialty = SPECIALTIES.find((s) => s.slug === slug);
    if (specialty) {
      return getSpecialtySeo(specialty, lang);
    }
  }

  // Handle /crm (strictly private & noindex)
  if (basePath === '/crm') {
    const canonicalUrl = `${BASE_URL}/crm`;
    return {
      title: 'Acceso Privado Dirección | Clínica Dental SET',
      description: 'Panel interno de dirección de Clínica Dental SET.',
      canonicalPath: '/crm',
      canonicalUrl,
      alternates: {
        es: canonicalUrl,
        ca: canonicalUrl,
        en: canonicalUrl,
        'x-default': canonicalUrl,
      },
      robots: 'noindex, nofollow, noarchive',
      ogType: 'website',
      ogLocale: getOgLocale(lang),
      ogImage: `${BASE_URL}/assets/logo-blanc.png`,
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Acceso Privado Dirección - Clínica Dental SET',
      },
    };
  }

  if (basePath === '/especialidades') {
    const canonicalPath = buildLocalizedPath('/especialidades', lang);
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;
    return {
      title:
        lang === 'ca'
          ? 'Especialitats Odontològiques al Poblenou | Clínica Dental SET'
          : lang === 'en'
          ? 'Dental Specialties in Poblenou, Barcelona | Clínica Dental SET'
          : 'Especialidades Odontológicas en Poblenou | Clínica Dental SET',
      description:
        lang === 'ca'
          ? 'Coneix les nostres 12 especialitats odontològiques al Poblenou: implants, cirurgia oral, sedació conscient amb anestesiòleg, odontopediatria i medicina oral.'
          : lang === 'en'
          ? 'Explore our 12 dental specialties in Poblenou, Barcelona: implants, oral surgery, conscious sedation with anesthesiologist, pediatric dentistry, and oral medicine.'
          : 'Descubre nuestras 12 especialidades odontológicas en Poblenou: implantes dentales, cirugía oral, sedación consciente con anestesiólogo, odontopediatría y medicina oral.',
      canonicalPath,
      canonicalUrl,
      alternates: buildAlternates('/especialidades'),
      robots: 'noindex, nofollow',
      ogType: 'website',
      ogLocale: getOgLocale(lang),
      ogImage: `${BASE_URL}/assets/logo-blanc.png`,
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Especialidades Odontológicas - Clínica Dental SET',
        url: canonicalUrl,
        inLanguage: getOgLocale(lang).replace('_', '-'),
        description: 'Especialidades odontológicas en Carrer del Doctor Trueta, 213, Poblenou, Barcelona.',
        provider: {
          '@type': ['LocalBusiness', 'Dentist', 'MedicalClinic'],
          '@id': `${BASE_URL}/#localbusiness`,
          name: 'Clínica Dental SET',
          telephone: CLINIC_CONTACT.phoneClean,
          address: CLINIC_POSTAL_ADDRESS,
          geo: CLINIC_GEO_COORDINATES,
          hasMap: CLINIC_CONTACT.googleMapsUrl,
          openingHoursSpecification: CLINIC_OPENING_HOURS_SPEC,
        },
      },
    };
  }

  if (basePath === '/equipo') {
    const canonicalPath = buildLocalizedPath('/equipo', lang);
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;
    return {
      title:
        lang === 'ca'
          ? 'Equip Mèdic i Odontòlogues al Poblenou | Clínica Dental SET'
          : lang === 'en'
          ? 'Medical & Dental Team in Poblenou | Clínica Dental SET'
          : 'Equipo Médico y Odontólogas en Poblenou | Clínica Dental SET',
      description:
        lang === 'ca'
          ? 'Equip mèdic col·legiat a Clínica Dental SET Poblenou: Dra. Izbette Luis Torres (Col. 5664 COEC) i Dra. Ruby Herrera Villamil (Col. 5929 COEC).'
          : lang === 'en'
          ? 'Licensed dental team at Clínica Dental SET Poblenou: Dr. Izbette Luis Torres (Col. 5664 COEC) and Dr. Ruby Herrera Villamil (Col. 5929 COEC).'
          : 'Cuadro médico colegiado en Clínica Dental SET Poblenou: Dra. Izbette Luis Torres (Col. 5664 COEC) y Dra. Ruby Herrera Villamil (Col. 5929 COEC).',
      canonicalPath,
      canonicalUrl,
      alternates: buildAlternates('/equipo'),
      robots: 'noindex, nofollow',
      ogType: 'profile',
      ogLocale: getOgLocale(lang),
      ogImage: `${BASE_URL}/assets/equip1.jpg`,
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Equipo Médico - Clínica Dental SET',
        url: canonicalUrl,
        inLanguage: getOgLocale(lang).replace('_', '-'),
        mainEntity: {
          '@type': ['LocalBusiness', 'Dentist', 'MedicalClinic'],
          '@id': `${BASE_URL}/#localbusiness`,
          name: 'Clínica Dental SET',
          telephone: CLINIC_CONTACT.phoneClean,
          address: CLINIC_POSTAL_ADDRESS,
          geo: CLINIC_GEO_COORDINATES,
          hasMap: CLINIC_CONTACT.googleMapsUrl,
          openingHoursSpecification: CLINIC_OPENING_HOURS_SPEC,
          employee: buildMedicalTeamSchema(allTeamMembers, `${BASE_URL}/#localbusiness`),
        },
      },
    };
  }

  if (basePath === '/clinica') {
    const canonicalPath = buildLocalizedPath('/clinica', lang);
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;
    return {
      title:
        lang === 'ca'
          ? 'Instal·lacions al Poblenou | Clínica Dental SET Barcelona'
          : lang === 'en'
          ? 'Facilities in Poblenou | Clínica Dental SET Barcelona'
          : 'Instalaciones en Poblenou | Clínica Dental SET Barcelona',
      description:
        lang === 'ca'
          ? 'Coneix les instal·lacions de Clínica Dental SET al Carrer del Doctor Trueta, 213, Baixos, Poblenou, Barcelona.'
          : lang === 'en'
          ? 'Tour Clínica Dental SET facilities at Carrer del Doctor Trueta, 213, Ground Floor, Poblenou, Barcelona.'
          : 'Conoce las instalaciones de Clínica Dental SET en Carrer del Doctor Trueta, 213, Bajos, Poblenou, Barcelona.',
      canonicalPath,
      canonicalUrl,
      alternates: buildAlternates('/clinica'),
      robots: 'noindex, nofollow',
      ogType: 'website',
      ogLocale: getOgLocale(lang),
      ogImage: `${BASE_URL}/assets/clinica1.jpg`,
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'MedicalClinic', 'Dentist'],
        '@id': `${BASE_URL}${canonicalPath}#localbusiness`,
        name: 'Clínica Dental SET - Instalaciones Poblenou',
        url: canonicalUrl,
        inLanguage: getOgLocale(lang).replace('_', '-'),
        telephone: CLINIC_CONTACT.phoneClean,
        address: CLINIC_POSTAL_ADDRESS,
        geo: CLINIC_GEO_COORDINATES,
        hasMap: CLINIC_CONTACT.googleMapsUrl,
        openingHoursSpecification: CLINIC_OPENING_HOURS_SPEC,
      },
    };
  }

  if (basePath === '/contacto') {
    const canonicalPath = buildLocalizedPath('/contacto', lang);
    const canonicalUrl = `${BASE_URL}${canonicalPath}`;
    return {
      title:
        lang === 'ca'
          ? 'Contacte, Telèfon i Ubicació al Poblenou | Clínica Dental SET'
          : lang === 'en'
          ? 'Contact, Phone & Location in Poblenou | Clínica Dental SET'
          : 'Contacto, Teléfono y Ubicación en Poblenou | Clínica Dental SET',
      description:
        lang === 'ca'
          ? 'Contacta amb Clínica Dental SET al Carrer del Doctor Trueta, 213, Baixos, Barcelona. Telèfon 933 09 18 71 i WhatsApp directe.'
          : lang === 'en'
          ? 'Contact Clínica Dental SET at Carrer del Doctor Trueta, 213, Barcelona. Phone 933 09 18 71 and direct WhatsApp booking.'
          : 'Contacta con Clínica Dental SET en Carrer del Doctor Trueta, 213, Bajos, Barcelona. Teléfono 933 09 18 71 y WhatsApp directo.',
      canonicalPath,
      canonicalUrl,
      alternates: buildAlternates('/contacto'),
      robots: 'noindex, nofollow',
      ogType: 'website',
      ogLocale: getOgLocale(lang),
      ogImage: `${BASE_URL}/assets/logo-blanc.png`,
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contacto - Clínica Dental SET',
        url: canonicalUrl,
        inLanguage: getOgLocale(lang).replace('_', '-'),
        mainEntity: {
          '@type': ['LocalBusiness', 'Dentist', 'MedicalClinic'],
          '@id': `${BASE_URL}/#localbusiness`,
          name: 'Clínica Dental SET',
          telephone: CLINIC_CONTACT.phoneClean,
          email: CLINIC_CONTACT.email,
          address: CLINIC_POSTAL_ADDRESS,
          geo: CLINIC_GEO_COORDINATES,
          hasMap: CLINIC_CONTACT.googleMapsUrl,
          openingHoursSpecification: CLINIC_OPENING_HOURS_SPEC,
          employee: buildMedicalTeamSchema(allTeamMembers, `${BASE_URL}/#localbusiness`),
          contactPoint: [
            {
              '@type': 'ContactPoint',
              telephone: CLINIC_CONTACT.phoneClean,
              contactType: 'customer service',
              availableLanguage: ['Spanish', 'Catalan', 'English'],
              hoursAvailable: CLINIC_OPENING_HOURS_SPEC,
            },
          ],
        },
      },
    };
  }

  // Homepage (/, /ca, /en)
  const canonicalPath = buildLocalizedPath('/', lang);
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  return {
    title:
      lang === 'ca'
        ? 'Clínica Dental SET Barcelona | Odontologia al Poblenou'
        : lang === 'en'
        ? 'Clínica Dental SET Barcelona | Family Dentistry in Poblenou'
        : 'Clínica Dental SET Barcelona | Odontología en Poblenou',
    description:
      lang === 'ca'
        ? 'Clínica Dental SET al Poblenou, Barcelona (Carrer del Doctor Trueta, 213). Més de 25 anys cuidant la teva salut bucodental. Contacte directe per WhatsApp.'
        : lang === 'en'
        ? 'Clínica Dental SET in Poblenou, Barcelona (Carrer del Doctor Trueta, 213). Over 25 years caring for your oral health. Direct WhatsApp & phone contact.'
        : 'Clínica Dental SET en Poblenou, Barcelona (Carrer del Doctor Trueta, 213). Más de 25 años cuidando tu sonrisa con trato cercano. Contacto directo por WhatsApp.',
    canonicalPath,
    canonicalUrl,
    alternates: buildAlternates('/'),
    robots: 'noindex, nofollow',
    ogType: 'website',
    ogLocale: getOgLocale(lang),
    ogImage: `${BASE_URL}/assets/logo-blanc.png`,
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'Dentist', 'MedicalClinic'],
      '@id': `${BASE_URL}/#localbusiness`,
      name: 'Clínica Dental SET',
      description: 'Clínica dental en Poblenou, Barcelona, con más de 25 años de experiencia.',
      image: `${BASE_URL}/assets/logo-blanc.png`,
      logo: `${BASE_URL}/assets/logo-blanc.png`,
      url: canonicalUrl,
      inLanguage: getOgLocale(lang).replace('_', '-'),
      telephone: CLINIC_CONTACT.phoneClean,
      email: CLINIC_CONTACT.email,
      address: CLINIC_POSTAL_ADDRESS,
      geo: CLINIC_GEO_COORDINATES,
      hasMap: CLINIC_CONTACT.googleMapsUrl,
      sameAs: [CLINIC_CONTACT.googleMapsUrl, BASE_URL],
      areaServed: CLINIC_AREA_SERVED,
      openingHoursSpecification: CLINIC_OPENING_HOURS_SPEC,
      employee: buildMedicalTeamSchema(allTeamMembers, `${BASE_URL}/#localbusiness`),
      medicalSpecialty: [
        'Dentistry',
        'OralSurgery',
        'Anesthesia',
        'Pediatric',
        'Orthodontics',
        'Periodontics',
        'Prosthodontics',
      ],
    },
  };
}

function getSpecialtySeo(specialty: Specialty, lang: Language): PageSeoMetadata {
  const specTitle = specialty.title[lang];
  const basePath = `/especialidades/${specialty.slug}`;
  const canonicalPath = buildLocalizedPath(basePath, lang);
  const canonicalUrl = `${BASE_URL}${canonicalPath}`;

  const titles: Record<string, Record<Language, string>> = {
    'implantes-dentales': {
      es: 'Implantes Dentales en Poblenou, Barcelona | Clínica Dental SET',
      ca: 'Implants Dentals al Poblenou, Barcelona | Clínica Dental SET',
      en: 'Dental Implants in Poblenou, Barcelona | Clínica Dental SET',
    },
    'cirugia-oral': {
      es: 'Cirugía Oral en Poblenou, Barcelona | Clínica Dental SET',
      ca: 'Cirurgia Oral al Poblenou, Barcelona | Clínica Dental SET',
      en: 'Oral Surgery in Poblenou, Barcelona | Clínica Dental SET',
    },
    'sedacion-consciente': {
      es: 'Sedación Consciente con Anestesiólogo en Barcelona | Clínica Dental SET',
      ca: 'Sedació Conscient amb Anestesiòleg a Barcelona | Clínica Dental SET',
      en: 'Conscious Sedation with Anesthesiologist in Barcelona | Clínica Dental SET',
    },
    odontopediatria: {
      es: 'Odontopediatría y Dentista Infantil en Poblenou | Clínica Dental SET',
      ca: 'Odontopediatria i Dentista Infantil al Poblenou | Clínica Dental SET',
      en: 'Pediatric Dentistry for Children in Poblenou | Clínica Dental SET',
    },
    'medicina-oral': {
      es: 'Medicina Oral en Poblenou, Barcelona | Clínica Dental SET',
      ca: 'Medicina Oral al Poblenou, Barcelona | Clínica Dental SET',
      en: 'Oral Medicine in Poblenou, Barcelona | Clínica Dental SET',
    },
    ortodoncia: {
      es: 'Ortodoncia en Poblenou, Barcelona | Clínica Dental SET',
      ca: 'Ortodòncia al Poblenou, Barcelona | Clínica Dental SET',
      en: 'Orthodontics in Poblenou, Barcelona | Clínica Dental SET',
    },
    'estetica-dental': {
      es: 'Estética Dental y Blanqueamiento en Poblenou | Clínica Dental SET',
      ca: 'Estètica Dental i Blanquejament al Poblenou | Clínica Dental SET',
      en: 'Cosmetic Dentistry & Whitening in Poblenou | Clínica Dental SET',
    },
    periodoncia: {
      es: 'Periodoncia y Salud de Encías en Poblenou | Clínica Dental SET',
      ca: 'Periodòncia i Salut de Genives al Poblenou | Clínica Dental SET',
      en: 'Periodontics & Gum Health in Poblenou | Clínica Dental SET',
    },
    endodoncia: {
      es: 'Endodoncia en Poblenou, Barcelona | Clínica Dental SET',
      ca: 'Endodòncia al Poblenou, Barcelona | Clínica Dental SET',
      en: 'Endodontics (Root Canal) in Poblenou | Clínica Dental SET',
    },
    'odontologia-general': {
      es: 'Odontología General y Prevención en Poblenou | Clínica Dental SET',
      ca: 'Odontologia General i Prevenció al Poblenou | Clínica Dental SET',
      en: 'General & Preventive Dentistry in Poblenou | Clínica Dental SET',
    },
    'bruxismo-atm': {
      es: 'Bruxismo y Articulación ATM en Poblenou | Clínica Dental SET',
      ca: 'Bruxisme i Articulació ATM al Poblenou | Clínica Dental SET',
      en: 'Bruxism & TMJ Occlusion in Poblenou | Clínica Dental SET',
    },
    'protesis-dental': {
      es: 'Prótesis Dental y Rehabilitación en Poblenou | Clínica Dental SET',
      ca: 'Pròtesi Dental i Rehabilitació al Poblenou | Clínica Dental SET',
      en: 'Dental Prosthetics & Rehabilitation in Poblenou | Clínica Dental SET',
    },
  };

  const title = titles[specialty.slug]?.[lang] || `${specTitle} en Poblenou | Clínica Dental SET`;
  const description =
    lang === 'ca'
      ? `${specTitle} a Clínica Dental SET (Carrer del Doctor Trueta, 213, Poblenou). Atenció propera amb ${specialty.leadDoctor.name} (${specialty.leadDoctor.colegiateNumber}).`
      : lang === 'en'
      ? `${specTitle} at Clínica Dental SET (Carrer del Doctor Trueta, 213, Poblenou). Direct care with ${specialty.leadDoctor.name} (${specialty.leadDoctor.colegiateNumber}).`
      : `${specTitle} en Clínica Dental SET (Carrer del Doctor Trueta, 213, Poblenou). Atención cercana con ${specialty.leadDoctor.name} (${specialty.leadDoctor.colegiateNumber}).`;

  const localBusinessId = `${canonicalUrl}#localbusiness`;

  const assignedTeam: MedicalTeamMemberSchedule[] =
    specialty.medicalTeamSchedule && specialty.medicalTeamSchedule.length > 0
      ? specialty.medicalTeamSchedule
      : [MEDICAL_TEAM_SCHEDULES.izbette, MEDICAL_TEAM_SCHEDULES.silvia];

  const faqSchema = specialty.faqs[lang].map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: f.answer,
    },
  }));

  const schemaJson = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'Dentist', 'MedicalClinic'],
        '@id': localBusinessId,
        name: `Clínica Dental SET · ${specTitle}`,
        alternateName: `Clínica Dental SET Poblenou - ${specialty.title.es}`,
        description,
        url: canonicalUrl,
        mainEntityOfPage: canonicalUrl,
        inLanguage: getOgLocale(lang).replace('_', '-'),
        image: [`${BASE_URL}${specialty.image}`, `${BASE_URL}/assets/logo-blanc.png`],
        logo: `${BASE_URL}/assets/logo-blanc.png`,
        telephone: CLINIC_CONTACT.phoneClean,
        email: CLINIC_CONTACT.email,
        address: CLINIC_POSTAL_ADDRESS,
        geo: CLINIC_GEO_COORDINATES,
        hasMap: CLINIC_CONTACT.googleMapsUrl,
        sameAs: [CLINIC_CONTACT.googleMapsUrl, BASE_URL],
        areaServed: CLINIC_AREA_SERVED,
        publicAccess: true,
        medicalSpecialty: specialty.schemaSpecialty || 'Dentistry',
        openingHoursSpecification: CLINIC_OPENING_HOURS_SPEC,
        parentOrganization: {
          '@type': ['LocalBusiness', 'Dentist'],
          '@id': `${BASE_URL}/#localbusiness`,
          name: 'Clínica Dental SET',
          url: BASE_URL,
        },
        employee: buildMedicalTeamSchema(assignedTeam, localBusinessId),
        department: {
          '@type': ['LocalBusiness', 'MedicalClinic'],
          '@id': `${canonicalUrl}#department`,
          name: `${specTitle} · ${specialty.leadDoctor.name}`,
          telephone: CLINIC_CONTACT.phoneClean,
          url: canonicalUrl,
          address: CLINIC_POSTAL_ADDRESS,
          geo: CLINIC_GEO_COORDINATES,
          hasMap: CLINIC_CONTACT.googleMapsUrl,
          openingHoursSpecification: CLINIC_OPENING_HOURS_SPEC,
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: `${specTitle} - Clínica Dental SET Poblenou`,
          itemListElement: specialty.treatments[lang].map((treatment, idx) => ({
            '@type': 'Offer',
            position: idx + 1,
            itemOffered: {
              '@type': 'MedicalProcedure',
              name: treatment.name,
              description: treatment.description,
            },
          })),
        },
      },
      {
        '@type': 'MedicalWebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: title,
        description,
        inLanguage: getOgLocale(lang).replace('_', '-'),
        about: {
          '@id': localBusinessId,
        },
        mainEntity: {
          '@type': 'MedicalProcedure',
          name: specTitle,
          description: specialty.shortDescription[lang],
          bodyLocation: 'Mouth / Oral cavity',
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: lang === 'ca' ? 'Inici' : lang === 'en' ? 'Home' : 'Inicio',
            item: `${BASE_URL}${buildLocalizedPath('/', lang)}`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: lang === 'ca' ? 'Especialitats' : lang === 'en' ? 'Specialties' : 'Especialidades',
            item: `${BASE_URL}${buildLocalizedPath('/especialidades', lang)}`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: specTitle,
            item: canonicalUrl,
          },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqSchema,
      },
    ],
  };

  return {
    title,
    description,
    canonicalPath,
    canonicalUrl,
    alternates: buildAlternates(basePath),
    robots: 'noindex, nofollow',
    ogType: 'article',
    ogLocale: getOgLocale(lang),
    ogImage: `${BASE_URL}${specialty.image}`,
    schemaJson,
  };
}

/**
 * Updates DOM head elements dynamically for search engines and social crawlers
 */
export function applySeoMetadata(seo: PageSeoMetadata, lang: Language): void {
  if (typeof document === 'undefined') return;

  document.documentElement.lang = lang;
  document.title = seo.title;

  const setMetaName = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaName('description', seo.description);
  setMetaName('robots', seo.robots);
  setMetaName('googlebot', seo.robots);

  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', seo.canonicalUrl);

  const hreflangs: Array<{ key: keyof PageSeoMetadata['alternates']; href: string }> = [
    { key: 'es', href: seo.alternates.es },
    { key: 'ca', href: seo.alternates.ca },
    { key: 'en', href: seo.alternates.en },
    { key: 'x-default', href: seo.alternates['x-default'] },
  ];

  hreflangs.forEach(({ key, href }) => {
    let linkAlt = document.querySelector(`link[rel="alternate"][hreflang="${key}"]`);
    if (!linkAlt) {
      linkAlt = document.createElement('link');
      linkAlt.setAttribute('rel', 'alternate');
      linkAlt.setAttribute('hreflang', key);
      document.head.appendChild(linkAlt);
    }
    linkAlt.setAttribute('href', href);
  });

  const setMetaProperty = (property: string, content: string) => {
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('property', property);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaProperty('og:title', seo.title);
  setMetaProperty('og:description', seo.description);
  setMetaProperty('og:url', seo.canonicalUrl);
  setMetaProperty('og:type', seo.ogType);
  setMetaProperty('og:locale', seo.ogLocale);
  setMetaProperty('og:image', seo.ogImage);

  setMetaName('twitter:title', seo.title);
  setMetaName('twitter:description', seo.description);

  let schemaScript = document.getElementById('dynamic-schema-ld') as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'dynamic-schema-ld';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }
  schemaScript.textContent = JSON.stringify(seo.schemaJson);
}
