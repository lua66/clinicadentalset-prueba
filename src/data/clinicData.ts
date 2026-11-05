import { Specialty, TeamMember, ClinicImage, Testimonial, MedicalTeamMemberSchedule } from '../types';
import { SPECIALTY_SLUG_MAP } from '../utils/routing';

export const CLINIC_CONTACT = {
  phone: '933 09 18 71',
  phoneClean: '+34933091871',
  whatsapp: '697 35 85 40',
  whatsappClean: '34697358540',
  email: 'info@clinicadentalset.com',
  address: 'Carrer del Doctor Trueta, 213, Bajos',
  city: '08005 Barcelona (Poblenou)',
  metro: '[Líneas de metro y transporte público a confirmar por la clínica]',
  bus: '[Paradas de autobús y aparcamiento cercano a confirmar por la clínica]',
  hours: {
    weekdays: 'Lunes a Viernes · 10:00h – 14:00h / 15:00h – 20:00h',
  },
  geo: {
    latitude: 41.4005081,
    longitude: 2.2008324,
  },
  googleMapsUrl: 'https://maps.google.com/?q=Clinica+Dental+Set+Carrer+del+Doctor+Trueta+213+08005+Barcelona',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.839611598918!2d2.200832376602334!3d41.40050809525418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a33c29fb9f55%3A0x6b8b0e77d0799818!2sCl%C3%ADnica%20Dental%20SET!5e0!3m2!1ses!2ses!4v1715000000000!5m2!1ses!2ses',
};

const CLINIC_STANDARD_SCHEDULE_SLOTS = [
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '10:00',
    closes: '14:00',
    description: 'Horario asistencial de mañana (Lunes a Viernes)',
  },
  {
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '15:00',
    closes: '20:00',
    description: 'Horario asistencial de tarde (Lunes a Viernes)',
  },
];

export const MEDICAL_TEAM_SCHEDULES: Record<
  'izbette' | 'ruby' | 'silvia' | 'anestesiologo',
  MedicalTeamMemberSchedule
> = {
  izbette: {
    name: 'Dra. Izbette Luis Torres',
    role: 'Odontóloga · Col. 5664 COEC',
    medicalSpecialty: 'Dentistry',
    scheduleSummary: {
      es: '[Horario de consulta de la Dra. Izbette Luis Torres a confirmar con recepción · Clínica: L-V 10:00h–14:00h / 15:00h–20:00h]',
      ca: '[Horari de consulta de la Dra. Izbette Luis Torres a confirmar amb recepció · Clínica: Dl-Dv 10:00h–14:00h / 15:00h–20:00h]',
      en: '[Dr. Izbette Luis Torres consultation hours confirmed via reception · Clinic: Mon–Fri 10:00–14:00 / 15:00–20:00]',
    },
    hoursAvailable: CLINIC_STANDARD_SCHEDULE_SLOTS,
  },
  ruby: {
    name: 'Dra. Ruby Alexandra Herrera Villamil',
    role: 'Odontóloga · Col. 5929 COEC',
    medicalSpecialty: 'OralSurgery',
    scheduleSummary: {
      es: '[Horario de consulta de la Dra. Ruby Herrera a confirmar con recepción · Clínica: L-V 10:00h–14:00h / 15:00h–20:00h]',
      ca: '[Horari de consulta de la Dra. Ruby Herrera a confirmar amb recepció · Clínica: Dl-Dv 10:00h–14:00h / 15:00h–20:00h]',
      en: '[Dr. Ruby Herrera consultation hours confirmed via reception · Clinic: Mon–Fri 10:00–14:00 / 15:00–20:00]',
    },
    hoursAvailable: CLINIC_STANDARD_SCHEDULE_SLOTS,
  },
  anestesiologo: {
    name: 'Médico Anestesiólogo en Clínica · [Nombre y n.º de colegiado a confirmar]',
    role: 'Médico Especialista en Anestesiología · [N.º Colegiado a confirmar]',
    medicalSpecialty: 'Anesthesia',
    scheduleSummary: {
      es: 'Sesiones de sedación consciente concertadas bajo cita previa en consulta · [Días y franja horaria exacta a confirmar con recepción]',
      ca: 'Sessions de sedació conscient concertades amb cita prèvia a consulta · [Dies i franja horària exacta a confirmar amb recepció]',
      en: 'Conscious sedation sessions scheduled by appointment at our clinic · [Exact days & hours confirmed via reception]',
    },
    hoursAvailable: CLINIC_STANDARD_SCHEDULE_SLOTS,
  },
  silvia: {
    name: 'Sílvia Degorgue Magrazo',
    role: 'Equipo Clínica Dental SET',
    medicalSpecialty: 'Dentistry',
    scheduleSummary: {
      es: 'Lunes a Viernes · 10:00h – 14:00h / 15:00h – 20:00h',
      ca: 'Dilluns a Divendres · 10:00h – 14:00h / 15:00h – 20:00h',
      en: 'Monday to Friday · 10:00 – 14:00 / 15:00 – 20:00',
    },
    hoursAvailable: CLINIC_STANDARD_SCHEDULE_SLOTS,
  },
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'izbette-luis',
    name: 'Dra. Izbette Luis Torres',
    collegiateNumber: 'Col. 5664 COEC',
    role: {
      es: 'Odontóloga · Clínica Dental SET',
      ca: 'Odontòloga · Clínica Dental SET',
      en: 'Dentist · Clínica Dental SET',
    },
    specialty: {
      es: '[Áreas clínicas principales a confirmar por la doctora]',
      ca: '[Àrees clíniques principals a confirmar per la doctora]',
      en: '[Primary clinical focus areas to be confirmed by the doctor]',
    },
    bio: {
      es: '[Presentación profesional, años de trayectoria y enfoque asistencial facilitado por la Dra. Izbette Luis Torres.]',
      ca: '[Presentació professional, trajectòria i enfocament assistencial facilitat per la Dra. Izbette Luis Torres.]',
      en: '[Professional background and clinical care approach to be provided by Dr. Izbette Luis Torres.]',
    },
    credentials: [
      '[Titulación universitaria en Odontología a confirmar por la clínica]',
      '[Formación de posgrado o especialidad a confirmar por la clínica]',
      'Colegiada n.º 5664 en el Col·legi Oficial d’Odontòlegs i Estomatòlegs de Catalunya (COEC)',
    ],
    image: '/assets/equip1.jpg',
    scheduleSummary: MEDICAL_TEAM_SCHEDULES.izbette.scheduleSummary,
    hoursAvailable: MEDICAL_TEAM_SCHEDULES.izbette.hoursAvailable,
  },
  {
    id: 'ruby-herrera',
    name: 'Dra. Ruby Alexandra Herrera Villamil',
    collegiateNumber: 'Col. 5929 COEC',
    role: {
      es: 'Odontóloga · Clínica Dental SET',
      ca: 'Odontòloga · Clínica Dental SET',
      en: 'Dentist · Clínica Dental SET',
    },
    specialty: {
      es: '[Áreas clínicas principales a confirmar por la doctora]',
      ca: '[Àrees clíniques principals a confirmar per la doctora]',
      en: '[Primary clinical focus areas to be confirmed by the doctor]',
    },
    bio: {
      es: '[Presentación profesional, especialidad quirúrgica o clínica y experiencia facilitada por la Dra. Ruby Alexandra Herrera Villamil.]',
      ca: '[Presentació professional, especialitat quirúrgica o clínica i experiència facilitada per la Dra. Ruby Alexandra Herrera Villamil.]',
      en: '[Professional background and surgical/clinical specialization to be provided by Dr. Ruby Alexandra Herrera Villamil.]',
    },
    credentials: [
      '[Titulación universitaria en Odontología a confirmar por la clínica]',
      '[Máster o formación específica a confirmar por la clínica]',
      'Colegiada n.º 5929 en el Col·legi Oficial d’Odontòlegs i Estomatòlegs de Catalunya (COEC)',
    ],
    image: '/assets/equip4.jpg',
    scheduleSummary: MEDICAL_TEAM_SCHEDULES.ruby.scheduleSummary,
    hoursAvailable: MEDICAL_TEAM_SCHEDULES.ruby.hoursAvailable,
  },
  {
    id: 'silvia-degorgue',
    name: 'Sílvia Degorgue Magrazo',
    role: {
      es: 'Equipo Clínica Dental SET',
      ca: 'Equip Clínica Dental SET',
      en: 'Clínica Dental SET Team',
    },
    specialty: {
      es: '[Funciones asistenciales y atención al paciente a confirmar por la clínica]',
      ca: '[Funcions assistencials i atenció al pacient a confirmar per la clínica]',
      en: '[Patient care and clinical support responsibilities to be confirmed]',
    },
    bio: {
      es: '[Presentación profesional y funciones dentro del equipo de Clínica Dental SET facilitadas por Sílvia Degorgue Magrazo.]',
      ca: '[Presentació professional i funcions dins l’equip de Clínica Dental SET facilitades per Sílvia Degorgue Magrazo.]',
      en: '[Professional profile and patient care role at Clínica Dental SET to be confirmed.]',
    },
    credentials: [
      '[Titulación sanitaria o administrativa a confirmar por la clínica]',
      '[Funciones de recepción, coordinación o higiene a confirmar por la clínica]',
    ],
    image: '/assets/equip2.jpg',
    scheduleSummary: MEDICAL_TEAM_SCHEDULES.silvia.scheduleSummary,
    hoursAvailable: MEDICAL_TEAM_SCHEDULES.silvia.hoursAvailable,
  },
];

export const SPECIALTIES: Specialty[] = [
  {
    id: 'implantes-dentales',
    slug: 'implantes-dentales',
    slugs: SPECIALTY_SLUG_MAP['implantes-dentales'],
    schemaSpecialty: 'OralSurgery',
    title: {
      es: 'Implantes Dentales',
      ca: 'Implants Dentals',
      en: 'Dental Implants',
    },
    subtitle: {
      es: 'Recupera la función masticatoria y la estética de tu sonrisa con tratamientos implantológicos adaptados a cada paciente.',
      ca: 'Recupera la funció masticatòria i l’estètica del teu somriure amb tractaments implantològics adaptats a cada pacient.',
      en: 'Restore bite function and natural smile aesthetics with personalized dental implant treatments in Poblenou.',
    },
    badge: {
      es: 'Implantología',
      ca: 'Implantologia',
      en: 'Implantology',
    },
    leadDoctor: {
      name: 'Dra. Ruby Alexandra Herrera Villamil',
      role: 'Odontóloga Colegiada · Col. 5929 COEC',
      colegiateNumber: 'Col. 5929 COEC',
      image: '/assets/equip4.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.ruby.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.ruby.hoursAvailable,
    },
    medicalTeamSchedule: [MEDICAL_TEAM_SCHEDULES.ruby, MEDICAL_TEAM_SCHEDULES.silvia],
    shortDescription: {
      es: 'Reposición de piezas dentales ausentes mediante implantes dentales y valoración clínica individualizada.',
      ca: 'Reposició de peces dentals absents mitjançant implants dentals i valoració clínica individualitzada.',
      en: 'Replacement of missing teeth through dental implants and individualized clinical evaluation.',
    },
    fullDescription: {
      es: 'La pérdida de una o varias piezas dentales afecta tanto a la masticación como al equilibrio del resto de la boca. En Clínica Dental SET realizamos un estudio previo personalizado para valorar cada caso y planificar la reposición dental adecuada. [Detalles sobre protocolos implantológicos, materiales y pruebas diagnósticas a confirmar por la clínica.]',
      ca: 'La pèrdua d’una o més peces dentals afecta tant la masticació com l’equilibri de la boca. A Clínica Dental SET realitzem un estudi previ personalitzat per valorar cada cas. [Detalls sobre protocols implantològics i proves diagnòstiques a confirmar per la clínica.]',
      en: 'Missing teeth affect both chewing function and overall oral balance. At Clínica Dental SET we perform an individualized clinical evaluation for each patient. [Specific implant protocols and diagnostic equipment to be confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Ausencia de una o varias piezas dentales',
        'Necesidad de sustituir prótesis removibles por una solución fija',
        '[Indicaciones clínicas adicionales confirmadas por el equipo médico]',
      ],
      ca: [
        'Absència d’una o més peces dentals',
        'Necessitat de substituir pròtesis amovibles per una solució fixa',
        '[Indicacions clíniques addicionals confirmades per l’equip mèdic]',
      ],
      en: [
        'One or more missing teeth',
        'Patients seeking a fixed alternative to removable dentures',
        '[Additional clinical indications confirmed by our medical team]',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Implantes dentales unitarios y múltiples',
          description: '[Descripción del procedimiento, marcas o materiales empleados confirmados por la clínica.]',
        },
        {
          name: 'Rehabilitación protésica sobre implantes',
          description: '[Opciones de coronas o puentes sobre implantes disponibles en la clínica.]',
        },
        {
          name: 'Posibilidad de realizar el tratamiento con sedación consciente',
          description: 'Disponemos de médico anestesiólogo en la clínica bajo cita previa para pacientes que desean mayor tranquilidad durante su tratamiento.',
        },
      ],
      ca: [
        {
          name: 'Implants dentals unitaris i múltiples',
          description: '[Descripció del procediment i materials confirmats per la clínica.]',
        },
        {
          name: 'Rehabilitació protèsica sobre implants',
          description: '[Opcions de corones o ponts sobre implants disponibles a la clínica.]',
        },
        {
          name: 'Possibilitat de realitzar el tractament amb sedació conscient',
          description: 'Disposem de metge anestesiòleg a la clínica amb cita prèvia per a pacients que desitgen més tranquil·litat.',
        },
      ],
      en: [
        {
          name: 'Single and multiple dental implants',
          description: '[Procedure overview and materials confirmed by the clinic.]',
        },
        {
          name: 'Implant-supported crowns and bridges',
          description: '[Prosthetic restoration options over dental implants available at our clinic.]',
        },
        {
          name: 'Optional conscious sedation with anesthesiologist',
          description: 'We count on an in-house physician anesthesiologist by appointment for patients seeking extra comfort.',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Cómo se planifica un tratamiento con implantes dentales?',
          answer: '[Explicación del proceso de primera visita, pruebas radiográficas y planificación confirmada por la doctora.]',
        },
        {
          question: '¿Se pueden colocar implantes dentales bajo sedación consciente?',
          answer: 'Sí, en Clínica Dental SET contamos con un médico anestesiólogo en consulta para realizar tratamientos de implantología bajo sedación consciente supervisada.',
        },
      ],
      ca: [
        {
          question: 'Com es planifica un tractament amb implants dentals?',
          answer: '[Explicació del procés de primera visita, proves radiogràfiques i planificació confirmada per la doctora.]',
        },
        {
          question: 'Es poden col·locar implants dentals sota sedació conscient?',
          answer: 'Sí, a Clínica Dental SET comptem amb un metge anestesiòleg a consulta per realitzar tractaments d’implantologia sota sedació conscient supervisada.',
        },
      ],
      en: [
        {
          question: 'How is a dental implant treatment planned?',
          answer: '[Overview of initial consultation, diagnostic imaging, and treatment planning confirmed by the clinic.]',
        },
        {
          question: 'Can dental implants be placed with conscious sedation?',
          answer: 'Yes, Clínica Dental SET works with an in-house anesthesiologist by appointment to provide supervised conscious sedation.',
        },
      ],
    },
    image: '/assets/implantes1.jpg',
    seoKeywords: ['implantes dentales poblenou', 'dentista doctor trueta barcelona', 'implantes barcelona sant marti'],
    features: {
      es: [
        'Atención directa con odontóloga colegiada',
        'Opción de sedación consciente con anestesiólogo',
        '[Equipamiento diagnóstico confirmado por la clínica]',
        '[Opciones de pago o financiación a confirmar]',
      ],
      ca: [
        'Atenció directa amb odontòloga col·legiada',
        'Opció de sedació conscient amb anestesiòleg',
        '[Equipament diagnòstic confirmat per la clínica]',
        '[Opcions de pagament o finançament a confirmar]',
      ],
      en: [
        'Direct care with licensed dentist',
        'Conscious sedation option with anesthesiologist',
        '[Diagnostic equipment confirmed by the clinic]',
        '[Payment options to be confirmed]',
      ],
    },
  },
  {
    id: 'cirugia-oral',
    slug: 'cirugia-oral',
    slugs: SPECIALTY_SLUG_MAP['cirugia-oral'],
    schemaSpecialty: 'OralSurgery',
    title: {
      es: 'Cirugía Oral',
      ca: 'Cirurgia Oral',
      en: 'Oral Surgery',
    },
    subtitle: {
      es: 'Intervenciones quirúrgicas bucodentales planificadas con precisión clínica y seguimiento cercano en Poblenou.',
      ca: 'Intervencions quirúrgiques bucodentals planificades amb precisió clínica i seguiment proper al Poblenou.',
      en: 'Oral surgical procedures planned with attentive clinical follow-up at our Poblenou practice.',
    },
    badge: {
      es: 'Cirugía Bucal',
      ca: 'Cirurgia Bucal',
      en: 'Oral Surgery',
    },
    leadDoctor: {
      name: 'Dra. Ruby Alexandra Herrera Villamil',
      role: 'Odontóloga Colegiada · Col. 5929 COEC',
      colegiateNumber: 'Col. 5929 COEC',
      image: '/assets/equip4.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.ruby.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.ruby.hoursAvailable,
    },
    medicalTeamSchedule: [
      MEDICAL_TEAM_SCHEDULES.ruby,
      MEDICAL_TEAM_SCHEDULES.anestesiologo,
      MEDICAL_TEAM_SCHEDULES.silvia,
    ],
    shortDescription: {
      es: 'Extracciones dentales complejas, cordales y procedimientos quirúrgicos de tejidos orales en consulta.',
      ca: 'Extraccions dentals complexes, queixals del seny i procediments quirúrgics de teixits orals a consulta.',
      en: 'Tooth and wisdom tooth extractions and outpatient oral surgical care.',
    },
    fullDescription: {
      es: 'En el área de cirugía oral de Clínica Dental SET abordamos intervenciones quirúrgicas de la cavidad oral tras una valoración previa detallada. Para los pacientes que lo necesiten, podemos coordinar la intervención con nuestro médico anestesiólogo mediante sedación consciente. [Detalles sobre procedimientos quirúrgicos específicos y protocolos posoperatorios confirmados por la clínica.]',
      ca: 'A l’àrea de cirurgia oral de Clínica Dental SET abordem intervencions quirúrgiques de la cavitat oral després d’una valoració prèvia detallada. Podem coordinar la intervenció amb el nostre metge anestesiòleg mitjançant sedació conscient. [Detalls sobre procediments quirúrgics confirmats per la clínica.]',
      en: 'Our oral surgery area handles surgical procedures of the mouth following a careful clinical evaluation, with optional conscious sedation supervised by our in-house physician anesthesiologist. [Specific surgical protocols confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Extracción de muelas del juicio (cordales) incluidas o semierupcionadas',
        'Extracciones dentales que requieren abordaje quirúrgico',
        '[Otros procedimientos de cirugía oral menor confirmados por la clínica]',
      ],
      ca: [
        'Extracció de queixals del seny inclosos o semierupcionats',
        'Extraccions dentals que requereixen abordatge quirúrgic',
        '[Altres procediments de cirurgia oral menor confirmats per la clínica]',
      ],
      en: [
        'Impacted or partially erupted wisdom tooth extractions',
        'Complex tooth extractions requiring surgical care',
        '[Other minor oral surgery indications confirmed by the clinic]',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Extracción de cordales (muelas del juicio)',
          description: '[Valoración radiográfica y procedimiento quirúrgico confirmado por la doctora.]',
        },
        {
          name: 'Extracciones dentales quirúrgicas',
          description: '[Abordaje cuidadoso de raíces o piezas fracturadas y control posoperatorio.]',
        },
        {
          name: 'Coordinación quirúrgica con sedación consciente',
          description: 'Posibilidad de realizar la cirugía oral junto al médico anestesiólogo de la clínica.',
        },
      ],
      ca: [
        {
          name: 'Extracció de queixals del seny',
          description: '[Valoració radiogràfica i procediment quirúrgic confirmat per la doctora.]',
        },
        {
          name: 'Extraccions dentals quirúrgiques',
          description: '[Abordatge curós d’arrels o peces fracturades i control postoperatori.]',
        },
        {
          name: 'Coordinació quirúrgica amb sedació conscient',
          description: 'Possibilitat de realitzar la cirurgia oral amb el metge anestesiòleg de la clínica.',
        },
      ],
      en: [
        {
          name: 'Wisdom tooth surgery',
          description: '[Radiographic assessment and surgical extraction protocol confirmed by the doctor.]',
        },
        {
          name: 'Surgical tooth extractions',
          description: '[Careful management of fractured teeth or roots with post-operative follow-up.]',
        },
        {
          name: 'Surgical care under conscious sedation',
          description: 'Option to perform oral surgery together with our in-house physician anesthesiologist.',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Cómo es la recuperación tras una extracción dental quirúrgica?',
          answer: '[Indicaciones posoperatorias, pautas de reposo e higiene facilitadas por el equipo médico.]',
        },
        {
          question: '¿Puedo solicitar sedación consciente para una cirugía oral?',
          answer: 'Sí. Si sientes nerviosismo ante una extracción o intervención quirúrgica, nuestro médico anestesiólogo puede asistir la intervención en consulta.',
        },
      ],
      ca: [
        {
          question: 'Com és la recuperació després d’una extracció dental quirúrgica?',
          answer: '[Indicacions postoperatòries, pautes de repòs i higiene facilitades per l’equip mèdic.]',
        },
        {
          question: 'Puc sol·licitar sedació conscient per a una cirurgia oral?',
          answer: 'Sí. Si sents nerviosisme davant d’una intervenció quirúrgica, el nostre metge anestesiòleg pot assistir la intervenció a consulta.',
        },
      ],
      en: [
        {
          question: 'What is recovery like after oral surgery?',
          answer: '[Post-operative care instructions and follow-up schedule confirmed by our team.]',
        },
        {
          question: 'Can I request conscious sedation for oral surgery?',
          answer: 'Yes. If you feel anxious about a surgical extraction, our in-house physician anesthesiologist can supervise conscious sedation.',
        },
      ],
    },
    image: '/assets/clinica2.jpg',
    seoKeywords: ['cirugia oral poblenou', 'extraccion muelas del juicio barcelona', 'dentista cirugia doctor trueta'],
    features: {
      es: [
        'Estudio previo en consulta',
        'Disponible con médico anestesiólogo',
        'Seguimiento posoperatorio cercano',
      ],
      ca: [
        'Estudi previ a consulta',
        'Disponible amb metge anestesiòleg',
        'Seguiment postoperatori proper',
      ],
      en: [
        'Individualized pre-surgical assessment',
        'Available with physician anesthesiologist',
        'Attentive post-operative follow-up',
      ],
    },
  },
  {
    id: 'sedacion-consciente',
    slug: 'sedacion-consciente',
    slugs: SPECIALTY_SLUG_MAP['sedacion-consciente'],
    schemaSpecialty: 'Anesthesia',
    title: {
      es: 'Sedación Consciente',
      ca: 'Sedació Conscient',
      en: 'Conscious Sedation',
    },
    subtitle: {
      es: 'Tratamientos dentales sin miedo ni ansiedad gracias a la presencia de un médico anestesiólogo en nuestra clínica.',
      ca: 'Tractaments dentals sense por ni ansietat gràcies a la presència d’un metge anestesiòleg a la nostra clínica.',
      en: 'Calm, stress-free dental care supervised by our in-house physician anesthesiologist in Poblenou.',
    },
    badge: {
      es: 'Anestesiólogo en Clínica',
      ca: 'Anestesiòleg a Clínica',
      en: 'In-House Anesthesiologist',
    },
    leadDoctor: {
      name: 'Médico Anestesiólogo · Equipo Clínica Dental SET',
      role: 'Anestesiología en Clínica · Junto a Dra. Herrera (Col. 5929) y Dra. Luis (Col. 5664 COEC)',
      colegiateNumber: 'COEC · COMB',
      image: '/assets/clinica5.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.anestesiologo.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.anestesiologo.hoursAvailable,
    },
    medicalTeamSchedule: [
      MEDICAL_TEAM_SCHEDULES.anestesiologo,
      MEDICAL_TEAM_SCHEDULES.ruby,
      MEDICAL_TEAM_SCHEDULES.izbette,
    ],
    shortDescription: {
      es: 'Servicio diferencial con médico anestesiólogo en consulta para realizar tratamientos dentales en estado de calma y bienestar.',
      ca: 'Servei diferencial amb metge anestesiòleg a consulta per fer tractaments dentals en estat de calma i benestar.',
      en: 'Distinctive in-house physician anesthesiologist service for calm, anxiety-free dental treatments.',
    },
    fullDescription: {
      es: 'Sabemos que algunas personas sienten miedo o ansiedad al acudir al dentista, o necesitan realizar tratamientos largos en una sola sesión. En Clínica Dental SET contamos con un médico anestesiólogo que se desplaza a nuestra clínica de Poblenou para administrar y monitorizar la sedación consciente durante toda la visita. [Detalles clínicos específicos sobre valoración preanestésica y protocolos médicos facilitados por el anestesiólogo.]',
      ca: 'Sabem que algunes persones senten por o ansietat en anar al dentista, o necessiten fer tractaments llargs en una sola sessió. A Clínica Dental SET comptem amb un metge anestesiòleg que atén a la nostra clínica del Poblenou per administrar i monitorar la sedació conscient. [Detalls clínics específics facilitats pel metge anestesiòleg.]',
      en: 'We understand that many patients experience dental anxiety or prefer completing longer procedures comfortably in fewer visits. Clínica Dental SET counts on a physician anesthesiologist in our Poblenou practice to administer and monitor conscious sedation throughout your visit. [Specific pre-anesthetic protocols confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Pacientes con miedo al dentista, ansiedad o fobia dental',
        'Intervenciones de implantología o cirugía oral',
        'Pacientes que prefieren agrupar varios tratamientos con mayor comodidad',
        '[Otras indicaciones médicas valoradas por el médico anestesiólogo]',
      ],
      ca: [
        'Pacients amb por al dentista, ansietat o fòbia dental',
        'Intervencions d’implantologia o cirurgia oral',
        'Pacients que prefereixen agrupar diversos tractaments amb més comoditat',
        '[Altres indicacions mèdiques valorades pel metge anestesiòleg]',
      ],
      en: [
        'Patients with dental anxiety, fear, or strong gag reflex',
        'Dental implant or oral surgery procedures',
        'Patients wishing to combine multiple dental treatments comfortably',
        '[Additional medical indications assessed by the anesthesiologist]',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Sedación consciente supervisada por médico anestesiólogo',
          description: 'El paciente permanece en un estado de relajación profunda mientras el médico anestesiólogo controla sus constantes vitales en todo momento.',
        },
        {
          name: 'Valoración médica preanestésica',
          description: '[Revisión previa del historial médico y pautas indicadas antes de la sesión de sedación.]',
        },
        {
          name: 'Aplicable a cualquier tratamiento odontológico',
          description: 'Disponible para implantes dentales, cirugía oral, endodoncias, extracciones u odontología conservadora.',
        },
      ],
      ca: [
        {
          name: 'Sedació conscient supervisada per metge anestesiòleg',
          description: 'El pacient roman en un estat de relaxació profunda mentre el metge anestesiòleg controla les constants vitals en tot moment.',
        },
        {
          name: 'Valoració mèdica preanestèsica',
          description: '[Revisió prèvia de l’historial mèdic i pautes indicades abans de la sessió de sedació.]',
        },
        {
          name: 'Aplicable a qualsevol tractament odontològic',
          description: 'Disponible per a implants dentals, cirurgia oral, endodòncies, extraccions o odontologia conservadora.',
        },
      ],
      en: [
        {
          name: 'Physician-supervised conscious sedation',
          description: 'You remain deeply relaxed while our specialist anesthesiologist continuously monitors your vital signs.',
        },
        {
          name: 'Pre-anesthetic medical evaluation',
          description: '[Review of medical history and preparation guidelines prior to your sedation appointment.]',
        },
        {
          name: 'Available across all dental procedures',
          description: 'Can be combined with dental implants, oral surgery, root canals, extractions, or restorative care.',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Quién realiza la sedación consciente en Clínica Dental SET?',
          answer: 'La sedación consciente es realizada y supervisada de principio a fin por un médico especialista en anestesiología en nuestra propia clínica.',
        },
        {
          question: '¿Qué preparación se necesita antes de acudir con sedación consciente?',
          answer: '[Indicaciones previas confirmadas por el médico anestesiólogo y el equipo de la clínica tras la primera visita.]',
        },
      ],
      ca: [
        {
          question: 'Qui realitza la sedació conscient a Clínica Dental SET?',
          answer: 'La sedació conscient és realitzada i supervisada de principi a fi per un metge especialista en anestesiologia a la nostra clínica.',
        },
        {
          question: 'Quina preparació cal abans d’acudir amb sedació conscient?',
          answer: '[Indicacions prèvies confirmades pel metge anestesiòleg i l’equip de la clínica després de la primera visita.]',
        },
      ],
      en: [
        {
          question: 'Who administers conscious sedation at Clínica Dental SET?',
          answer: 'Conscious sedation is administered and continuously monitored by a licensed physician anesthesiologist right inside our practice.',
        },
        {
          question: 'How should I prepare for a conscious sedation visit?',
          answer: '[Pre-appointment instructions provided by our anesthesiologist and dental team during your initial visit.]',
        },
      ],
    },
    image: '/assets/clinica5.jpg',
    seoKeywords: ['sedacion dental barcelona', 'sedacion consciente poblenou', 'dentista con anestesiologo barcelona', 'miedo al dentista barcelona'],
    features: {
      es: [
        'Médico especialista en anestesiología en consulta',
        'Monitorización médica continua durante el tratamiento',
        'Ideal para pacientes con fobia dental o tratamientos complejos',
      ],
      ca: [
        'Metge especialista en anestesiologia a consulta',
        'Monitoratge mèdic continu durant el tractament',
        'Ideal per a pacients amb fòbia dental o tractaments complexos',
      ],
      en: [
        'Physician anesthesiologist present in clinic',
        'Continuous medical vital-sign monitoring',
        'Ideal for dental phobia or complex treatments',
      ],
    },
  },
  {
    id: 'odontopediatria',
    slug: 'odontopediatria',
    slugs: SPECIALTY_SLUG_MAP.odontopediatria,
    schemaSpecialty: 'Pediatric',
    title: {
      es: 'Odontopediatría',
      ca: 'Odontopediatria',
      en: 'Pediatric Dentistry',
    },
    subtitle: {
      es: 'Cuidado bucodental infantil y juvenil con trato cercano para acompañar el crecimiento de su sonrisa.',
      ca: 'Cura bucodental infantil i juvenil amb tracte proper per acompanyar el creixement del seu somriure.',
      en: 'Gentle, attentive dental care for children and teens in Poblenou, Barcelona.',
    },
    badge: {
      es: 'Dentista Infantil',
      ca: 'Dentista Infantil',
      en: 'Kids & Teens',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Odontóloga Colegiada · Col. 5664 COEC',
      colegiateNumber: 'Col. 5664 COEC',
      image: '/assets/equip1.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.izbette.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.izbette.hoursAvailable,
    },
    medicalTeamSchedule: [MEDICAL_TEAM_SCHEDULES.izbette, MEDICAL_TEAM_SCHEDULES.silvia],
    shortDescription: {
      es: 'Revisiones infantiles, prevención de caries y seguimiento del recambio dental en un entorno tranquilo.',
      ca: 'Revisions infantils, prevenció de càries i seguiment del recanvi dental en un entorn tranquil.',
      en: 'Children’s dental checkups, cavity prevention, and tooth development monitoring in a calm setting.',
    },
    fullDescription: {
      es: 'Acudir al dentista desde pequeños ayuda a crear hábitos saludables y a evitar el miedo en futuras visitas. En Clínica Dental SET atendemos a niños y adolescentes en Poblenou con paciencia y cercanía. [Detalles sobre edad recomendada de primera visita, selladores y protocolos infantiles confirmados por la clínica.]',
      ca: 'Anar al dentista des de petits ajuda a crear hàbits saludables i a evitar la por en visites futures. A Clínica Dental SET atenem nens i adolescents al Poblenou amb paciència i proximitat. [Detalls sobre protocols infantils confirmats per la clínica.]',
      en: 'Early dental visits help children build lifelong healthy habits without fear. At Clínica Dental SET we welcome children and teens in Poblenou with calm, patient-centered care. [Specific pediatric dentistry protocols confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Revisiones periódicas de dientes de leche y dentición definitiva',
        'Prevención y tratamiento de caries en edades infantiles',
        'Seguimiento temprano de la mordida y el recambio dental',
      ],
      ca: [
        'Revisions periòdiques de dents de llet i dentició definitiva',
        'Prevenció i tractament de càries en edats infantils',
        'Seguiment primerenc de la mossegada i el recanvi dental',
      ],
      en: [
        'Regular checkups for baby teeth and permanent teeth',
        'Pediatric cavity prevention and gentle restoration',
        'Early monitoring of bite development and tooth eruption',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Revisión dental infantil y prevención',
          description: '[Exploración adaptada a cada edad, enseñanza de cepillado y pautas preventivas.]',
        },
        {
          name: 'Tratamiento de caries en dientes temporales y definitivos',
          description: '[Procedimientos conservadores adaptados al paciente infantil.]',
        },
        {
          name: 'Control del desarrollo mandibular y erupción dental',
          description: '[Detección temprana de alteraciones para valorar la necesidad de ortodoncia.]',
        },
      ],
      ca: [
        {
          name: 'Revisió dental infantil i prevenció',
          description: '[Exploració adaptada a cada edat, ensenyament de raspallat i pautes preventives.]',
        },
        {
          name: 'Tractament de càries en dents temporals i definitives',
          description: '[Procediments conservadors adaptats al pacient infantil.]',
        },
        {
          name: 'Control del desenvolupament mandibular i erupció dental',
          description: '[Detecció primerenca d’alteracions per valorar la necessitat d’ortodòncia.]',
        },
      ],
      en: [
        {
          name: 'Pediatric checkups & preventive care',
          description: '[Age-appropriate exams, brushing guidance, and preventive care.]',
        },
        {
          name: 'Cavity care for primary and permanent teeth',
          description: '[Gentle restorative care tailored to young patients.]',
        },
        {
          name: 'Jaw growth & eruption monitoring',
          description: '[Early assessment to identify any need for future orthodontic care.]',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Cómo ayudáis a que los niños vengan tranquilos al dentista?',
          answer: 'Dedicamos el tiempo necesario a explicar cada paso con un lenguaje cercano y sin prisas, siempre acompañados por nuestras odontólogas.',
        },
        {
          question: '¿Cada cuánto deben acudir los niños a revisión?',
          answer: '[Frecuencia recomendada de revisiones infantiles confirmada por la doctora.]',
        },
      ],
      ca: [
        {
          question: 'Com ajudeu que els nens vinguin tranquils al dentista?',
          answer: 'Dediquem el temps necessari a explicar cada pas amb un llenguatge proper i sense presses.',
        },
        {
          question: 'Cada quant han d’acudir els nens a revisió?',
          answer: '[Freqüència recomanada de revisions infantils confirmada per la doctora.]',
        },
      ],
      en: [
        {
          question: 'How do you help children feel comfortable at the dentist?',
          answer: 'We take the time to explain every step in friendly, calm language so children build positive trust.',
        },
        {
          question: 'How often should children have dental checkups?',
          answer: '[Recommended pediatric checkup schedule confirmed by our doctors.]',
        },
      ],
    },
    image: '/assets/dents1.jpg',
    seoKeywords: ['odontopediatria poblenou', 'dentista infantil barcelona doctor trueta', 'dentista ninos sant marti'],
    features: {
      es: [
        'Trato cercano y paciente para niños y familias',
        'Prevención y seguimiento del crecimiento dental',
        'Continuidad asistencial en toda la etapa infantil y juvenil',
      ],
      ca: [
        'Tracte proper i pacient per a nens i famílies',
        'Prevenció i seguiment del creixement dental',
        'Continuïtat assistencial durant tota l’etapa infantil i juvenil',
      ],
      en: [
        'Warm, patient approach for children and parents',
        'Preventive care & dental growth monitoring',
        'Continuity of care through childhood and teens',
      ],
    },
  },
  {
    id: 'medicina-oral',
    slug: 'medicina-oral',
    slugs: SPECIALTY_SLUG_MAP['medicina-oral'],
    schemaSpecialty: 'Dentistry',
    title: {
      es: 'Medicina Oral',
      ca: 'Medicina Oral',
      en: 'Oral Medicine',
    },
    subtitle: {
      es: 'Diagnóstico y seguimiento clínico de alteraciones de la mucosa oral, lengua, encías y glándulas salivales.',
      ca: 'Diagnòstic i seguiment clínic d’alteracions de la mucosa oral, llengua, genives i glàndules salivals.',
      en: 'Clinical diagnosis and care of conditions affecting the oral mucosa, tongue, gums, and salivary glands.',
    },
    badge: {
      es: 'Medicina Bucal',
      ca: 'Medicina Bucal',
      en: 'Oral Medicine',
    },
    leadDoctor: {
      name: 'Dra. Ruby Alexandra Herrera Villamil',
      role: 'Odontóloga Colegiada · Col. 5929 COEC',
      colegiateNumber: 'Col. 5929 COEC',
      image: '/assets/equip4.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.ruby.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.ruby.hoursAvailable,
    },
    medicalTeamSchedule: [MEDICAL_TEAM_SCHEDULES.ruby, MEDICAL_TEAM_SCHEDULES.izbette],
    shortDescription: {
      es: 'Exploración y diagnóstico de lesiones orales, aftas recurrentes, infecciones o molestias en los tejidos blandos de la boca.',
      ca: 'Exploració i diagnòstic de lesions orals, aftes recurrents, infeccions o molèsties als teixits tous de la boca.',
      en: 'Evaluation and diagnosis of oral mucosal lesions, recurrent mouth ulcers, infections, or soft-tissue discomfort.',
    },
    fullDescription: {
      es: 'La medicina oral se ocupa del diagnóstico y tratamiento médico de las patologías que afectan a los tejidos blandos de la cavidad oral, más allá de los dientes. En Clínica Dental SET realizamos exploraciones clínicas cuidadosas para estudiar cualquier lesión o molestia persistente. [Detalles sobre protocolos diagnósticos y pruebas complementarias confirmados por la clínica.]',
      ca: 'La medicina oral s’ocupa del diagnòstic i tractament mèdic de les patologies que afecten els teixits tous de la cavitat oral, més enllà de les dents. A Clínica Dental SET realitzem exploracions clíniques curoses per estudiar qualsevol lesió persistent. [Detalls sobre protocols diagnòstics confirmats per la clínica.]',
      en: 'Oral medicine focuses on diagnosing and medically managing conditions affecting the soft tissues of the mouth. At Clínica Dental SET we perform careful clinical examinations to evaluate persistent oral lesions or discomfort. [Diagnostic protocols confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Llagas, aftas o heridas en la boca que tardan en cicatrizar',
        'Cambios de coloración, manchas blancas o rojas en mucosa o lengua',
        'Sequedad bucal persistente o infecciones orales',
      ],
      ca: [
        'Nafres, aftes o ferides a la boca que triguen a cicatritzar',
        'Canvis de coloració, taques blanques o vermelles a mucosa o llengua',
        'Sequedat bucal persistent o infeccions orals',
      ],
      en: [
        'Oral ulcers or sores that take more than two weeks to heal',
        'White or red patches or texture changes on gums, cheeks, or tongue',
        'Persistent dry mouth or recurrent oral infections',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Exploración clínica y diagnóstico de lesiones orales',
          description: '[Valoración detallada de mucosa, paladar, lengua y labios en consulta.]',
        },
        {
          name: 'Tratamiento médico y seguimiento de patología oral',
          description: '[Pautas terapéuticas y controles periódicos adaptados a cada diagnóstico.]',
        },
      ],
      ca: [
        {
          name: 'Exploració clínica i diagnòstic de lesions orals',
          description: '[Valoració detallada de mucosa, paladar, llengua i llavis a consulta.]',
        },
        {
          name: 'Tractament mèdic i seguiment de patologia oral',
          description: '[Pautes terapèutiques i controls periòdics adaptats a cada diagnòstic.]',
        },
      ],
      en: [
        {
          name: 'Clinical oral mucosa screening & diagnosis',
          description: '[Detailed examination of oral mucosa, palate, tongue, and lips.]',
        },
        {
          name: 'Medical management & follow-up',
          description: '[Tailored medical care plans and periodic clinical monitoring.]',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Cuándo conviene consultar por una llaga o mancha en la boca?',
          answer: 'Ante cualquier herida, úlcera o cambio en el aspecto de la mucosa oral que permanezca más de 15 días sin desaparecer, es recomendable acudir a revisión odontológica.',
        },
        {
          question: '¿Qué incluye una visita de medicina oral?',
          answer: '[Descripción de la historia clínica, exploración física y pruebas complementarias si fueran necesarias.]',
        },
      ],
      ca: [
        {
          question: 'Quan convé consultar per una nafra o taca a la boca?',
          answer: 'Davant qualsevol ferida, úlcera o canvi a la mucosa oral que romangui més de 15 dies sense desaparèixer, és recomanable acudir a revisió.',
        },
        {
          question: 'Què inclou una visita de medicina oral?',
          answer: '[Descripció de la història clínica, exploració física i proves complementàries si fossin necessàries.]',
        },
      ],
      en: [
        {
          question: 'When should I have a mouth sore or patch checked?',
          answer: 'If any mouth ulcer, lump, or color change lasts longer than two weeks, scheduling an oral evaluation is strongly recommended.',
        },
        {
          question: 'What does an oral medicine consultation involve?',
          answer: '[Medical history review, physical oral exam, and any diagnostic follow-up confirmed by the clinic.]',
        },
      ],
    },
    image: '/assets/clinica7.jpg',
    seoKeywords: ['medicina oral poblenou', 'diagnostico lesiones bucales barcelona', 'dentista medicina oral doctor trueta'],
    features: {
      es: [
        'Exploración clínica minuciosa de tejidos blandos',
        'Detección precoz y seguimiento personalizado',
        'Atención directa con odontóloga colegiada',
      ],
      ca: [
        'Exploració clínica minuciosa de teixits tous',
        'Detecció precoç i seguiment personalitzat',
        'Atenció directa amb odontòloga col·legiada',
      ],
      en: [
        'Thorough oral soft-tissue examination',
        'Early detection and personalized monitoring',
        'Direct care with a licensed dentist',
      ],
    },
  },
  {
    id: 'ortodoncia',
    slug: 'ortodoncia',
    slugs: SPECIALTY_SLUG_MAP.ortodoncia,
    schemaSpecialty: 'Orthodontics',
    title: {
      es: 'Ortodoncia',
      ca: 'Ortodòncia',
      en: 'Orthodontics',
    },
    subtitle: {
      es: 'Corrección de la alineación dental y la mordida para mejorar la función y estética bucodental.',
      ca: 'Correcció de l’alineació dental i la mossegada per millorar la funció i estètica bucodental.',
      en: 'Alignment of teeth and bite correction for healthier oral function and smile harmony.',
    },
    badge: {
      es: 'Ortodoncia',
      ca: 'Ortodòncia',
      en: 'Orthodontics',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Odontóloga Colegiada · Col. 5664 COEC',
      colegiateNumber: 'Col. 5664 COEC',
      image: '/assets/equip1.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.izbette.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.izbette.hoursAvailable,
    },
    medicalTeamSchedule: [MEDICAL_TEAM_SCHEDULES.izbette, MEDICAL_TEAM_SCHEDULES.silvia],
    shortDescription: {
      es: 'Estudio y tratamiento de malposiciones dentales y alteraciones de la mordida.',
      ca: 'Estudi i tractament de malposicions dentals i alteracions de la mossegada.',
      en: 'Evaluation and correction of tooth alignment and bite irregularities.',
    },
    fullDescription: {
      es: 'Un correcto alineamiento dental facilita la higiene diaria y contribuye al equilibrio de la masticación. En Clínica Dental SET valoramos cada caso de forma individual. [Detalles sobre tipos de ortodoncia, sistemas de alineadores o brackets y toma de registros confirmados por la clínica.]',
      ca: 'Un bon alineament dental facilita la higiene diària i contribueix a l’equilibri de la masticació. A Clínica Dental SET valorem cada cas de forma individual. [Detalls sobre tipus d’ortodòncia i presa de registres confirmats per la clínica.]',
      en: 'Proper dental alignment supports daily hygiene and balanced chewing function. At Clínica Dental SET we assess every patient individually. [Details on available orthodontic systems and diagnostic records confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Apiñamiento dental o falta de espacio',
        'Separación entre piezas dentales',
        'Alteraciones en la mordida',
        '[Otras indicaciones ortodónticas confirmadas por la clínica]',
      ],
      ca: [
        'Apinyament dental o manca d’espai',
        'Separació entre peces dentals',
        'Alteracions en la mossegada',
        '[Altres indicacions ortodòntiques confirmades per la clínica]',
      ],
      en: [
        'Tooth crowding or spacing issues',
        'Bite alignment discrepancies',
        '[Other orthodontic indications confirmed by the clinic]',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Ortodoncia con alineadores transparentes',
          description: '[Sistema y características de los alineadores disponibles confirmados por la clínica.]',
        },
        {
          name: 'Ortodoncia con brackets',
          description: '[Tipos de brackets empleados y seguimiento en consulta.]',
        },
        {
          name: 'Retención post-ortodoncia',
          description: '[Protocolo de mantenimiento y retenedores tras finalizar el tratamiento.]',
        },
      ],
      ca: [
        {
          name: 'Ortodòncia amb alineadors transparents',
          description: '[Sistema i característiques dels alineadors disponibles confirmats per la clínica.]',
        },
        {
          name: 'Ortodòncia amb brackets',
          description: '[Tipus de brackets empleats i seguiment a consulta.]',
        },
        {
          name: 'Retenció post-ortodòncia',
          description: '[Protocol de manteniment i retenidors en finalitzar el tractament.]',
        },
      ],
      en: [
        {
          name: 'Clear aligner orthodontics',
          description: '[Details on clear aligner systems offered at the clinic.]',
        },
        {
          name: 'Fixed bracket orthodontics',
          description: '[Bracket options and follow-up visits confirmed by the clinic.]',
        },
        {
          name: 'Post-treatment retention',
          description: '[Retainer options and long-term maintenance protocol.]',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Qué opciones de ortodoncia ofrecéis en la clínica?',
          answer: '[Información sobre sistemas disponibles para niños y adultos facilitada por la clínica.]',
        },
        {
          question: '¿Con qué frecuencia se realizan las revisiones?',
          answer: '[Periodicidad habitual de las visitas de control confirmada por la doctora.]',
        },
      ],
      ca: [
        {
          question: 'Quines opcions d’ortodòncia oferiu a la clínica?',
          answer: '[Informació sobre sistemes disponibles per a nens i adults facilitada per la clínica.]',
        },
        {
          question: 'Amb quina freqüència es fan les revisions?',
          answer: '[Periodicitat habitual de les visites de control confirmada per la doctora.]',
        },
      ],
      en: [
        {
          question: 'Which orthodontic options do you offer?',
          answer: '[Information on systems available for children and adults confirmed by the clinic.]',
        },
        {
          question: 'How often are checkup appointments scheduled?',
          answer: '[Standard checkup frequency confirmed by the doctor.]',
        },
      ],
    },
    image: '/assets/ortodoncia1.png',
    seoKeywords: ['ortodoncia poblenou barcelona', 'dentista ortodoncia doctor trueta', 'alineadores barcelona'],
    features: {
      es: [
        'Estudio individualizado de la mordida',
        'Seguimiento continuo por la misma doctora',
        '[Sistemas ortodónticos confirmados por la clínica]',
        '[Facilidades de pago a confirmar]',
      ],
      ca: [
        'Estudi individualitzat de la mossegada',
        'Seguiment continu per la mateixa doctora',
        '[Sistemes ortodòntics confirmats per la clínica]',
        '[Facilitats de pagament a confirmar]',
      ],
      en: [
        'Individualized bite evaluation',
        'Continuous follow-up with the same doctor',
        '[Orthodontic systems confirmed by the clinic]',
        '[Payment options to be confirmed]',
      ],
    },
  },
  {
    id: 'estetica-dental',
    slug: 'estetica-dental',
    slugs: SPECIALTY_SLUG_MAP['estetica-dental'],
    schemaSpecialty: 'Prosthodontics',
    title: {
      es: 'Estética Dental y Blanqueamiento',
      ca: 'Estètica Dental i Blanquejament',
      en: 'Cosmetic Dentistry & Whitening',
    },
    subtitle: {
      es: 'Tratamientos orientados a mejorar la armonía, el color y la forma natural de tus dientes.',
      ca: 'Tractaments orientats a millorar l’harmonia, el color i la forma natural de les teves dents.',
      en: 'Treatments designed to enhance the natural harmony, shade, and contour of your teeth.',
    },
    badge: {
      es: 'Estética Dental',
      ca: 'Estètica Dental',
      en: 'Aesthetics',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Odontóloga Colegiada · Col. 5664 COEC',
      colegiateNumber: 'Col. 5664 COEC',
      image: '/assets/equip1.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.izbette.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.izbette.hoursAvailable,
    },
    medicalTeamSchedule: [MEDICAL_TEAM_SCHEDULES.izbette, MEDICAL_TEAM_SCHEDULES.silvia],
    shortDescription: {
      es: 'Carillas dentales, reconstrucciones estéticas y blanqueamiento dental bajo supervisión odontológica.',
      ca: 'Carilles dentals, reconstruccions estètiques i blanquejament dental sota supervisió odontològica.',
      en: 'Dental veneers, aesthetic bonding, and tooth whitening under clinical supervision.',
    },
    fullDescription: {
      es: 'En Clínica Dental SET abordamos la estética dental priorizando la salud del esmalte y la naturalidad de cada sonrisa. [Información específica sobre técnicas de blanqueamiento, tipos de carillas y materiales estéticos empleados en la clínica.]',
      ca: 'A Clínica Dental SET abordem l’estètica dental prioritzant la salut de l’esmalt i la naturalitat de cada somriure. [Informació específica sobre tècniques de blanquejament i tipus de carilles emprades a la clínica.]',
      en: 'At Clínica Dental SET we approach aesthetic dentistry by prioritizing enamel preservation and natural results. [Specific whitening protocols and veneer materials confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Alteraciones en el tono o coloración dental',
        'Pequeñas fracturas, desgastes o irregularidades de forma',
        'Cierre estético de espacios interdentales',
      ],
      ca: [
        'Alteracions en el to o coloració dental',
        'Petites fractures, desgastos o irregularitats de forma',
        'Tancament estètic d’espais interdentals',
      ],
      en: [
        'Tooth discoloration or uneven shading',
        'Minor chips, wear, or contour irregularities',
        'Aesthetic closure of small gaps',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Blanqueamiento dental clínico',
          description: '[Protocolo y detalles del tratamiento blanqueador confirmado por la clínica.]',
        },
        {
          name: 'Carillas y reconstrucciones estéticas',
          description: '[Materiales y procedimiento de carillas o composite disponibles en consulta.]',
        },
      ],
      ca: [
        {
          name: 'Blanquejament dental clínic',
          description: '[Protocol i detalls del tractament blanquejador confirmat per la clínica.]',
        },
        {
          name: 'Carilles i reconstruccions estètiques',
          description: '[Materials i procediment de carilles o compòsit disponibles a consulta.]',
        },
      ],
      en: [
        {
          name: 'Clinical teeth whitening',
          description: '[Whitening protocol and details confirmed by the clinic.]',
        },
        {
          name: 'Dental veneers & aesthetic bonding',
          description: '[Ceramic or composite materials available at the clinic.]',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Es necesario revisar la boca antes de realizar un blanqueamiento?',
          answer: 'Sí, siempre se realiza una valoración previa para comprobar que las encías y los dientes están sanos antes de aplicar cualquier tratamiento estético.',
        },
        {
          question: '¿Qué cuidados se recomiendan después del tratamiento?',
          answer: '[Recomendaciones específicas de higiene y mantenimiento facilitadas por la doctora.]',
        },
      ],
      ca: [
        {
          question: 'Cal revisar la boca abans de fer un blanquejament?',
          answer: 'Sí, sempre es fa una valoració prèvia per comprovar que les genives i les dents estan sanes abans d’aplicar cap tractament estètic.',
        },
        {
          question: 'Quines cures es recomanen després del tractament?',
          answer: '[Recomanacions específiques d’higiene i manteniment facilitades per la doctora.]',
        },
      ],
      en: [
        {
          question: 'Is an exam required before teeth whitening?',
          answer: 'Yes, we always perform a prior clinical evaluation to ensure teeth and gums are healthy.',
        },
        {
          question: 'What aftercare is recommended?',
          answer: '[Post-treatment care guidelines confirmed by our clinical team.]',
        },
      ],
    },
    image: '/assets/foto1.jpg',
    seoKeywords: ['estetica dental poblenou', 'blanqueamiento dental barcelona doctor trueta', 'carillas poblenou'],
    features: {
      es: [
        'Enfoque conservador del esmalte',
        'Valoración estética personalizada',
        '[Materiales y sistemas confirmados por la clínica]',
      ],
      ca: [
        'Enfocament conservador de l’esmalt',
        'Valoració estètica personalitzada',
        '[Materials i sistemes confirmats per la clínica]',
      ],
      en: [
        'Conservative enamel-preserving approach',
        'Personalized aesthetic evaluation',
        '[Materials and systems confirmed by the clinic]',
      ],
    },
  },
  {
    id: 'periodoncia',
    slug: 'periodoncia',
    slugs: SPECIALTY_SLUG_MAP.periodoncia,
    schemaSpecialty: 'Periodontics',
    title: {
      es: 'Periodoncia y Salud de Encías',
      ca: 'Periodòncia i Salut de les Genives',
      en: 'Periodontics & Gum Health',
    },
    subtitle: {
      es: 'Prevención, diagnóstico y tratamiento de las enfermedades de las encías y el tejido de soporte dental.',
      ca: 'Prevenció, diagnòstic i tractament de les malalties de les genives i del teixit de suport dental.',
      en: 'Prevention, diagnosis, and care for gum disease and supporting periodontal tissues.',
    },
    badge: {
      es: 'Periodoncia',
      ca: 'Periodòncia',
      en: 'Periodontics',
    },
    leadDoctor: {
      name: 'Dra. Ruby Alexandra Herrera Villamil',
      role: 'Odontóloga Colegiada · Col. 5929 COEC',
      colegiateNumber: 'Col. 5929 COEC',
      image: '/assets/equip4.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.ruby.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.ruby.hoursAvailable,
    },
    medicalTeamSchedule: [MEDICAL_TEAM_SCHEDULES.ruby, MEDICAL_TEAM_SCHEDULES.silvia],
    shortDescription: {
      es: 'Cuidado integral de gingivitis y periodontitis para conservar la salud de tus encías y piezas dentales.',
      ca: 'Cura integral de gingivitis i periodontitis per conservar la salut de les genives i peces dentals.',
      en: 'Comprehensive management of gingivitis and periodontitis to preserve gum and bone health.',
    },
    fullDescription: {
      es: 'La salud de las encías es fundamental para mantener los dientes firmes a lo largo de la vida. En Clínica Dental SET diagnosticamos y tratamos la inflamación o sangrado gingival de forma personalizada. [Detalles sobre protocolos periodontales, raspados y fases de mantenimiento confirmados por la clínica.]',
      ca: 'La salut de les genives és fonamental per mantenir les dents fermes al llarg de la vida. A Clínica Dental SET diagnostiquem i tractem la inflamació o sagnat gingival de forma personalitzada. [Detalls sobre protocols periodontals confirmats per la clínica.]',
      en: 'Healthy gums are essential for keeping natural teeth stable. At Clínica Dental SET we diagnose and treat gum inflammation early. [Specific periodontal protocols confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Sangrado o inflamación de las encías durante el cepillado',
        'Retracción gingival o sensibilidad en los cuellos dentales',
        'Movilidad dental o mal aliento persistente',
      ],
      ca: [
        'Sagnat o inflamació de les genives durant el raspallat',
        'Retracció gingival o sensibilitat als colls dentals',
        'Mobilitat dental o mal alè persistent',
      ],
      en: [
        'Bleeding or swollen gums when brushing',
        'Gum recession or root sensitivity',
        'Tooth mobility or persistent halitosis',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Tratamiento periodontal básico (Raspado y alisado radicular)',
          description: '[Descripción del procedimiento periodontal realizado en consulta.]',
        },
        {
          name: 'Mantenimiento periodontal',
          description: '[Seguimiento periódico y control de higiene adaptado a cada paciente.]',
        },
      ],
      ca: [
        {
          name: 'Tractament periodontal bàsic (Raspat i allisat radicular)',
          description: '[Descripció del procediment periodontal realitzat a consulta.]',
        },
        {
          name: 'Manteniment periodontal',
          description: '[Seguiment periòdic i control d’higiene adaptat a cada pacient.]',
        },
      ],
      en: [
        {
          name: 'Scaling and root planing',
          description: '[Overview of non-surgical periodontal therapy performed at the clinic.]',
        },
        {
          name: 'Periodontal maintenance',
          description: '[Ongoing hygiene monitoring tailored to each patient.]',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Cuándo debo acudir a una revisión de encías?',
          answer: 'Ante cualquier signo de sangrado, enrojecimiento o retracción de encías es recomendable acudir a consulta para realizar una valoración.',
        },
        {
          question: '¿Cómo se controla la enfermedad periodontal a largo plazo?',
          answer: '[Pautas de seguimiento y mantenimiento periodontal confirmadas por la clínica.]',
        },
      ],
      ca: [
        {
          question: 'Quan he d’acudir a una revisió de genives?',
          answer: 'Davant qualsevol signe de sagnat, envermelliment o retracció de genives és recomanable acudir a consulta per fer una valoració.',
        },
        {
          question: 'Com es controla la malaltia periodontal a llarg termini?',
          answer: '[Pautes de seguiment i manteniment periodontal confirmades per la clínica.]',
        },
      ],
      en: [
        {
          question: 'When should I schedule a gum evaluation?',
          answer: 'Whenever you notice gum bleeding, redness, or recession, an early clinical evaluation helps protect bone support.',
        },
        {
          question: 'How is periodontal health maintained long-term?',
          answer: '[Maintenance visit schedule and home care instructions confirmed by the clinic.]',
        },
      ],
    },
    image: '/assets/periodoncia1.jpg',
    seoKeywords: ['periodoncia poblenou', 'dentista encias barcelona doctor trueta', 'tratamiento encias poblenou'],
    features: {
      es: [
        'Diagnóstico clínico del estado gingival',
        'Tratamiento adaptado a cada fase',
        'Seguimiento preventivo continuado',
      ],
      ca: [
        'Diagnòstic clínic de l’estat gingival',
        'Tractament adaptat a cada fase',
        'Seguiment preventiu continuat',
      ],
      en: [
        'Clinical periodontal assessment',
        'Stage-appropriate treatment plan',
        'Ongoing preventive care',
      ],
    },
  },
  {
    id: 'endodoncia',
    slug: 'endodoncia',
    slugs: SPECIALTY_SLUG_MAP.endodoncia,
    schemaSpecialty: 'Dentistry',
    title: {
      es: 'Endodoncia',
      ca: 'Endodòncia',
      en: 'Endodontics (Root Canal)',
    },
    subtitle: {
      es: 'Tratamiento de conductos destinado a aliviar el dolor dental y conservar tu pieza natural.',
      ca: 'Tractament de conductes destinat a alleujar el dolor dental i conservar la teva peça natural.',
      en: 'Root canal therapy focused on relieving tooth pain and preserving your natural tooth.',
    },
    badge: {
      es: 'Endodoncia',
      ca: 'Endodòncia',
      en: 'Endodontics',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Odontóloga Colegiada · Col. 5664 COEC',
      colegiateNumber: 'Col. 5664 COEC',
      image: '/assets/equip1.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.izbette.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.izbette.hoursAvailable,
    },
    medicalTeamSchedule: [MEDICAL_TEAM_SCHEDULES.izbette, MEDICAL_TEAM_SCHEDULES.silvia],
    shortDescription: {
      es: 'Limpieza y sellado de los conductos radiculares en dientes con caries profundas o afectación pulpar.',
      ca: 'Neteja i segellat dels conductes radiculars en dents amb càries profundes o afectació pulpar.',
      en: 'Cleaning and sealing of root canals for teeth affected by deep decay or pulp inflammation.',
    },
    fullDescription: {
      es: 'Cuando una caries profunda o un traumatismo afecta al tejido pulpar del diente, la endodoncia permite tratar el interior de la pieza para aliviar la molestia y evitar su extracción. [Detalles sobre técnicas endodónticas y reconstrucción posterior confirmados por la clínica.]',
      ca: 'Quan una càries profunda o un traumatisme afecta el teixit pulpar de la dent, l’endodòncia permet tractar l’interior de la peça per alleujar la molèstia i evitar-ne l’extracció. [Detalls sobre tècniques endodòntiques confirmats per la clínica.]',
      en: 'When deep decay or trauma reaches the dental pulp, root canal therapy treats the inside of the tooth to relieve pain and avoid extraction. [Specific endodontic methods confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Dolor dental intenso o sensibilidad prolongada al frío o al calor',
        'Caries profundas con afectación del nervio dental',
        'Inflamación o infección localizada en la encía junto a una pieza',
      ],
      ca: [
        'Dolor dental intens o sensibilitat prolongada al fred o a la calor',
        'Càries profundes amb afectació del nervi dental',
        'Inflamació o infecció localitzada a la geniva prop d’una peça',
      ],
      en: [
        'Intense toothache or lingering sensitivity to hot or cold',
        'Deep cavities affecting the dental nerve',
        'Localized gum tenderness or swelling near a tooth',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Endodoncia en piezas unirradiculares y multirradiculares',
          description: '[Descripción del tratamiento de conductos y protocolos clínicos confirmados.]',
        },
        {
          name: 'Reconstrucción tras endodoncia',
          description: '[Opciones de restauración mediante empaste, incrustación o corona.]',
        },
      ],
      ca: [
        {
          name: 'Endodòncia en peces unirradiculars i multirradiculars',
          description: '[Descripció del tractament de conductes i protocols clínics confirmats.]',
        },
        {
          name: 'Reconstrucció després d’endodòncia',
          description: '[Opcions de restauració mitjançant empastament, incrustació o corona.]',
        },
      ],
      en: [
        {
          name: 'Single and multi-canal root canal therapy',
          description: '[Clinical protocol details confirmed by the practice.]',
        },
        {
          name: 'Post-endodontic tooth restoration',
          description: '[Restorative options including fillings, onlays, or crowns.]',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Cuándo es necesaria una endodoncia?',
          answer: 'Se indica cuando la pulpa dental está inflamada o infectada de forma irreversible y es necesario limpiar y sellar los conductos para conservar el diente.',
        },
        {
          question: '¿Qué tipo de restauración se coloca después?',
          answer: '[Criterios clínicos de reconstrucción según el estado de cada pieza.]',
        },
      ],
      ca: [
        {
          question: 'Quan és necessària una endodòncia?',
          answer: 'S’indica quan la polpa dental està inflamada o infectada i cal netejar i segellar els conductes per conservar la dent.',
        },
        {
          question: 'Quin tipus de restauració es col·loca després?',
          answer: '[Criteris clínics de reconstrucció segons l’estat de cada peça.]',
        },
      ],
      en: [
        {
          question: 'When is a root canal needed?',
          answer: 'When the inner pulp is irreversibly inflamed or infected, cleaning and sealing the canals allows you to keep your natural tooth.',
        },
        {
          question: 'How is the tooth restored afterward?',
          answer: '[Restorative options based on tooth structure confirmed by our team.]',
        },
      ],
    },
    image: '/assets/endodoncia1.jpg',
    seoKeywords: ['endodoncia poblenou barcelona', 'dentista dolor muelas doctor trueta', 'endodoncia sant marti'],
    features: {
      es: [
        'Enfoque orientado a conservar el diente natural',
        'Control clínico mediante anestesia local',
        '[Instrumental y protocolos confirmados por la clínica]',
      ],
      ca: [
        'Enfocament orientat a conservar la dent natural',
        'Control clínic mitjançant anestèsia local',
        '[Instrumental i protocols confirmats per la clínica]',
      ],
      en: [
        'Focused on preserving natural dentition',
        'Performed under local anesthesia',
        '[Instruments and protocols confirmed by the clinic]',
      ],
    },
  },
  {
    id: 'odontologia-general',
    slug: 'odontologia-general',
    slugs: SPECIALTY_SLUG_MAP['odontologia-general'],
    schemaSpecialty: 'Dentistry',
    title: {
      es: 'Odontología General y Prevención',
      ca: 'Odontologia General i Prevenció',
      en: 'General & Preventive Dentistry',
    },
    subtitle: {
      es: 'Revisiones periódicas, higienes dentales y odontología conservadora para el cuidado diario de tu boca.',
      ca: 'Revisions periòdiques, higienes dentals i odontologia conservadora per a la cura diària de la teva boca.',
      en: 'Routine checkups, dental cleanings, and conservative care for everyday oral wellness.',
    },
    badge: {
      es: 'Prevención',
      ca: 'Prevenció',
      en: 'Preventive Care',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Odontóloga Colegiada · Col. 5664 COEC',
      colegiateNumber: 'Col. 5664 COEC',
      image: '/assets/equip1.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.izbette.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.izbette.hoursAvailable,
    },
    medicalTeamSchedule: [
      MEDICAL_TEAM_SCHEDULES.izbette,
      MEDICAL_TEAM_SCHEDULES.ruby,
      MEDICAL_TEAM_SCHEDULES.silvia,
    ],
    shortDescription: {
      es: 'Revisiones bucodentales, limpiezas profesionales y obturaciones estéticas para prevenir patologías.',
      ca: 'Revisions bucodentals, neteges professionals i obturacions estètiques per prevenir patologies.',
      en: 'Oral checkups, professional cleanings, and tooth-colored fillings to prevent dental disease.',
    },
    fullDescription: {
      es: 'Las revisiones periódicas permiten detectar a tiempo cualquier alteración en dientes o encías y resolverla de forma sencilla y conservadora. [Detalles sobre servicios de odontología general y protocolos preventivos confirmados por la clínica.]',
      ca: 'Les revisions periòdiques permeten detectar a temps qualsevol alteració en dents o genives i resoldre-la de manera senzilla i conservadora. [Detalls sobre serveis preventius confirmats per la clínica.]',
      en: 'Regular checkups allow early detection and simple conservative care for teeth and gums. [Preventive and family dentistry details confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Revisión bucodental periódica',
        'Higiene dental y eliminación de sarro',
        'Tratamiento de caries mediante obturaciones estéticas',
      ],
      ca: [
        'Revisió bucodental periòdica',
        'Higiene dental i eliminació de tosca',
        'Tractament de càries mitjançant obturacions estètiques',
      ],
      en: [
        'Routine preventive dental checkups',
        'Professional tartar and plaque removal',
        'Cavity treatment with tooth-colored fillings',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Revisión y diagnóstico bucodental',
          description: '[Protocolo de exploración clínica y radiográfica en consulta.]',
        },
        {
          name: 'Higiene y profilaxis dental',
          description: '[Descripción del procedimiento de limpieza bucodental en la clínica.]',
        },
        {
          name: 'Obturaciones (empastes) de composite',
          description: '[Restauración estética de piezas afectadas por caries.]',
        },
      ],
      ca: [
        {
          name: 'Revisió i diagnòstic bucodental',
          description: '[Protocol d’exploració clínica i radiogràfica a consulta.]',
        },
        {
          name: 'Higiene i profilaxi dental',
          description: '[Descripció del procediment de neteja bucodental a la clínica.]',
        },
        {
          name: 'Obturacions (empastaments) de compòsit',
          description: '[Restauració estètica de peces afectades per càries.]',
        },
      ],
      en: [
        {
          name: 'Comprehensive dental checkup',
          description: '[Clinical and radiographic exam protocol at the clinic.]',
        },
        {
          name: 'Professional dental cleaning',
          description: '[Dental hygiene procedure details confirmed by the clinic.]',
        },
        {
          name: 'Composite tooth fillings',
          description: '[Tooth-colored restorations for decayed teeth.]',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Cada cuánto tiempo se recomienda hacer una revisión dental?',
          answer: '[Frecuencia recomendada de revisiones e higienes según las necesidades de cada paciente.]',
        },
        {
          question: '¿Atendéis a pacientes de todas las edades?',
          answer: 'Sí, atendemos tanto a adultos como a niños (odontopediatría) con trato cercano y continuado en Poblenou.',
        },
      ],
      ca: [
        {
          question: 'Cada quant de temps es recomana fer una revisió dental?',
          answer: '[Freqüència recomanada de revisions i higienes segons les necessitats de cada pacient.]',
        },
        {
          question: 'Ateneu pacients de totes les edats?',
          answer: 'Sí, atenem tant adults com nens (odontopediatria) amb tracte proper i continuat al Poblenou.',
        },
      ],
      en: [
        {
          question: 'How often should I schedule a dental checkup?',
          answer: '[Recommended checkup and cleaning frequency tailored to each patient.]',
        },
        {
          question: 'Do you treat patients of all ages?',
          answer: 'Yes, we care for both adults and children (pediatric dentistry) at our Poblenou clinic.',
        },
      ],
    },
    image: '/assets/foto3.jpg',
    seoKeywords: ['dentista poblenou', 'limpieza dental doctor trueta', 'clinica dental poblenou barcelona'],
    features: {
      es: [
        'Odontología conservadora y preventiva',
        'Trato cercano y explicaciones claras',
        'Continuidad con tus doctoras de confianza',
      ],
      ca: [
        'Odontologia conservadora i preventiva',
        'Tracte proper i explicacions clares',
        'Continuïtat amb les teves doctores de confiança',
      ],
      en: [
        'Conservative, preventive dental care',
        'Clear explanations and unrushed visits',
        'Continuity with your trusted doctors',
      ],
    },
  },
  {
    id: 'bruxismo-atm',
    slug: 'bruxismo-atm',
    slugs: SPECIALTY_SLUG_MAP['bruxismo-atm'],
    schemaSpecialty: 'Prosthodontics',
    title: {
      es: 'Bruxismo y Articulación ATM',
      ca: 'Bruxisme i Articulació ATM',
      en: 'Bruxism & TMJ Occlusion',
    },
    subtitle: {
      es: 'Protección frente al desgaste dental por apriete o rechinamiento y valoración de la oclusión.',
      ca: 'Protecció enfront del desgast dental per serrament nocturn i valoració de l’oclusió.',
      en: 'Protection against tooth grinding wear and clinical evaluation of jaw occlusion.',
    },
    badge: {
      es: 'Oclusión y ATM',
      ca: 'Oclusió i ATM',
      en: 'Occlusion & TMJ',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Odontóloga Colegiada · Col. 5664 COEC',
      colegiateNumber: 'Col. 5664 COEC',
      image: '/assets/equip1.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.izbette.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.izbette.hoursAvailable,
    },
    medicalTeamSchedule: [MEDICAL_TEAM_SCHEDULES.izbette, MEDICAL_TEAM_SCHEDULES.silvia],
    shortDescription: {
      es: 'Valoración de sobrecargas musculares y confección de férulas de descarga personalizadas.',
      ca: 'Valoració de sobrecàrregues musculars i confecció de fèrules de descàrrega personalitzades.',
      en: 'Evaluation of jaw clenching overload and custom-fitted occlusal splints.',
    },
    fullDescription: {
      es: 'El hábito involuntario de apretar o rechinar los dientes puede provocar desgastes en el esmalte y sobrecarga en la articulación temporomandibular. [Detalles sobre estudio oclusal y características de las férulas de descarga confeccionadas en la clínica.]',
      ca: 'L’hàbit involuntari d’apretar o serrar les dents pot provocar desgastos a l’esmalt i sobrecàrrega a l’articulació temporomandibular. [Detalls sobre estudi oclusal i fèrules confirmats per la clínica.]',
      en: 'Unconscious clenching or grinding can wear down tooth enamel and strain the temporomandibular joint. [Details on custom occlusal splints confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Desgaste o fracturas en los bordes dentales',
        'Tensión o molestia muscular en la mandíbula al despertar',
        'Valoración de la oclusión dental',
      ],
      ca: [
        'Desgast o fractures a les vores dentals',
        'Tensió o molèstia muscular a la mandíbula en despertar',
        'Valoració de l’oclusió dental',
      ],
      en: [
        'Enamel wear or chipped tooth edges',
        'Morning jaw tightness or facial muscle tension',
        'Clinical bite and occlusion evaluation',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Férula de descarga a medida',
          description: '[Características, material y ajuste clínico de la férula confirmados por la clínica.]',
        },
        {
          name: 'Revisión y ajuste oclusal',
          description: '[Seguimiento periódico para verificar el contacto y estado de la férula.]',
        },
      ],
      ca: [
        {
          name: 'Fèrula de descàrrega a mida',
          description: '[Característiques, material i ajust clínic de la fèrula confirmats per la clínica.]',
        },
        {
          name: 'Revisió i ajust oclusal',
          description: '[Seguiment periòdic per verificar el contacte i estat de la fèrula.]',
        },
      ],
      en: [
        {
          name: 'Custom occlusal night guard',
          description: '[Material and clinical fitting details confirmed by the clinic.]',
        },
        {
          name: 'Occlusal follow-up & adjustment',
          description: '[Periodic checkups to verify splint fit and bite balance.]',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Cómo se fabrica una férula de descarga?',
          answer: '[Proceso de toma de medidas, confección en laboratorio y ajuste en consulta confirmado por la clínica.]',
        },
        {
          question: '¿Requiere revisiones periódicas?',
          answer: 'Sí, conviene revisarla en tus visitas de control para asegurar que mantiene un ajuste correcto.',
        },
      ],
      ca: [
        {
          question: 'Com es fabrica una fèrula de descàrrega?',
          answer: '[Procés de presa de mides, confecció al laboratori i ajust a consulta confirmat per la clínica.]',
        },
        {
          question: 'Requereix revisions periòdiques?',
          answer: 'Sí, convé revisar-la a les visites de control per assegurar que manté un ajust correcte.',
        },
      ],
      en: [
        {
          question: 'How is a custom night guard made?',
          answer: '[Impressions, fabrication, and in-clinic fitting process confirmed by the clinic.]',
        },
        {
          question: 'Does it require periodic checkups?',
          answer: 'Yes, bringing your splint to routine checkups ensures optimal long-term fit.',
        },
      ],
    },
    image: '/assets/oclusion1.jpg',
    seoKeywords: ['ferula de descarga poblenou', 'bruxismo barcelona doctor trueta', 'dentista bruxismo sant marti'],
    features: {
      es: [
        'Adaptación individualizada en consulta',
        'Protección del esmalte dental',
        'Revisiones de control periódicas',
      ],
      ca: [
        'Adaptació individualitzada a consulta',
        'Protecció de l’esmalt dental',
        'Revisions de control periòdiques',
      ],
      en: [
        'Custom in-clinic fitting',
        'Enamel wear protection',
        'Periodic fit checkups',
      ],
    },
  },
  {
    id: 'protesis-dental',
    slug: 'protesis-dental',
    slugs: SPECIALTY_SLUG_MAP['protesis-dental'],
    schemaSpecialty: 'Prosthodontics',
    title: {
      es: 'Prótesis Dental y Rehabilitación',
      ca: 'Pròtesi Dental i Rehabilitació',
      en: 'Dental Prosthetics & Rehabilitation',
    },
    subtitle: {
      es: 'Soluciones protésicas fijas y removibles para restaurar la función y estética bucal.',
      ca: 'Solucions protèsiques fixes i amovibles per restaurar la funció i estètica bucal.',
      en: 'Fixed and removable prosthetic solutions to restore oral function and aesthetics.',
    },
    badge: {
      es: 'Rehabilitación Oral',
      ca: 'Rehabilitació Oral',
      en: 'Prosthodontics',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Odontóloga Colegiada · Col. 5664 COEC',
      colegiateNumber: 'Col. 5664 COEC',
      image: '/assets/equip1.jpg',
      scheduleSummary: MEDICAL_TEAM_SCHEDULES.izbette.scheduleSummary,
      hoursAvailable: MEDICAL_TEAM_SCHEDULES.izbette.hoursAvailable,
    },
    medicalTeamSchedule: [MEDICAL_TEAM_SCHEDULES.izbette, MEDICAL_TEAM_SCHEDULES.ruby],
    shortDescription: {
      es: 'Coronas, puentes, prótesis sobre implantes y prótesis removibles adaptadas a cada paciente.',
      ca: 'Corones, ponts, pròtesis sobre implants i pròtesis amovibles adaptades a cada pacient.',
      en: 'Crowns, bridges, implant restorations, and removable dentures tailored to each patient.',
    },
    fullDescription: {
      es: 'La rehabilitación protésica permite devolver la capacidad masticatoria y la armonía facial cuando se han perdido o deteriorado piezas dentales. [Detalles sobre materiales protésicos, coronas y tipos de rehabilitación confirmados por la clínica.]',
      ca: 'La rehabilitació protèsica permet retornar la capacitat masticatòria i l’harmonia facial quan s’han perdut o deteriorat peces dentals. [Detalls sobre materials protèsics confirmats per la clínica.]',
      en: 'Prosthetic rehabilitation restores chewing function and natural tooth contours when teeth are missing or worn. [Specific materials and prosthetic options confirmed by the clinic.]',
    },
    indications: {
      es: [
        'Rehabilitación de piezas dentales muy destruidas',
        'Sustitución de dientes ausentes mediante prótesis fija o removible',
        'Renovación de prótesis antiguas desajustadas',
      ],
      ca: [
        'Rehabilitació de peces dentals molt destruïdes',
        'Substitució de dents absents mitjançant pròtesi fixa o amovible',
        'Renovació de pròtesis antigues desajustades',
      ],
      en: [
        'Restoring severely worn or fractured teeth',
        'Replacing missing teeth with fixed or removable prostheses',
        'Updating older ill-fitting dentures',
      ],
    },
    treatments: {
      es: [
        {
          name: 'Coronas y puentes dentales',
          description: '[Opciones de materiales cerámicos o metal-porcelana confirmados por la clínica.]',
        },
        {
          name: 'Prótesis removibles completas y parciales',
          description: '[Diseño y adaptación personalizada para comodidad del paciente.]',
        },
      ],
      ca: [
        {
          name: 'Corones i ponts dentals',
          description: '[Opcions de materials ceràmics o metall-porcellana confirmats per la clínica.]',
        },
        {
          name: 'Pròtesis amovibles completes i parcials',
          description: '[Disseny i adaptació personalitzada per a comoditat del pacient.]',
        },
      ],
      en: [
        {
          name: 'Dental crowns and bridges',
          description: '[Ceramic or porcelain material options confirmed by the clinic.]',
        },
        {
          name: 'Full and partial removable dentures',
          description: '[Custom design and fitting for patient comfort.]',
        },
      ],
    },
    faqs: {
      es: [
        {
          question: '¿Qué tipo de prótesis es más adecuada en mi caso?',
          answer: '[Criterios de valoración entre prótesis fija, sobre implantes o removible según el estudio clínico.]',
        },
        {
          question: '¿Cómo se debe limpiar y mantener una prótesis dental?',
          answer: '[Instrucciones de higiene y revisiones periódicas facilitadas por la clínica.]',
        },
      ],
      ca: [
        {
          question: 'Quin tipus de pròtesi és més adequada en el meu cas?',
          answer: '[Criteris de valoració entre pròtesi fixa, sobre implants o amovible segons l’estudi clínic.]',
        },
        {
          question: 'Com s’ha de netejar i mantenir una pròtesi dental?',
          answer: '[Instruccions d’higiene i revisions periòdiques facilitades per la clínica.]',
        },
      ],
      en: [
        {
          question: 'Which type of prosthesis is best for me?',
          answer: '[Comparison of fixed, implant-supported, and removable options after clinical exam.]',
        },
        {
          question: 'How should I care for my dental prosthesis?',
          answer: '[Daily cleaning and checkup guidance confirmed by our team.]',
        },
      ],
    },
    image: '/assets/clinica1.jpg',
    seoKeywords: ['protesis dental poblenou', 'coronas dentales barcelona doctor trueta', 'dentista rehabilitacion sant marti'],
    features: {
      es: [
        'Estudio oclusal y estético individualizado',
        'Ajuste clínico personalizado',
        '[Materiales de laboratorio protésico a confirmar]',
      ],
      ca: [
        'Estudi oclusal i estètic individualitzat',
        'Ajust clínic personalitzat',
        '[Materials de laboratori protèsic a confirmar]',
      ],
      en: [
        'Individualized bite and aesthetic planning',
        'Personalized clinical adjustment',
        '[Dental laboratory materials to be confirmed]',
      ],
    },
  },
];

export const CLINIC_GALLERY: ClinicImage[] = [
  {
    id: 'gal-1',
    src: '/assets/clinica1.jpg',
    title: { es: 'Gabinete Dental Principal', ca: 'Gabinet Dental Principal', en: 'Main Dental Operatory' },
    category: { es: 'Instalaciones', ca: 'Instal·lacions', en: 'Facilities' },
    description: {
      es: '[Descripción del gabinete dental y equipamiento confirmada por Clínica Dental SET.]',
      ca: '[Descripció del gabinet dental i equipament confirmada per Clínica Dental SET.]',
      en: '[Operatory room and clinical equipment details confirmed by Clínica Dental SET.]',
    },
  },
  {
    id: 'gal-2',
    src: '/assets/clinica2.jpg',
    title: { es: 'Área de Esterilización', ca: 'Àrea d’Esterilització', en: 'Sterilization Area' },
    category: { es: 'Bioseguridad', ca: 'Bioseguretat', en: 'Biosafety' },
    description: {
      es: '[Descripción de los protocolos de higiene y esterilización de la clínica.]',
      ca: '[Descripció dels protocols d’higiene i esterilització de la clínica.]',
      en: '[Details of hygiene and sterilization protocols confirmed by the clinic.]',
    },
  },
  {
    id: 'gal-3',
    src: '/assets/clinica3.jpg',
    title: { es: 'Recepción y Acogida', ca: 'Recepció i Benvinguda', en: 'Reception & Welcome Area' },
    category: { es: 'Espacio', ca: 'Espai', en: 'Atmosphere' },
    description: {
      es: 'Espacio de bienvenida en Carrer del Doctor Trueta 213, Poblenou.',
      ca: 'Espai de benvinguda al Carrer del Doctor Trueta 213, Poblenou.',
      en: 'Patient welcome area at Carrer del Doctor Trueta 213, Poblenou.',
    },
  },
  {
    id: 'gal-5',
    src: '/assets/clinica5.jpg',
    title: { es: 'Gabinete Clínico', ca: 'Gabinet Clínic', en: 'Clinical Room' },
    category: { es: 'Instalaciones', ca: 'Instal·lacions', en: 'Facilities' },
    description: {
      es: '[Descripción de las prestaciones del gabinete confirmada por la clínica.]',
      ca: '[Descripció de les prestacions del gabinet confirmada per la clínica.]',
      en: '[Clinical room features confirmed by the clinic.]',
    },
  },
  {
    id: 'gal-7',
    src: '/assets/clinica7.jpg',
    title: { es: 'Zona de Consulta', ca: 'Zona de Consulta', en: 'Consultation Room' },
    category: { es: 'Atención', ca: 'Atenció', en: 'Care' },
    description: {
      es: 'Espacio dedicado a explicar cada diagnóstico y resolver dudas de forma cercana.',
      ca: 'Espai dedicat a explicar cada diagnòstic i resoldre dubtes de manera propera.',
      en: 'Dedicated space to explain your diagnosis and answer questions clearly.',
    },
  },
  {
    id: 'gal-9',
    src: '/assets/clinica9.jpg',
    title: { es: 'Gabinete de Higiene y Prevención', ca: 'Gabinet d’Higiene i Prevenció', en: 'Hygiene & Prevention Suite' },
    category: { es: 'Instalaciones', ca: 'Instal·lacions', en: 'Facilities' },
    description: {
      es: '[Descripción del espacio dedicado a higienes y mantenimiento dental.]',
      ca: '[Descripció de l’espai dedicat a higienes i manteniment dental.]',
      en: '[Details of hygiene and preventive care suite.]',
    },
  },
  {
    id: 'gal-10',
    src: '/assets/clinica10.jpg',
    title: { es: 'Interior de la Clínica', ca: 'Interior de la Clínica', en: 'Clinic Interior' },
    category: { es: 'Espacio', ca: 'Espai', en: 'Atmosphere' },
    description: {
      es: '[Detalles arquitectónicos y confort de las instalaciones en Poblenou.]',
      ca: '[Detalls arquitectònics i confort de les instal·lacions al Poblenou.]',
      en: '[Architectural details and comfort of our Poblenou practice.]',
    },
  },
  {
    id: 'gal-8',
    src: '/assets/galeria8.jpg',
    title: { es: 'Sala de Espera', ca: 'Sala d’Espera', en: 'Patient Waiting Area' },
    category: { es: 'Espacio', ca: 'Espai', en: 'Atmosphere' },
    description: {
      es: 'Ambiente tranquilo pensado para tu comodidad antes de cada visita.',
      ca: 'Ambient tranquil pensat per a la teva comoditat abans de cada visita.',
      en: 'Calm waiting environment designed for patient comfort.',
    },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'placeholder-1',
    name: '[Nombre de paciente verificado]',
    location: '[Barrio / Poblenou]',
    treatment: {
      es: '[Tratamiento realizado]',
      ca: '[Tractament realitzat]',
      en: '[Treatment received]',
    },
    comment: {
      es: '[Espacio reservado para insertar una reseña real y autorizada de Google Business Profile de Clínica Dental SET.]',
      ca: '[Espai reservat per inserir una ressenya real i autoritzada de Google Business Profile de Clínica Dental SET.]',
      en: '[Placeholder reserved for an authentic, patient-authorized Google Business Profile review for Clínica Dental SET.]',
    },
    rating: 5,
    date: '[Fecha de reseña]',
  },
  {
    id: 'placeholder-2',
    name: '[Nombre de paciente verificado]',
    location: '[Sant Martí / Barcelona]',
    treatment: {
      es: '[Tratamiento realizado]',
      ca: '[Tractament realitzat]',
      en: '[Treatment received]',
    },
    comment: {
      es: '[Espacio reservado para insertar una reseña real y autorizada de Google Business Profile de Clínica Dental SET.]',
      ca: '[Espacio reservat per inserir una ressenya real i autoritzada de Google Business Profile de Clínica Dental SET.]',
      en: '[Placeholder reserved for an authentic, patient-authorized Google Business Profile review for Clínica Dental SET.]',
    },
    rating: 5,
    date: '[Fecha de reseña]',
  },
  {
    id: 'placeholder-3',
    name: '[Nombre de paciente verificado]',
    location: '[Poblenou, Barcelona]',
    treatment: {
      es: '[Tratamiento realizado]',
      ca: '[Tractament realitzat]',
      en: '[Treatment received]',
    },
    comment: {
      es: '[Espacio reservado para insertar una reseña real y autorizada de Google Business Profile de Clínica Dental SET.]',
      ca: '[Espacio reservat per inserir una ressenya real i autoritzada de Google Business Profile de Clínica Dental SET.]',
      en: '[Placeholder reserved for an authentic, patient-authorized Google Business Profile review for Clínica Dental SET.]',
    },
    rating: 5,
    date: '[Fecha de reseña]',
  },
];
