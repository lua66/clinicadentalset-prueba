import { Language, Specialty, MedicalTeamMemberSchedule } from '../types';
import { SPECIALTIES, CLINIC_CONTACT, MEDICAL_TEAM_SCHEDULES } from '../data/clinicData';

export interface PageSeoMetadata {
  title: string;
  description: string;
  canonicalPath: string;
  ogType: string;
  schemaJson: object;
}

const BASE_URL = 'https://clinicadentalset.com';

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
    description: 'Horario asistencial de mañana',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '15:00',
    closes: '20:00',
    description: 'Horario asistencial de tarde',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Saturday', 'Sunday'],
    opens: '10:00',
    closes: '14:00',
    description: 'Urgencias odontológicas con cita previa',
  },
];

const CLINIC_AREA_SERVED = [
  { '@type': 'Place', name: 'El Poblenou, Barcelona' },
  { '@type': 'AdministrativeArea', name: 'Sant Martí, Barcelona' },
  { '@type': 'City', name: 'Barcelona' },
  { '@type': 'PostalCodeSpecification', postalCode: '08005', addressCountry: 'ES' },
];

const CLINIC_AMENITIES = [
  { '@type': 'LocationFeatureSpecification', name: 'Metro L4 Poblenou / Llacuna (a 4 min a pie)', value: true },
  { '@type': 'LocationFeatureSpecification', name: 'Acceso a pie de calle (Bajos)', value: true },
  { '@type': 'LocationFeatureSpecification', name: 'Esterilización Hospitalaria Clase B', value: true },
];

function buildMedicalTeamSchema(
  members: MedicalTeamMemberSchedule[],
  localBusinessId: string
) {
  return members.map((member) => ({
    '@type': member.name.startsWith('Dra.') ? ['Person', 'Physician'] : ['Person'],
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
      hoursAvailable: member.hoursAvailable.map((slot) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: slot.dayOfWeek,
        opens: slot.opens,
        closes: slot.closes,
        ...(slot.description ? { description: slot.description } : {}),
      })),
    },
  }));
}

export function getSeoMetadata(path: string, lang: Language): PageSeoMetadata {
  // Check if it's an individual specialty page
  if (path.startsWith('/especialidades/')) {
    const slug = path.replace('/especialidades/', '').split('/')[0];
    const specialty = SPECIALTIES.find((s) => s.slug === slug);

    if (specialty) {
      return getSpecialtySeo(specialty, lang);
    }
  }

  const allTeamMembers = [
    MEDICAL_TEAM_SCHEDULES.izbette,
    MEDICAL_TEAM_SCHEDULES.ruby,
    MEDICAL_TEAM_SCHEDULES.silvia,
  ];

  // Handle static sub-pages
  if (path === '/especialidades') {
    return {
      title: lang === 'ca'
        ? 'Especialitats Odontològiques al Poblenou | Clínica Dental SET'
        : lang === 'en'
        ? 'Dental Specialties in Poblenou Barcelona | Clínica Dental SET'
        : 'Especialidades Odontológicas en Poblenou | Clínica Dental SET',
      description: lang === 'ca'
        ? 'Coneix totes les nostres especialitats dentals al Poblenou: implants, ortodòncia invisible, periodòncia i estètica. Consulta el teu tractament.'
        : lang === 'en'
        ? 'Explore our comprehensive dental specialties in Poblenou, Barcelona: implants, clear aligners, periodontics and aesthetics. Dedicated care.'
        : 'Descubre todas nuestras especialidades odontológicas en Poblenou: implantes, ortodoncia invisible, estética dental y periodoncia. Pide tu cita.',
      canonicalPath: '/especialidades',
      ogType: 'website',
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Especialidades Odontológicas - Clínica Dental SET',
        url: `${BASE_URL}/especialidades`,
        description: 'Especialidades odontológicas integrales en Carrer del Doctor Trueta 213, Poblenou.',
        provider: {
          '@type': ['LocalBusiness', 'Dentist'],
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

  if (path === '/equipo') {
    return {
      title: lang === 'ca'
        ? 'Equip Mèdic i Odontòlogues al Poblenou | Dra. Izbette i Dra. Ruby'
        : lang === 'en'
        ? 'Medical Dental Team in Poblenou | Dr. Izbette Luis & Dr. Ruby Herrera'
        : 'Equipo Médico Dental en Poblenou | Dra. Izbette Luis y Dra. Ruby Herrera',
      description: lang === 'ca'
        ? 'Quadre mèdic col·legiat a Clínica Dental SET Poblenou. Dra. Izbette Luis i Dra. Ruby Herrera. Odontologia propera i familiar de confiança.'
        : lang === 'en'
        ? 'Board-certified dental team in Poblenou, Barcelona. Dr. Izbette Luis and Dr. Ruby Herrera. Over 40 years of local healthcare tradition.'
        : 'Cuadro médico colegiado en Clínica Dental SET Poblenou. Dra. Izbette Luis y Dra. Ruby Herrera. Odontología cercana y de confianza.',
      canonicalPath: '/equipo',
      ogType: 'profile',
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'Equipo Médico - Clínica Dental SET',
        url: `${BASE_URL}/equipo`,
        mainEntity: {
          '@type': ['LocalBusiness', 'Dentist', 'MedicalOrganization'],
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

  if (path === '/clinica') {
    return {
      title: lang === 'ca'
        ? 'Instal·lacions i Gabinets al Poblenou | Clínica Dental SET'
        : lang === 'en'
        ? 'Facilities & Clinical Operatories | Clínica Dental SET Barcelona'
        : 'Instalaciones y Gabinetes en Poblenou | Clínica Dental SET',
      description: lang === 'ca'
        ? 'Instal·lacions d’última generació al Carrer del Doctor Trueta 213, Poblenou. Esterilització hospitalària classe B i tecnologia diagnòstica 3D.'
        : lang === 'en'
        ? 'Modern clinical facilities in Poblenou, Barcelona. Class-B sterilization protocols and 3D diagnostics for your comfort and safety.'
        : 'Instalaciones de última generación en Carrer del Doctor Trueta 213, Poblenou. Gabinetes equipados con esterilización clase B y tecnología 3D.',
      canonicalPath: '/clinica',
      ogType: 'website',
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': ['LocalBusiness', 'MedicalClinic', 'Dentist'],
        '@id': `${BASE_URL}/clinica#localbusiness`,
        name: 'Clínica Dental SET - Instalaciones Poblenou',
        url: `${BASE_URL}/clinica`,
        telephone: CLINIC_CONTACT.phoneClean,
        address: CLINIC_POSTAL_ADDRESS,
        geo: CLINIC_GEO_COORDINATES,
        hasMap: CLINIC_CONTACT.googleMapsUrl,
        openingHoursSpecification: CLINIC_OPENING_HOURS_SPEC,
        amenityFeature: CLINIC_AMENITIES,
      },
    };
  }

  if (path === '/contacto') {
    return {
      title: lang === 'ca'
        ? 'Contacte, Telèfon i Ubicació al Poblenou | Clínica Dental SET'
        : lang === 'en'
        ? 'Contact, Phone & Location in Poblenou | Clínica Dental SET'
        : 'Contacto, Teléfono y Ubicación en Poblenou | Clínica Dental SET',
      description: lang === 'ca'
        ? 'Comunica’t directament amb Clínica Dental SET al Carrer Doctor Trueta 213, Poblenou. Telèfon: 933 09 18 71. Contacte directe per WhatsApp.'
        : lang === 'en'
        ? 'Contact Clínica Dental SET in Poblenou Barcelona. Phone: 933 09 18 71. Carrer del Doctor Trueta 213. Instant WhatsApp appointment booking.'
        : 'Contacta directamente con Clínica Dental SET en Carrer Doctor Trueta 213, Poblenou. Teléfono: 933 09 18 71. Cita directa por WhatsApp.',
      canonicalPath: '/contacto',
      ogType: 'website',
      schemaJson: {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contacto - Clínica Dental SET',
        url: `${BASE_URL}/contacto`,
        mainEntity: {
          '@type': ['LocalBusiness', 'Dentist'],
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
            },
          ],
        },
      },
    };
  }

  // Default: Homepage (/)
  return {
    title: lang === 'ca'
      ? 'Clínica Dental SET Barcelona | Odontologia Avançada al Poblenou'
      : lang === 'en'
      ? 'Clínica Dental SET Barcelona | Advanced Family Dentistry in Poblenou'
      : 'Clínica Dental SET Barcelona | Odontología Avanzada en Poblenou',
    description: lang === 'ca'
      ? 'Clínica Dental SET al Poblenou, Barcelona. Més de 40 anys de tradició familiar al Carrer Doctor Trueta 213. Contacte directe per WhatsApp.'
      : lang === 'en'
      ? 'Clínica Dental SET in Poblenou, Barcelona. Over 40 years of dental care tradition on Carrer Doctor Trueta 213. Direct WhatsApp booking.'
      : 'Clínica Dental SET en Poblenou, Barcelona. Más de 40 años cuidando de tu sonrisa en Carrer del Doctor Trueta 213. Contacto directo por WhatsApp.',
    canonicalPath: '/',
    ogType: 'website',
    schemaJson: {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'Dentist', 'MedicalClinic'],
      '@id': `${BASE_URL}/#localbusiness`,
      name: 'Clínica Dental SET',
      image: `${BASE_URL}/assets/logo-blanc.png`,
      logo: `${BASE_URL}/assets/logo-blanc.png`,
      url: BASE_URL,
      telephone: CLINIC_CONTACT.phoneClean,
      email: CLINIC_CONTACT.email,
      priceRange: '€€',
      currenciesAccepted: 'EUR',
      paymentAccepted: 'Cash, Credit Card, Debit Card, Financing',
      address: CLINIC_POSTAL_ADDRESS,
      geo: CLINIC_GEO_COORDINATES,
      hasMap: CLINIC_CONTACT.googleMapsUrl,
      sameAs: [CLINIC_CONTACT.googleMapsUrl, BASE_URL],
      areaServed: CLINIC_AREA_SERVED,
      amenityFeature: CLINIC_AMENITIES,
      openingHoursSpecification: CLINIC_OPENING_HOURS_SPEC,
      employee: buildMedicalTeamSchema(allTeamMembers, `${BASE_URL}/#localbusiness`),
      medicalSpecialty: [
        'Dentistry',
        'Orthodontics',
        'Periodontics',
        'Prosthodontics',
        'OralSurgery',
      ],
    },
  };
}

function getSpecialtySeo(specialty: Specialty, lang: Language): PageSeoMetadata {
  const specTitle = specialty.title[lang];
  const specSubtitle = specialty.subtitle[lang];

  // Custom high-CTR titles per specialty
  const titles: Record<string, Record<Language, string>> = {
    'implantes-dentales': {
      es: 'Implantes Dentales en Poblenou, Barcelona | Clínica Dental SET',
      ca: 'Implants Dentals al Poblenou, Barcelona | Clínica Dental SET',
      en: 'Dental Implants in Poblenou, Barcelona | Clínica Dental SET',
    },
    'ortodoncia': {
      es: 'Ortodoncia Invisible e Invisalign en Poblenou | Clínica Dental SET',
      ca: 'Ortodòncia Invisible i Invisalign al Poblenou | Clínica Dental SET',
      en: 'Clear Aligners & Invisalign in Poblenou | Clínica Dental SET',
    },
    'estetica-dental': {
      es: 'Estética Dental y Carillas de Porcelana en Poblenou | Clínica SET',
      ca: 'Estètica Dental i Carilles de Porcellana al Poblenou | Clínica SET',
      en: 'Cosmetic Dentistry & Veneers in Poblenou | Clínica Dental SET',
    },
    'periodoncia': {
      es: 'Periodoncia y Tratamiento de Encías en Poblenou | Clínica SET',
      ca: 'Periodòncia i Tractament de Genives al Poblenou | Clínica SET',
      en: 'Periodontics & Gum Disease Care in Poblenou | Clínica Dental SET',
    },
    'endodoncia': {
      es: 'Endodoncia y Preservación Dental en Poblenou | Clínica Dental SET',
      ca: 'Endodòncia i Preservació Dental al Poblenou | Clínica Dental SET',
      en: 'Root Canal & Tooth Preservation in Poblenou | Clínica Dental SET',
    },
    'odontologia-general': {
      es: 'Odontología General y Limpieza Dental en Poblenou | Clínica SET',
      ca: 'Odontologia General i Neteja Dental al Poblenou | Clínica SET',
      en: 'General Dentistry & Teeth Cleaning in Poblenou | Clínica SET',
    },
    'bruxismo-atm': {
      es: 'Férula de Descarga Michigan para Bruxismo en Poblenou | Clínica SET',
      ca: 'Fèrula de Descàrrega Michigan per a Bruxisme al Poblenou | SET',
      en: 'TMJ Splint & Teeth Grinding Treatment in Poblenou | Clínica SET',
    },
    'sedacion-consciente': {
      es: 'Sedación Consciente para Miedo al Dentista en Poblenou | Clínica SET',
      ca: 'Sedació Conscient per a Por al Dentista al Poblenou | Clínica SET',
      en: 'Conscious Sedation for Dental Fear in Poblenou | Clínica SET',
    },
  };

  // Custom 130-155 char meta descriptions with call to action
  const descriptions: Record<string, Record<Language, string>> = {
    'implantes-dentales': {
      es: 'Especialistas en implantes dentales fijos y carga inmediata en Poblenou (Doctor Trueta 213). Máxima precisión quirúrgica 3D. Pide cita directa por WhatsApp.',
      ca: 'Especialistes en implants dentals fixos i càrrega immediata al Poblenou (Doctor Trueta 213). Màxima precisió 3D. Demana cita per WhatsApp.',
      en: 'Specialists in dental implants and immediate loading in Poblenou (Doctor Trueta 213). Computer-guided 3D accuracy. Book directly via WhatsApp.',
    },
    'ortodoncia': {
      es: 'Alinea tu sonrisa de forma invisible y cómoda en Poblenou. Férulas transparentes y escaneo 3D digital con la Dra. Izbette Luis. Pide tu cita directa.',
      ca: 'Alinea el teu somriure de manera invisible i còmoda al Poblenou. Fèrules transparents i escàner 3D amb la Dra. Izbette Luis. Demana la teva cita.',
      en: 'Straighten teeth discreetly with invisible clear aligners in Poblenou. 3D digital impressions with Dr. Izbette Luis. Book on WhatsApp today.',
    },
    'estetica-dental': {
      es: 'Diseño de sonrisa natural con microcarillas cerámicas y blanqueamiento LED en Poblenou. Resultados armónicos y seguros. Contacta por WhatsApp directo.',
      ca: 'Disseny de somriure natural amb microcarilles de ceràmica i blanquejament LED al Poblenou. Resultats harmònics. Contacta per WhatsApp directe.',
      en: 'Harmonious smile design with porcelain micro-veneers and safe LED whitening in Poblenou. Natural elegance. Contact us via WhatsApp.',
    },
    'periodoncia': {
      es: 'Detén el sangrado y retracción de encías en Poblenou. Tratamiento de periodontitis y curetajes con la cirujana Dra. Ruby Herrera. Cita por WhatsApp.',
      ca: 'Atura el sagnat i la piorrea al Poblenou. Tractament de periodontitis i curetatges amb la cirurgiana Dra. Ruby Herrera. Cita per WhatsApp.',
      en: 'Stop gum bleeding, recession, and bone loss in Poblenou. Advanced periodontitis care with Dr. Ruby Herrera. Fast WhatsApp booking.',
    },
    'endodoncia': {
      es: 'Salva tu diente natural y alivia el dolor agudo de muelas en Poblenou. Endodoncia rotatoria de alta precisión en Doctor Trueta 213. Contacto directo.',
      ca: 'Salva la teva dent natural i calma el dolor agut al Poblenou. Endodòncia rotatòria de precisió al Carrer Doctor Trueta 213. Contacte directe.',
      en: 'Relieve intense tooth pain and save your natural tooth in Poblenou. High-precision rotary root canal care at Doctor Trueta 213. Chat now.',
    },
    'odontologia-general': {
      es: 'Revisiones preventivas, empastes estéticos y limpiezas dentales en Poblenou para toda la familia. Trato humano y cercano sin prisas. Pide cita por WhatsApp.',
      ca: 'Revisions preventives, empastaments estètics i higienes al Poblenou per a tota la família. Tracte proper sense presses. Cita per WhatsApp.',
      en: 'Gentle family checkups, tooth-colored fillings, and prophylaxis in Poblenou. Conservative caring dentistry. Book your visit on WhatsApp.',
    },
    'bruxismo-atm': {
      es: 'Férulas de descarga Michigan 3D en Poblenou. Alivia dolores de mandíbula, cuello y desgaste dental nocturno. Ajuste clínico con la Dra. Izbette Luis.',
      ca: 'Fèrules de descàrrega Michigan 3D al Poblenou. Alleuja dolors de mandíbula, coll i desgast dental nocturn. Ajust amb la Dra. Izbette Luis.',
      en: 'Custom 3D Michigan night guards in Poblenou. Eliminate jaw stiffness, neck tension, and enamel grinding. Clinical balancing by Dr. Izbette Luis.',
    },
    'sedacion-consciente': {
      es: 'Supera el miedo al dentista con sedación consciente en Poblenou. Supervisión por médico anestesista para tratamientos sin estrés ni dolor en 1 día.',
      ca: 'Supera la por al dentista amb sedació conscient al Poblenou. Supervisió per metge anestesiòleg per a tractaments sense dolor en 1 dia.',
      en: 'Overcome dental anxiety with medical conscious sedation in Poblenou. Continuous anesthesiologist monitoring for stress-free visits in 1 session.',
    },
  };

  const title = titles[specialty.slug]?.[lang] || `${specTitle} en Poblenou | Clínica Dental SET`;
  const description = descriptions[specialty.slug]?.[lang] || `${specSubtitle} Atención especializada en Carrer Doctor Trueta 213, Poblenou. Cita por WhatsApp.`;
  const pageUrl = `${BASE_URL}/especialidades/${specialty.slug}`;
  const localBusinessId = `${pageUrl}#localbusiness`;

  const assignedTeam: MedicalTeamMemberSchedule[] = specialty.medicalTeamSchedule && specialty.medicalTeamSchedule.length > 0
    ? specialty.medicalTeamSchedule
    : [MEDICAL_TEAM_SCHEDULES.izbette, MEDICAL_TEAM_SCHEDULES.silvia];

  const leadDoctorOpeningHours = (specialty.leadDoctor.hoursAvailable || MEDICAL_TEAM_SCHEDULES.izbette.hoursAvailable).map((slot) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: slot.dayOfWeek,
    opens: slot.opens,
    closes: slot.closes,
    ...(slot.description ? { description: slot.description } : {}),
  }));

  // FAQ Schema items
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
      // 1. Granular LocalBusiness Entity specific to this Specialty & Google Maps Local Pack
      {
        '@type': ['LocalBusiness', 'Dentist', 'MedicalClinic'],
        '@id': localBusinessId,
        name: `Clínica Dental SET · ${specTitle}`,
        alternateName: `Clínica Dental SET Poblenou - ${specialty.title.es}`,
        description: `${description} ${specialty.leadDoctor.name}: ${specialty.leadDoctor.scheduleSummary?.[lang] || CLINIC_CONTACT.hours.weekdays}.`,
        url: pageUrl,
        mainEntityOfPage: pageUrl,
        image: [`${BASE_URL}${specialty.image}`, `${BASE_URL}/assets/logo-blanc.png`],
        logo: `${BASE_URL}/assets/logo-blanc.png`,
        telephone: CLINIC_CONTACT.phoneClean,
        email: CLINIC_CONTACT.email,
        priceRange: '€€',
        currenciesAccepted: 'EUR',
        paymentAccepted: 'Cash, Credit Card, Debit Card, Financing',
        address: CLINIC_POSTAL_ADDRESS,
        geo: CLINIC_GEO_COORDINATES,
        hasMap: CLINIC_CONTACT.googleMapsUrl,
        sameAs: [CLINIC_CONTACT.googleMapsUrl, BASE_URL],
        areaServed: CLINIC_AREA_SERVED,
        publicAccess: true,
        amenityFeature: CLINIC_AMENITIES,
        medicalSpecialty: specialty.schemaSpecialty || 'Dentistry',
        openingHoursSpecification: CLINIC_OPENING_HOURS_SPEC,
        parentOrganization: {
          '@type': ['LocalBusiness', 'Dentist'],
          '@id': `${BASE_URL}/#localbusiness`,
          name: 'Clínica Dental SET',
          url: BASE_URL,
        },
        // Granular Medical Team with Specific Individual Consultation Schedules
        employee: buildMedicalTeamSchema(assignedTeam, localBusinessId),
        // Dedicated Clinical Specialty Department LocalBusiness node with Lead Specialist Hours
        department: {
          '@type': ['LocalBusiness', 'MedicalClinic'],
          '@id': `${pageUrl}#department`,
          name: `Unidad de ${specTitle} · ${specialty.leadDoctor.name}`,
          telephone: CLINIC_CONTACT.phoneClean,
          url: pageUrl,
          address: CLINIC_POSTAL_ADDRESS,
          geo: CLINIC_GEO_COORDINATES,
          hasMap: CLINIC_CONTACT.googleMapsUrl,
          openingHoursSpecification: leadDoctorOpeningHours,
        },
        // Catalog of specific medical procedures offered under this specialty
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
      // 2. MedicalWebPage Entity
      {
        '@type': 'MedicalWebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: title,
        description: description,
        inLanguage: lang === 'ca' ? 'ca-ES' : lang === 'en' ? 'en-US' : 'es-ES',
        about: {
          '@id': localBusinessId,
        },
        mainEntity: {
          '@type': 'MedicalProcedure',
          name: specTitle,
          description: specialty.shortDescription[lang],
          bodyLocation: 'Mouth / Oral cavity',
          howPerformed: specialty.treatments[lang].map((t) => t.name).join(', '),
        },
      },
      // 3. BreadcrumbList for rich SERP navigation
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: lang === 'ca' ? 'Inici' : lang === 'en' ? 'Home' : 'Inicio',
            item: `${BASE_URL}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: lang === 'ca' ? 'Especialitats' : lang === 'en' ? 'Specialties' : 'Especialidades',
            item: `${BASE_URL}/especialidades`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: specTitle,
            item: pageUrl,
          },
        ],
      },
      // 4. FAQPage for expandable rich snippets
      {
        '@type': 'FAQPage',
        mainEntity: faqSchema,
      },
    ],
  };

  return {
    title,
    description,
    canonicalPath: `/especialidades/${specialty.slug}`,
    ogType: 'article',
    schemaJson,
  };
}

/**
 * Updates DOM head elements dynamically for search engines and social crawlers
 */
export function applySeoMetadata(seo: PageSeoMetadata): void {
  if (typeof document === 'undefined') return;

  // 1. Title
  document.title = seo.title;

  // 2. Meta Description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', seo.description);

  // 3. Canonical Tag
  const canonicalUrl = `${BASE_URL}${seo.canonicalPath}`;
  let linkCanonical = document.querySelector('link[rel="canonical"]');
  if (!linkCanonical) {
    linkCanonical = document.createElement('link');
    linkCanonical.setAttribute('rel', 'canonical');
    document.head.appendChild(linkCanonical);
  }
  linkCanonical.setAttribute('href', canonicalUrl);

  // 4. OpenGraph Tags
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
  setMetaProperty('og:url', canonicalUrl);
  setMetaProperty('og:type', seo.ogType);

  // 5. Twitter Card Tags
  const setMetaName = (name: string, content: string) => {
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute('name', name);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  setMetaName('twitter:title', seo.title);
  setMetaName('twitter:description', seo.description);

  // 6. Schema.org JSON-LD Script
  let schemaScript = document.getElementById('dynamic-schema-ld') as HTMLScriptElement | null;
  if (!schemaScript) {
    schemaScript = document.createElement('script');
    schemaScript.id = 'dynamic-schema-ld';
    schemaScript.type = 'application/ld+json';
    document.head.appendChild(schemaScript);
  }
  schemaScript.textContent = JSON.stringify(seo.schemaJson);
}
