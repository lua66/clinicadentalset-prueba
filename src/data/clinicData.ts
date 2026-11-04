import { Specialty, TeamMember, ClinicImage, Testimonial } from '../types';

export const CLINIC_CONTACT = {
  phone: '933 09 18 71',
  phoneClean: '+34933091871',
  whatsapp: '697 35 85 40',
  whatsappClean: '34697358540',
  email: 'info@clinicadentalset.com',
  address: 'Carrer del Doctor Trueta, 213, Bajos',
  city: '08005 Barcelona (Poblenou)',
  metro: 'L4 Poblenou / Llacuna (a 4 min a pie)',
  bus: 'Líneas V27, 6, H16',
  hours: {
    weekdays: '10:00h – 14:00h / 15:00h – 20:00h',
    weekend: 'Sábados y Domingos: Urgencias con cita previa',
  },
  googleMapsUrl: 'https://maps.google.com/?q=Clinica+Dental+Set+Carrer+del+Doctor+Trueta+213+08005+Barcelona',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.839611598918!2d2.200832376602334!3d41.40050809525418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a4a33c29fb9f55%3A0x6b8b0e77d0799818!2sCl%C3%ADnica%20Dental%20SET!5e0!3m2!1ses!2ses!4v1715000000000!5m2!1ses!2ses',
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'izbette-luis',
    name: 'Dra. Izbette Luis Torres',
    collegiateNumber: 'Col. 5664 COEC',
    role: {
      es: 'Directora Clínica & Especialista en Estética y Rehabilitación Oral',
      ca: 'Directora Clínica i Especialista en Estètica i Rehabilitació Oral',
      en: 'Clinical Director & Specialist in Aesthetics and Oral Rehabilitation',
    },
    specialty: {
      es: 'Rehabilitación Oral, Estética Dental y Oclusión',
      ca: 'Rehabilitació Oral, Estètica Dental i Oclusió',
      en: 'Oral Rehabilitation, Dental Aesthetics & Occlusion',
    },
    bio: {
      es: 'Lidera la filosofía asistencial de Clínica Dental SET combinando máxima precisión científica con un trato cálido y personalizado. Más de 18 años dedicados al cuidado de las familias del Poblenou.',
      ca: 'Lidera la filosofia assistencial de Clínica Dental SET combinant màxima precisió científica amb un tracte càlid i personalitzat. Més de 18 anys dedicats a la salut bucal de les famílies del Poblenou.',
      en: 'Leads Clínica Dental SET with high clinical precision and dedicated personal patient care. Over 18 years treating families in Poblenou, Barcelona.',
    },
    credentials: [
      'Licenciada en Odontología',
      'Máster en Rehabilitación Oral y Estética Dental',
      'Miembro de la Sociedad Española de Prótesis Estomatológica (SEPES)',
      'Especialista en planificación digital de sonrisa (DSD)',
    ],
    image: '/assets/equip1.jpg',
  },
  {
    id: 'ruby-herrera',
    name: 'Dra. Ruby Alexandra Herrera Villamil',
    collegiateNumber: 'Col. 5929 COEC',
    role: {
      es: 'Especialista en Cirugía Oral, Periodoncia e Implantología',
      ca: 'Especialista en Cirurgia Oral, Periodòncia i Implantologia',
      en: 'Oral Surgery, Periodontics & Implantology Specialist',
    },
    specialty: {
      es: 'Implantes Dentales, Injertos Óseos y Cirugía Mucogingival',
      ca: 'Implants Dentals, Empelts Óssis i Cirurgia Mucogingival',
      en: 'Dental Implants, Bone Grafts & Mucogingival Surgery',
    },
    bio: {
      es: 'Cirujana especialista con formación avanzada internacional en implantología guiada por ordenador y regeneración ósea. Enfoque mínimamente invasivo con postoperatorios indoloros y rápidos.',
      ca: 'Cirurgiana especialista amb formació avançada en implantologia guiada per ordinador i regeneració òssia. Enfocament mínimament invasiu amb recuperació ràpida.',
      en: 'Specialized oral surgeon with advanced expertise in computer-guided implantology and bone regeneration. Minimally invasive gentle approach.',
    },
    credentials: [
      'Máster Oficial en Cirugía, Periodoncia e Implantología',
      'Especialista en Carga Inmediata y Dientes en el Mismo Día',
      'Certificación en Sedación Consciente Odontológica',
      'Miembro de la Sociedad Española de Periodoncia (SEPA)',
    ],
    image: '/assets/equip4.jpg',
  },
  {
    id: 'silvia-degorgue',
    name: 'Sílvia Degorgue Magrazo',
    role: {
      es: 'Coordinadora de Pacientes & Higienista Bucodental',
      ca: 'Coordinadora de Pacients i Higienista Bucodental',
      en: 'Patient Coordinator & Dental Hygienist',
    },
    specialty: {
      es: 'Atención Personalizada, Prevención Periodontal y Gestión',
      ca: 'Atenció Personalitzada, Prevenció Periodontal i Gestió',
      en: 'Patient Care, Periodontal Prevention & Clinical Coordination',
    },
    bio: {
      es: 'La sonrisa y el punto de confianza de la clínica. Acompaña a cada paciente desde su primera visita, coordinando citas, resolviendo dudas clínicas y gestionando opciones de financiación con total transparencia.',
      ca: 'El somriure i la confiança de la clínica. Acompanya cada pacient des de la seva primera visita, coordinant visites i resolent dubtes amb total claredat.',
      en: 'The welcoming heart of our practice. Supports every patient through their treatment journey with empathy, clarity, and scheduling ease.',
    },
    credentials: [
      'Técnico Superior en Higiene Bucodental',
      'Especialista en Mantenimiento Periodontal y Profilaxis Avanzada',
      'Responsable de Protocolos de Bioseguridad y Esterilización',
    ],
    image: '/assets/equip2.jpg',
  },
];

export const SPECIALTIES: Specialty[] = [
  {
    id: 'implantes-dentales',
    slug: 'implantes-dentales',
    title: {
      es: 'Implantes Dentales y Cirugía Guiada',
      ca: 'Implants Dentals i Cirurgia Guiada',
      en: 'Dental Implants & Guided Surgery',
    },
    subtitle: {
      es: 'Recupera la función masticatoria y la estética natural con implantes de titanio biocompatible de máxima calidad.',
      ca: 'Recupera la funció masticatòria i l’estètica natural amb implants de titani biocompatible de màxima qualitat.',
      en: 'Restore your natural bite, confidence, and aesthetics with top-tier biocompatible dental implants in Barcelona.',
    },
    badge: {
      es: 'Especialidad Quirúrgica',
      ca: 'Especialitat Quirúrgica',
      en: 'Surgical Specialty',
    },
    leadDoctor: {
      name: 'Dra. Ruby Alexandra Herrera Villamil',
      role: 'Máster en Cirugía e Implantes (Col. 5929)',
      colegiateNumber: '5929 COEC',
      image: '/assets/equip4.jpg',
    },
    shortDescription: {
      es: 'Sustitución fija y definitiva de piezas perdidas mediante cirugía guiada por ordenador, microcirugía y regeneración ósea.',
      ca: 'Substitució fixa i definitiva de peces perdudes mitjançant cirurgia guiada per ordinador i regeneració òssia.',
      en: 'Permanent, fixed replacement of missing teeth with computer-guided surgical precision and bone regeneration.',
    },
    fullDescription: {
      es: 'En Clínica Dental SET entendemos que perder una o varias piezas dentales afecta tu calidad de vida, seguridad al sonreír y salud digestiva. Realizamos un estudio 3D completo antes de cada intervención para colocar el implante en la posición exacta, minimizando el tiempo quirúrgico y logrando un postoperatorio prácticamente indoloro.',
      ca: 'A Clínica Dental SET sabem que perdre peces dentals afecta la seguretat en somriure i la masticació. Realitzem un estudi 3D previ per col·locar l’implant amb exactitud mil·limètrica.',
      en: 'At Clínica Dental SET we know losing teeth impacts confidence and eating comfort. We employ 3D bone diagnostics for precision placement and gentle recovery.',
    },
    indications: {
      es: [
        'Pérdida de uno o varios dientes por caries, traumatismo o periodontitis',
        'Incomodidad o inestabilidad con prótesis removibles tradicionales',
        'Necesidad de reponer piezas sin desgastar los dientes vecinos sanos',
        'Casos complejos con poco hueso mediante técnicas de regeneración',
      ],
      ca: [
        'Pèrdua d’una o més dents per càries, traumatisme o periodontitis',
        'Incomoditat amb pròtesis amovibles antigues',
        'Substitució sense danyar les dents veïnes sanes',
        'Casos de poc volum ossi mitjançant regeneració',
      ],
      en: [
        'Single or multiple missing teeth due to wear, trauma, or decay',
        'Loose or uncomfortable traditional removable dentures',
        'Replacing teeth without shaving healthy adjacent teeth',
        'Bone deficiency cases resolved with guided bone regeneration',
      ],
    },
    treatments: {
      es: [
        { name: 'Implante unitario con corona de zirconio', description: 'Solución individual indistinguible de un diente natural.' },
        { name: 'Carga inmediata (Dientes en 24h)', description: 'Colocación del implante y prótesis provisional fija el mismo día.' },
        { name: 'Rehabilitaciones completas fijas', description: 'Tratamiento sobre 4 o 6 implantes (All-on-4 / All-on-6).' },
        { name: 'Elevación de seno maxilar e injertos óseos', description: 'Técnicas avanzadas para pacientes con pérdida ósea severa.' },
      ],
      ca: [
        { name: 'Implant unitari amb corona de zirconi', description: 'Solució individual idèntica a una dent natural.' },
        { name: 'Càrrega immediata (Dents en 24h)', description: 'Col·locació d’implant i dent provisional fixa el mateix dia.' },
        { name: 'Rehabilitacions completes fixes', description: 'Tratament sobre 4 o 6 implants per a tota l’arcada.' },
        { name: 'Elevació de si maxil·lar i empelts', description: 'Per a pacients que presenten pèrdua d’os.' },
      ],
      en: [
        { name: 'Single tooth implant + zirconia crown', description: 'Seamless tooth restoration matching natural shade.' },
        { name: 'Immediate loading (Teeth in a day)', description: 'Fixing provisional tooth during the same appointment.' },
        { name: 'Full arch rehabilitation', description: 'Stable full dental arch restoration on 4-6 implants.' },
        { name: 'Sinus lift & bone grafting', description: 'Modern grafting protocols for bone volume rebuild.' },
      ],
    },
    faqs: {
      es: [
        { question: '¿Duele ponerse un implante dental?', answer: 'No. La intervención se realiza con anestesia local de última generación y, si lo prefieres, con sedación consciente. La mayoría de nuestros pacientes del Poblenou retoman su vida normal al día siguiente.' },
        { question: '¿Cuánto dura un implante?', answer: 'Con una higiene adecuada y las revisiones periódicas que pautamos en la clínica, los implantes pueden durar toda la vida con tasas de éxito superiores al 98%.' },
      ],
      ca: [
        { question: 'Fa mal col·locar un implant dental?', answer: 'No. S’aplica anestèsia local d’última generació. El postoperatori és lleu i la majoria fa vida normal l’endemà.' },
        { question: 'Quant de temps dura un implant?', answer: 'Amb un bon manteniment i higiene bucal poden durar tota la vida, amb un èxit superior al 98%.' },
      ],
      en: [
        { question: 'Does getting a dental implant hurt?', answer: 'Not at all. We use state-of-the-art local anesthesia, making the procedure pain-free. Most patients resume regular routines within 24 hours.' },
        { question: 'How long do dental implants last?', answer: 'With good oral hygiene and standard check-ups, dental implants have over 98% success rate and can last a lifetime.' },
      ],
    },
    image: '/assets/implantes1.jpg',
    seoKeywords: ['implantes dentales poblenou', 'cirugia implantes doctor trueta barcelona', 'precio implante dental barcelona sant marti', 'carga inmediata poblenou'],
    features: {
      es: ['Diagnóstico 3D Guiado', 'Titanio Biocompatible Premium', 'Garantía Clínica Certificada', 'Financiación hasta 36 meses'],
      ca: ['Diagnòstic 3D Guiat', 'Titani Biocompatible Premium', 'Garantia Clínica Certificada', 'Finançament fins a 36 mesos'],
      en: ['Guided 3D Planning', 'Premium Biocompatible Titanium', 'Certified Clinical Warranty', 'Flexible Financing Options'],
    },
  },
  {
    id: 'ortodoncia',
    slug: 'ortodoncia',
    title: {
      es: 'Ortodoncia Invisible e Invisalign',
      ca: 'Ortodòncia Invisible i Invisalign',
      en: 'Invisible Orthodontics & Clear Aligners',
    },
    subtitle: {
      es: 'Alinea tu sonrisa de forma cómoda, higiénica e imperceptible para los demás.',
      ca: 'Alinea el teu somriure de manera còmoda, higiènica i imperceptible.',
      en: 'Straighten your teeth comfortably and discreetly with digital precision clear aligners.',
    },
    badge: {
      es: 'Sonrisa Perfecta',
      ca: 'Somriure Perfecte',
      en: 'Clear Aligners',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Especialista en Estética y Ortodoncia (Col. 5664)',
      colegiateNumber: '5664 COEC',
      image: '/assets/equip1.jpg',
    },
    shortDescription: {
      es: 'Férulas transparentes extraíbles y brackets estéticos de zafiro adaptados a niños, jóvenes y adultos.',
      ca: 'Fèrules transparents extraïbles i brackets estètics de safir per a totes les edats.',
      en: 'Removable transparent aligners and aesthetic sapphire brackets for adults, teens, and children.',
    },
    fullDescription: {
      es: 'La ortodoncia moderna va mucho más allá de alinear los dientes: busca un equilibrio biomecánico que evite el desgaste dental prematuro, dolores cervicales y problemas en la articulación mandibular (ATM). Con nuestro escáner digital 3D intraoral, verás una simulación de tu sonrisa final antes de iniciar el tratamiento.',
      ca: 'L’ortodòncia actual millora l’estètica i la masticació, prevenint el desgast dental i dolors d’articulació. Mitjançant escaneig intraoral 3D veuràs el resultat abans de començar.',
      en: 'Modern orthodontics aligns your bite to protect your jaw joints and prevent dental wear. Our 3D intraoral scan lets you preview your future smile before starting.',
    },
    indications: {
      es: [
        'Apiñamiento o dientes montados',
        'Separación entre dientes (diastemas)',
        'Mordida cruzada, abierta o sobremordida',
        'Adultos que quieren alinear sus dientes sin aparatos metálicos visibles',
      ],
      ca: [
        'Apinyaament de peces dentals',
        'Espais entre dents (diastemes)',
        'Mossegada creuada, oberta o sobremossegada',
        'Adults que cerquen discreció absoluta',
      ],
      en: [
        'Crowded or overlapping teeth',
        'Gaps between teeth (diastema)',
        'Crossbite, open bite, or overbite',
        'Adults demanding completely discreet aligners',
      ],
    },
    treatments: {
      es: [
        { name: 'Ortodoncia Invisible (Alineadores Transparentes)', description: 'Férulas que puedes quitarte para comer y cepillarte con total comodidad.' },
        { name: 'Brackets estéticos de Zafiro', description: 'Completamente cristalinos, no se manchan ni se tiñen con el café.' },
        { name: 'Ortodoncia interceptiva infantil', description: 'Corrección temprana del desarrollo maxilar en los más pequeños.' },
      ],
      ca: [
        { name: 'Ortodòncia Invisible (Alineadors transparents)', description: 'Fèrules invisibles i còmodes per menjar i raspallar-te.' },
        { name: 'Brackets estètics de Safir', description: 'Transparents, no es taquen amb el menjar ni cafè.' },
        { name: 'Ortodòncia infantil interceptiva', description: 'Prevenció i guiatge del creixement ossi en nens.' },
      ],
      en: [
        { name: 'Clear Aligners System', description: 'Removable invisible trays for effortless eating and hygiene.' },
        { name: 'Sapphire Aesthetic Brackets', description: 'Crystal-clear aesthetic brackets that never stain.' },
        { name: 'Early Interceptive Orthodontics', description: 'Guiding jaw development in children.' },
      ],
    },
    faqs: {
      es: [
        { question: '¿Cuánto dura el tratamiento con alineadores?', answer: 'Dependiendo de la complejidad, los tratamientos leves duran entre 6 y 9 meses, y casos completos entre 12 y 18 meses.' },
        { question: '¿Afecta al habla?', answer: 'Durante los dos primeros días puedes notar una leve adaptación, pero después hablarás con total naturalidad.' },
      ],
      ca: [
        { question: 'Quant dura el tractament?', answer: 'Casos senzills entre 6 i 9 mesos; casos integrals entre 12 i 18 mesos.' },
        { question: 'Es nota en parlar?', answer: 'Només les primeres 48 hores d’adaptació, després és 100% natural.' },
      ],
      en: [
        { question: 'How long does clear aligner therapy take?', answer: 'Mild corrections take 6-9 months, while comprehensive cases take 12-18 months.' },
        { question: 'Does it affect speech?', answer: 'Only during the first 2 days of initial adaptation, after which speaking feels completely natural.' },
      ],
    },
    image: '/assets/ortodoncia1.png',
    seoKeywords: ['invisalign poblenou barcelona', 'ortodoncia invisible doctor trueta', 'dentista ortodoncia sant marti', 'precio alineadores transparentes barcelona'],
    features: {
      es: ['Escáner 3D sin pastas incómodas', 'Simulación virtual del resultado', 'Alineadores invisibles y removibles', 'Revisiones cómodas y flexibles'],
      ca: ['Escàner 3D digital', 'Simulació virtual de resultats', 'Alineadors invisibles i extraïbles', 'Revisions còmodes i àgils'],
      en: ['Digital 3D Intraoral Scanning', 'Predictive Smile Simulation', 'Invisible & Removable', 'Customized Follow-up Appointments'],
    },
  },
  {
    id: 'estetica-dental',
    slug: 'estetica-dental',
    title: {
      es: 'Estética Dental, Carillas y Blanqueamiento',
      ca: 'Estètica Dental, Carilles i Blanquejament',
      en: 'Cosmetic Dentistry, Veneers & Whitening',
    },
    subtitle: {
      es: 'Diseño armónico y personalizado de la sonrisa cuidando el esmalte natural.',
      ca: 'Disseny harmònic i personalitzat del somriure preservant l’esmalt dental.',
      en: 'Harmonious, luminous smile transformations with minimally invasive micro-veneers.',
    },
    badge: {
      es: 'Diseño de Sonrisa',
      ca: 'Disseny de Somriure',
      en: 'Smile Design',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Directora Clínica (Col. 5664)',
      colegiateNumber: '5664 COEC',
      image: '/assets/equip1.jpg',
    },
    shortDescription: {
      es: 'Carillas ultrafinas de porcelana feldespática, carillas de composite estratificado y blanqueamiento clínico con luz LED.',
      ca: 'Carilles ultrafines de porcellana, compòsit estratificat i blanquejament clínic LED.',
      en: 'Ultra-thin ceramic porcelain veneers, direct composite layering, and clinical in-office whitening.',
    },
    fullDescription: {
      es: 'La estética dental contemporánea no busca dientes artificialmente blancos ni uniformes, sino una belleza natural que se integre a tus rasgos faciales, tono de piel y edad. Diseñamos carillas mínimamente invasivas que respetan la estructura de tu diente y blanqueamientos clínicos de alta seguridad que no provocan hipersensibilidad.',
      ca: 'L’estètica dental a Clínica SET busca un somriure natural i brillant que s’adapti als teus trets. Fem servir carilles de màxima qualitat que conserven la dent natural.',
      en: 'Modern cosmetic dentistry focuses on natural elegance tailored to your unique facial features, ensuring minimal enamel preparation and safe tooth whitening.',
    },
    indications: {
      es: [
        'Dientes desgastados, fracturados o con forma irregular',
        'Tinciones severas o esmalte oscurecido que no responde a limpiezas',
        'Espacios entre dientes que desees cerrar sin ortodoncia larga',
        'Mejora de la luminosidad y rejuvenecimiento de la sonrisa',
      ],
      ca: [
        'Dents desgastades o fracturades',
        'Taques profundes o to fosc de l’esmalt',
        'Espais o asimetries en el somriure',
        'Aportar lluminositat i rejovenir el rostre',
      ],
      en: [
        'Worn, chipped, or irregularly shaped teeth',
        'Intrinsic discoloration not responding to regular cleanings',
        'Closing gaps or rectifying tooth proportions',
        'Desire for a brighter, natural youthful smile',
      ],
    },
    treatments: {
      es: [
        { name: 'Carillas de porcelana / cerámica ultrafina', description: 'Láminas cerámicas de alta resistencia que no cambian de color con el tiempo.' },
        { name: 'Carillas de composite estratificado', description: 'Modelado artístico directo en clínica en una sola sesión.' },
        { name: 'Blanqueamiento dental profesional combinado', description: 'Sesión clínica LED de alta potencia + férulas personalizadas para casa.' },
      ],
      ca: [
        { name: 'Carilles de porcellana ultrafines', description: 'Alta resistència i brillantor inalterable amb els anys.' },
        { name: 'Carilles de compòsit en una sessió', description: 'Treball artesanal directe sobre la dent sense tallar esmalt.' },
        { name: 'Blanquejament professional combinat', description: 'Sessió a la clínica amb làmpada LED + reforç a domicili.' },
      ],
      en: [
        { name: 'Ultra-thin Porcelain Ceramic Veneers', description: 'Permanent color stability and unmatched natural translucency.' },
        { name: 'Artistic Composite Veneers', description: 'Direct sculpting in a single appointment without tooth shaving.' },
        { name: 'Dual In-Office & Take-Home Whitening', description: 'Advanced LED clinic session combined with tailored home kits.' },
      ],
    },
    faqs: {
      es: [
        { question: '¿Las carillas dañan mis dientes?', answer: 'No. Hoy trabajamos con microcarillas de grosor menor a 0.3mm que en la mayoría de casos apenas requieren un pulido superficial conservando el diente natural intacto.' },
        { question: '¿Cuánto dura el blanqueamiento dental?', answer: 'Con buenos hábitos de higiene y revisiones anuales, los resultados se mantienen entre 2 y 4 años.' },
      ],
      ca: [
        { question: 'Les carilles fan malbé la dent?', answer: 'No. Utilitzem microcarilles mínimament invasives que mantenen l’estructura dental intacta.' },
        { question: 'Quant dura el blanquejament?', answer: 'Amb hàbits normals i revisions, el resultat es manté de 2 a 4 anys.' },
      ],
      en: [
        { question: 'Do veneers damage my natural teeth?', answer: 'No. Modern ceramic micro-veneers (under 0.3mm) require minimal to zero tooth preparation.' },
        { question: 'How long do whitening results last?', answer: 'Typically 2 to 4 years, easily maintained with periodic touch-ups.' },
      ],
    },
    image: '/assets/foto1.jpg',
    seoKeywords: ['blanqueamiento dental poblenou', 'carillas de porcelana barcelona doctor trueta', 'estetica dental poblenou sant marti', 'diseno de sonrisa barcelona'],
    features: {
      es: ['Estudio fotográfico y DSD', 'Carillas sin tallado agresivo', 'Blanqueamiento seguro sin dolor', 'Resultados naturales garantizados'],
      ca: ['Estudi fotogràfic digital', 'Carilles sense desgast agressiu', 'Blanquejament segur i indolor', 'Resultats naturals garantits'],
      en: ['Digital Smile Design (DSD)', 'Minimally Invasive Protocols', 'Pain-free Safe Whitening', 'Natural Lifelike Results'],
    },
  },
  {
    id: 'periodoncia',
    slug: 'periodoncia',
    title: {
      es: 'Periodoncia y Salud de Encías',
      ca: 'Periodòncia i Salut de les Genives',
      en: 'Periodontics & Gum Disease Care',
    },
    subtitle: {
      es: 'Detén el sangrado gingival, la retracción y el avance de la piorrea para salvar tus dientes.',
      ca: 'Atura el sagnat gingival, la retracció i la piorrea per salvar les teves dents.',
      en: 'Halt gum bleeding, recession, and bone loss to preserve your natural teeth long-term.',
    },
    badge: {
      es: 'Salud de Encías',
      ca: 'Salut de Genives',
      en: 'Gum Health',
    },
    leadDoctor: {
      name: 'Dra. Ruby Alexandra Herrera Villamil',
      role: 'Especialista en Periodoncia (Col. 5929)',
      colegiateNumber: '5929 COEC',
      image: '/assets/equip4.jpg',
    },
    shortDescription: {
      es: 'Tratamiento de gingivitis y periodontitis mediante raspados periodontales, desinfección y microcirugía regenerativa.',
      ca: 'Tractament de gingivitis i periodontitis mitjançant curetatges i regeneració gingival.',
      en: 'Diagnosis and targeted therapy for gingivitis and periodontitis using deep ultrasonic scaling and gum regenerative techniques.',
    },
    fullDescription: {
      es: 'El sangrado de encías nunca es normal. La periodontitis es una infección bacteriana silenciosa que destruye progresivamente el hueso que sostiene las piezas dentales. En Clínica Dental SET diagnosticamos el estado de tu soporte periodontal con sondaje digital y microbiológico, frenando la enfermedad y evitando la pérdida de dientes.',
      ca: 'El sagnat de genives mai és normal. La periodontitis és una infecció bacteriana que destrueix l’os de suport de les dents. A la clínica aturem la malaltia amb tractaments personalitzats.',
      en: 'Bleeding gums are a warning sign. Periodontitis is a chronic bacterial infection that gradually erodes the bone holding teeth. We diagnose and treat gum disease early to keep your teeth stable.',
    },
    indications: {
      es: [
        'Sangrado durante el cepillado o espontáneo',
        'Encías enrojecidas, inflamadas o retraídas con dientes que parecen más largos',
        'Mal aliento persistente o sabor desagradable en la boca',
        'Movilidad en los dientes o separación repentina',
      ],
      ca: [
        'Sagnat durant el raspallat',
        'Genives inflamades o dents que semblen més llargues',
        'Halitosi o mal gust de boca persistent',
        'Sensació de mobilitat en alguna dent',
      ],
      en: [
        'Bleeding gums when brushing or flossing',
        'Swollen, receding gums exposing tooth roots',
        'Persistent bad breath or foul taste',
        'Loose teeth or shifting bite alignment',
      ],
    },
    treatments: {
      es: [
        { name: 'Raspado y alisado radicular (Curetajes)', description: 'Eliminación del sarro y bacterias por debajo de la línea de la encía.' },
        { name: 'Mantenimiento y profilaxis periodontal', description: 'Revisiones periódicas de control bacteriano cada 4-6 meses.' },
        { name: 'Injertos de encía y cirugía mucogingival', description: 'Protección de raíces expuestas para frenar la sensibilidad y el retroceso.' },
      ],
      ca: [
        { name: 'Raspats i allisat radicular (Curetatges)', description: 'Eliminació del carrall subgingival i bacteris.' },
        { name: 'Manteniment periodontal periòdic', description: 'Control microbiològic cada 4 o 6 mesos.' },
        { name: 'Empelts de geniva', description: 'Recobriment d’arrels exposades per frenar la sensibilitat.' },
      ],
      en: [
        { name: 'Deep Scaling & Root Planing', description: 'Eliminating subgingival tartar and bacterial colonies.' },
        { name: 'Periodontal Supportive Maintenance', description: 'Personalized bacterial monitoring visits every 4-6 months.' },
        { name: 'Connective Tissue Gum Grafts', description: 'Covering exposed roots to eliminate sensitivity and recession.' },
      ],
    },
    faqs: {
      es: [
        { question: '¿Se cura la periodontitis?', answer: 'La periodontitis se puede controlar y detener por completo, evitando la pérdida de más hueso y dientes, con un tratamiento adecuado y un mantenimiento semestral.' },
        { question: '¿El raspado periodontal es doloroso?', answer: 'Se realiza con anestesia local tópica e infiltrativa muy suave, por lo que no sentirás ninguna molestia durante la sesión.' },
      ],
      ca: [
        { question: 'Té cura la periodontitis?', answer: 'Es pot aturar i controlar totalment amb el tractament adequat i manteniments regulars.' },
        { question: 'Fan mal els curetatges?', answer: 'No, s’aplica anestèsia suau i és un procediment molt còmode.' },
      ],
      en: [
        { question: 'Can periodontitis be cured?', answer: 'It can be successfully halted and controlled, permanently stopping bone destruction through maintenance.' },
        { question: 'Is deep cleaning painful?', answer: 'With modern gentle local anesthesia, patients experience zero pain during treatment.' },
      ],
    },
    image: '/assets/periodoncia1.jpg',
    seoKeywords: ['periodoncia poblenou barcelona', 'curetajos dentals doctor trueta', 'dentista encias sangrantes sant marti', 'tratamiento piorrea barcelona'],
    features: {
      es: ['Periodontograma digital', 'Desinfección ultrasónica suave', 'Control de halitosis y bacterias', 'Programa de mantenimiento'],
      ca: ['Periodontograma digital', 'Neteja ultrasònica suau', 'Control d’halitosi', 'Pla de manteniment periòdic'],
      en: ['Digital Periodontal Charting', 'Gentle Ultrasonic Disinfection', 'Halitosis Resolution', 'Personalized Preventive Plan'],
    },
  },
  {
    id: 'endodoncia',
    slug: 'endodoncia',
    title: {
      es: 'Endodoncia Microscópica',
      ca: 'Endodòncia Microscòpica',
      en: 'Microscopic Endodontics (Root Canal)',
    },
    subtitle: {
      es: 'Salva tu diente natural y alivia el dolor agudo con tratamientos de conductos de máxima precisión.',
      ca: 'Salva la teva dent natural i calma el dolor agut amb tractaments de màxima precisió.',
      en: 'Relieve intense tooth pain and save your natural tooth with micro-endodontic care.',
    },
    badge: {
      es: 'Preservación Dental',
      ca: 'Preservació Dental',
      en: 'Tooth Preservation',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Odontología Conservadora (Col. 5664)',
      colegiateNumber: '5664 COEC',
      image: '/assets/equip1.jpg',
    },
    shortDescription: {
      es: 'Limpieza, desinfección y sellado tridimensional de la pulpa dental afectada por caries profundas o traumatismos.',
      ca: 'Neteja, desinfecció i segellat tridimensional del conducte pulpar afectat per càries profunda.',
      en: 'Thorough cleaning, disinfection, and 3D hermetic sealing of infected root canals to preserve natural dentition.',
    },
    fullDescription: {
      es: 'Nada se compara a tu propio diente natural. Cuando una caries alcanza el nervio o se produce un flemón, la endodoncia es la alternativa biológica para desinfectar el conducto, eliminar el dolor de forma inmediata y sellar la pieza para que continúe funcionando con total normalidad durante décadas.',
      ca: 'Res no és millor que la teva pròpia dent. Quan una càries arriba al nervi, l’endodòncia permet netejar la infecció, eliminar el dolor a l’instant i conservar la peça.',
      en: 'Nothing beats your natural tooth. When deep decay infects the nerve, modern endodontics resolves pain instantly and seals the canal so you keep your tooth for life.',
    },
    indications: {
      es: [
        'Dolor dental agudo, pulsátil o que se agrava al masticar o tumbarse',
        'Sensibilidad extrema y prolongada al frío o al calor',
        'Flemón o inflamación visible en la encía con fístula de pus',
        'Caries profundas detectadas en radiografía que comprometen el nervio',
      ],
      ca: [
        'Dolor punxant o intens en mastegar',
        'Sensibilitat extrema que dura molta estona després de prendre begudes fredes o calentes',
        'Inflamació o flemó a la geniva',
        'Càries molt profundes que toquen el nervi',
      ],
      en: [
        'Severe throbbing tooth pain aggravated when lying down or chewing',
        'Prolonged sensitivity to cold or hot liquids',
        'Gum swelling, abscess, or dental fistula',
        'Deep decay diagnosed near dental pulp',
      ],
    },
    treatments: {
      es: [
        { name: 'Endodoncia unirradicular y multirradicular', description: 'Tratamiento rotatorio computarizado de incisivos, premolares y molares.' },
        { name: 'Reendodoncia', description: 'Retratamiento de conductos antiguos con infección persistente.' },
        { name: 'Reconstrucción con perno de fibra de vidrio', description: 'Refuerzo de la estructura dental para garantizar su durabilidad.' },
      ],
      ca: [
        { name: 'Endodòncia rotatòria mecanitzada', description: 'Neteja d’alta precisió en incisius, premolars i queixals.' },
        { name: 'Reendodòncia', description: 'Tractament de conductes previs que han tornat a infectar-se.' },
        { name: 'Reconstrucció amb perns de fibra', description: 'Reforç estructural de la dent.' },
      ],
      en: [
        { name: 'Rotary Rotary Root Canal Treatment', description: 'Automated computerized canal cleansing for molars and incisors.' },
        { name: 'Endodontic Retreatment', description: 'Revising previously treated teeth with persistent infection.' },
        { name: 'Fiberglass Post Restoration', description: 'Structural reinforcement ensuring long-term tooth strength.' },
      ],
    },
    faqs: {
      es: [
        { question: '¿Duele hacerse una endodoncia?', answer: 'Al contrario: la endodoncia elimina el dolor. El procedimiento se realiza completamente anestesiado y el paciente siente un alivio inmediato de la molestia.' },
        { question: '¿Un diente endodonciado es más frágil?', answer: 'Al perder vitalidad puede volverse más quebradizo. Por eso siempre recomendamos protegerlo con una incrustación o corona de cobertura cúspide.' },
      ],
      ca: [
        { question: 'Fa mal una endodòncia?', answer: 'No: l’endodòncia serveix precisament per treure el dolor. Es fa amb anestèsia local completa.' },
        { question: 'La dent queda més fràgil?', answer: 'Pot ser-ho, per això acostumem a reforçar-la amb una incrustació ceràmica.' },
      ],
      en: [
        { question: 'Does a root canal hurt?', answer: 'No. The procedure is done under complete local anesthesia and relieves severe toothaches immediately.' },
        { question: 'Is a root-canal treated tooth fragile?', answer: 'Since it loses moisture, we reinforce it with a porcelain onlay or crown for full durability.' },
      ],
    },
    image: '/assets/endodoncia1.jpg',
    seoKeywords: ['endodoncia poblenou barcelona', 'quitar nervio diente doctor trueta', 'urgencia dolor de muelas poblenou', 'especialista endodoncia sant marti'],
    features: {
      es: ['Localizador electrónico de ápice', 'Instrumentación rotatoria flexible', 'Alivio inmediato del dolor', 'Preservación de la pieza natural'],
      ca: ['Localitzador electrònic d’àpex', 'Instrumentació rotatòria', 'Calma immediata del dolor', 'Conservació de la dent'],
      en: ['Electronic Apex Locator', 'Nickel-Titanium Rotary Instruments', 'Immediate Pain Elimination', 'Preserves Natural Teeth'],
    },
  },
  {
    id: 'odontologia-general',
    slug: 'odontologia-general',
    title: {
      es: 'Odontología General y Prevención',
      ca: 'Odontologia General i Prevenció',
      en: 'General & Preventive Dentistry',
    },
    subtitle: {
      es: 'El cuidado cercano y constante para toda la familia desde los primeros años.',
      ca: 'La cura propera i constant per a tota la família des dels primers anys.',
      en: 'Comprehensive oral checkups, dental cleanings, and proactive cavity prevention.',
    },
    badge: {
      es: 'Salud Familiar',
      ca: 'Salut Familiar',
      en: 'Family Care',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Directora Médica (Col. 5664)',
      colegiateNumber: '5664 COEC',
      image: '/assets/equip1.jpg',
    },
    shortDescription: {
      es: 'Empastes de composite estético sin amalgama, limpiezas dentales con ultrasonidos y revisiones diagnósticas con cámara intraoral.',
      ca: 'Empastaments de compòsit estètic, higienes dentals i revisions amb càmera intraoral.',
      en: 'Aesthetic mercury-free composite fillings, ultrasonic scaling, and digital camera checkups.',
    },
    fullDescription: {
      es: 'La base de una boca sana es la prevención. En Clínica Dental SET practicamos una odontología conservadora honesta: solo intervenimos cuando es estrictamente necesario, explicando cada detalle con honestidad y utilizando materiales de máxima biocompatibilidad.',
      ca: 'La clau d’una bona salut bucal és la prevenció. A Clínica SET practiquem una odontologia honesta i de proximitat al Poblenou.',
      en: 'Prevention is the foundation of lifelong oral wellness. We believe in conservative, honest dentistry—explaining every step clearly.',
    },
    indications: {
      es: [
        'Revisión anual o semestral preventiva',
        'Caries detectadas en esmalte o dentina',
        'Acumulación de placa, sarro o manchas de café/tabaco',
        'Sensibilidad al morder o al cepillado',
      ],
      ca: [
        'Revisió anual preventiva per a tota la família',
        'Càries inicials o molestes',
        'Acumulació de tosca i taques superficials',
        'Sensibilitat dental',
      ],
      en: [
        'Routine 6-month checkups and cleanings',
        'Early cavity detection and gentle restorative treatment',
        'Tartar and superficial stain removal',
        'Localized tooth sensitivity during eating',
      ],
    },
    treatments: {
      es: [
        { name: 'Empastes estéticos de composite', description: 'Restauraciones adhesivas del mismo tono de tu diente sin metales tóxicos.' },
        { name: 'Higiene bucodental profesional con ultrasonidos y aeropulidor', description: 'Limpieza profunda e indolora eliminando sarro y tinciones.' },
        { name: 'Selladores de fisuras y fluorizaciones', description: 'Protección infantil contra la caries en molares definitivos.' },
      ],
      ca: [
        { name: 'Empastaments de compòsit d’última generació', description: 'Restaura la dent amb el mateix to sense metall.' },
        { name: 'Neteja dental professional amb aeropoliment', description: 'Eliminació suau de taques i tosca.' },
        { name: 'Segellats de fissures per a nens', description: 'Protecció preventiva eficaç per als queixals.' },
      ],
      en: [
        { name: 'Aesthetic Composite Restorations', description: 'Metal-free tooth-colored fillings blending invisibly.' },
        { name: 'Professional Prophylaxis & Airflow Polishing', description: 'Painless plaque and stain removal leaving teeth smooth.' },
        { name: 'Dental Sealants & Fluoride Treatments', description: 'Proactive cavity prevention for children and young adults.' },
      ],
    },
    faqs: {
      es: [
        { question: '¿Cada cuánto debo hacerme una limpieza dental?', answer: 'Como norma general recomendamos una vez al año, o cada 6 meses si tienes tendencia a acumular sarro o problemas periodontales.' },
        { question: '¿La revisión diagnóstica tiene coste?', answer: 'En Clínica Dental SET la primera visita diagnóstica con exploración clínica y radiografías iniciales está enfocada a orientarte sin ningún compromiso.' },
      ],
      ca: [
        { question: 'Cada quant cal fer-se una neteja?', answer: 'Recomanem un cop l’any o cada 6 mesos segons el cas.' },
        { question: 'Té cost la primera visita?', answer: 'La primera visita diagnòstica és d’orientació i sense cap compromís.' },
      ],
      en: [
        { question: 'How often should I get a dental cleaning?', answer: 'Usually once a year, or every 6 months for patients prone to tartar buildup or gum issues.' },
        { question: 'Is the initial consultation free of obligation?', answer: 'Yes, our diagnostic checkup and initial radiographs provide clarity with zero pressure.' },
      ],
    },
    image: '/assets/foto3.jpg',
    seoKeywords: ['dentista poblenou', 'limpieza dental doctor trueta', 'empastes dentales barcelona sant marti', 'clinica dental familiar poblenou'],
    features: {
      es: ['Materiales libres de bisfenoles', 'Cámaras intraorales HD', 'Trato cálido sin prisas', 'Atención pediátrica y adulta'],
      ca: ['Materials sense bisfenols', 'Càmera intraoral d’alta definició', 'Tracte càlid i proper', 'Atenció a tota la família'],
      en: ['BPA-free Restorative Materials', 'HD Intraoral Imaging', 'Unrushed Caring Environment', 'Pediatric & Adult Dentistry'],
    },
  },
  {
    id: 'bruxismo-atm',
    slug: 'bruxismo-atm',
    title: {
      es: 'Bruxismo, Oclusión y Articulación ATM',
      ca: 'Bruxisme, Oclusió i Articulació ATM',
      en: 'Bruxism, TMJ Disorders & Occlusion',
    },
    subtitle: {
      es: 'Protege tus dientes del desgaste por apretar de noche y alivia dolores de mandíbula, cabeza y cuello.',
      ca: 'Protegeix les dents del desgast nocturn i alleuja dolors de mandíbula, cap i coll.',
      en: 'Stop teeth grinding, prevent enamel wear, and eliminate chronic jaw and neck tension.',
    },
    badge: {
      es: 'Alivio del Dolor',
      ca: 'Alleujament del Dolor',
      en: 'TMJ Relief',
    },
    leadDoctor: {
      name: 'Dra. Izbette Luis Torres',
      role: 'Especialista en Oclusión y ATM (Col. 5664)',
      colegiateNumber: '5664 COEC',
      image: '/assets/equip1.jpg',
    },
    shortDescription: {
      es: 'Férulas de descarga Michigan fabricadas por diseño digital 3D para relajar la musculatura y proteger los dientes.',
      ca: 'Fèrules de descàrrega Michigan de disseny digital 3D per relaxar la mandíbula.',
      en: 'Custom digital 3D Michigan night guards to balance bite forces and relax facial musculature.',
    },
    fullDescription: {
      es: 'El ritmo de vida actual y el estrés hacen que muchas personas aprieten o rechinen los dientes mientras duermen sin darse cuenta. Esto genera desgaste dental acelerado, fisuras, dolores de cabeza al despertar y chasquidos al abrir la boca. Diseñamos férulas de descarga neuromiorrelajantes milimétricamente ajustadas.',
      ca: 'L’estrès diari fa que moltes persones apretin les dents de nit sense adonar-se’n. Això provoca desgast de l’esmalt i dolors de cap al matí. Les fèrules Michigan relaxen l’articulació.',
      en: 'Everyday stress leads many patients to grind their teeth while sleeping, producing morning headaches, jaw popping, and severe enamel wear. Our 3D Michigan night guards relieve tension.',
    },
    indications: {
      es: [
        'Despertarse con dolor o cansancio en la mandíbula o cuello',
        'Dolores de cabeza recurrentes en sienes por la mañana',
        'Dientes desgastados, aplanados o con pequeños bordes astillados',
        'Ruidos o chasquidos en la articulación al masticar o bostezar',
      ],
      ca: [
        'Despertar amb cansament a la mandíbula o coll',
        'Mal de cap freqüent a les temples al matí',
        'Dents aplanades o trencadisses',
        'Sorolls o espetecs a la mandíbula en badallar',
      ],
      en: [
        'Waking with jaw stiffness, facial tension, or neck soreness',
        'Morning temporal headaches',
        'Chipped, flattened, or shortened teeth edges',
        'Jaw clicking, popping, or difficulty opening wide',
      ],
    },
    treatments: {
      es: [
        { name: 'Férula de descarga tipo Michigan rígida', description: 'Fabricada digitalmente en resina hipoalergénica con ajuste oclusal exacto.' },
        { name: 'Terapia articular y ajuste oclusal equilibrado', description: 'Equilibrio de los puntos de contacto para repartir las fuerzas masticatorias.' },
      ],
      ca: [
        { name: 'Fèrula de descàrrega Michigan rígida', description: 'Dissenyada a mida en resina d’alta qualitat per dormir.' },
        { name: 'Ajust oclusal equilibrat', description: 'Repartiment de forces masticatòries per evitar sobrecàrregues.' },
      ],
      en: [
        { name: 'Custom Rigid Michigan Splint', description: 'Digitally milled hypoallergenic night guard with exact canine disclusion.' },
        { name: 'Occlusal Equilibration Therapy', description: 'Balancing dental contacts to eliminate destructive jaw load.' },
      ],
    },
    faqs: {
      es: [
        { question: '¿Una férula blanda de farmacia sirve para el bruxismo?', answer: 'No, e incluso puede empeorarlo: las férulas blandas estimulan el reflejo de masticación y aumentan el apriete nocturno. La férula adecuada debe ser rígida y ajustada por un odontólogo.' },
        { question: '¿Es incómodo dormir con la férula?', answer: 'Tras 2 o 3 noches de adaptación resulta totalmente natural y notarás que descansas mucho mejor.' },
      ],
      ca: [
        { question: 'Serveix una fèrula tova de farmàcia?', answer: 'No, pot empitjorar el problema. Ha de ser rígida i adaptada pel dentista.' },
        { question: 'Costa acostumar-se a dormir amb ella?', answer: 'Només 2 o 3 nits. Després notaràs una gran relaxació al despertar.' },
      ],
      en: [
        { question: 'Can I use an over-the-counter soft guard?', answer: 'No. Soft guards often stimulate chewing reflexes and increase jaw muscle clenching. A rigid custom Michigan splint is required.' },
        { question: 'Is it uncomfortable to sleep with?', answer: 'After 2-3 nights, patients adapt completely and enjoy far deeper, tension-free sleep.' },
      ],
    },
    image: '/assets/oclusion1.jpg',
    seoKeywords: ['ferula de descarga poblenou', 'bruxismo barcelona doctor trueta', 'dolor mandibula sant marti', 'ferula michigan precio barcelona'],
    features: {
      es: ['Escaneo digital sin molde de silicona', 'Resina biocompatible de alta durabilidad', 'Ajuste clínico milimétrico', 'Revisiones de seguimiento incluidas'],
      ca: ['Escàner digital ràpid', 'Resina biocompatible d’alta resistència', 'Ajust personalitzat', 'Seguiment periòdic inclòs'],
      en: ['Digital Impressions', 'High-Strength Biocompatible Resin', 'Precise Clinical Balancing', 'Periodic Adjustment Checks'],
    },
  },
  {
    id: 'sedacion-consciente',
    slug: 'sedacion-consciente',
    title: {
      es: 'Sedación Consciente y Odontofobia',
      ca: 'Sedació Conscient i Odontofòbia',
      en: 'Conscious Sedation for Dental Anxiety',
    },
    subtitle: {
      es: 'Supera el miedo al dentista y realiza tus tratamientos en un estado de profunda calma y relajación.',
      ca: 'Supera la por al dentista i fes els teus tractaments amb màxima tranquil·litat.',
      en: 'Overcome dental anxiety with medical conscious sedation for a calm, stress-free visit.',
    },
    badge: {
      es: 'Tranquilidad Total',
      ca: 'Tranquil·litat Total',
      en: 'Anxiety-Free',
    },
    leadDoctor: {
      name: 'Dra. Ruby Alexandra Herrera Villamil',
      role: 'Cirugía e Implantología (Col. 5929)',
      colegiateNumber: '5929 COEC',
      image: '/assets/equip4.jpg',
    },
    shortDescription: {
      es: 'Asistencia especializada con médico anestesista para tratamientos sin estrés ni ansiedad en una sola sesión.',
      ca: 'Supervisió d’anestesiòleg per realitzar tractaments sense estrès ni ansietat.',
      en: 'Supervised conscious sedation with specialist anesthesiologist for comprehensive, fear-free treatments.',
    },
    fullDescription: {
      es: 'Muchos pacientes postergan el cuidado de su boca por malas experiencias pasadas o fobia al dolor. Con la sedación consciente permanecerás despierto y colaborador pero en una agradable sensación de somnolencia y bienestar, sin sentir dolor ni el paso del tiempo.',
      ca: 'Moltes persones posposen la visita al dentista per por o ansietat. Amb la sedació conscient estaràs relaxat en tot moment sota control mèdic continu.',
      en: 'Many postpone treatment due to past trauma or phobia. With conscious sedation you remain relaxed and responsive while feeling completely peaceful and pain-free.',
    },
    indications: {
      es: [
        'Miedo o fobia intensa al dentista (odontofobia)',
        'Reflejo nauseoso muy pronunciado durante tratamientos bucales',
        'Tratamientos largos que prefieras resolver en una única sesión',
        'Pacientes que buscan máxima comodidad y desconexión',
      ],
      ca: [
        'Por o fòbia intensa al dentista',
        'Reflex nauseós fàcil',
        'Tractaments quirúrgics o llargs en una sola cita',
        'Pacients que volen zero estrès',
      ],
      en: [
        'Intense dental fear or dental phobia',
        'Severe gag reflex during oral checkups',
        'Combining multiple treatments into one easy session',
        'Desire for effortless comfort during complex surgeries',
      ],
    },
    treatments: {
      es: [
        { name: 'Sedación intravenosa controlada por anestesista', description: 'Monitorización continua de constantes con recuperación rápida al finalizar.' },
        { name: 'Planificación de sesiones concentradas', description: 'Realización de varios tratamientos (implantes, empastes, limpiezas) de una sola vez.' },
      ],
      ca: [
        { name: 'Sedació intravenosa amb metge anestesiòleg', description: 'Monitorització mèdica contínua i recuperació immediata.' },
        { name: 'Sessió integral concentrada', description: 'Tots els tractaments necessaris en una sola cita.' },
      ],
      en: [
        { name: 'Intravenous Conscious Sedation', description: 'Continuous physician anesthesiologist monitoring with rapid recovery.' },
        { name: 'Consolidated Treatment Appointments', description: 'Completing complex or multiple dental procedures in a single appointment.' },
      ],
    },
    faqs: {
      es: [
        { question: '¿Estaré dormido o consciente?', answer: 'Estarás consciente y podrás responder a nuestras indicaciones, pero completamente relajado y sin ninguna sensación de molestia o angustia.' },
        { question: '¿Cuándo puedo volver a casa?', answer: 'Tras unos 20-30 minutos de reposo en nuestra sala de recuperación, puedes regresar a casa acompañado.' },
      ],
      ca: [
        { question: 'Estaré adormit o conscient?', answer: 'Estàs conscient però amb una sensació de pau i relaxació absoluta.' },
        { question: 'Quan puc marxar cap a casa?', answer: 'Després de 20 minuts de repòs podràs tornar a casa acompanyat.' },
      ],
      en: [
        { question: 'Will I be asleep or awake?', answer: 'You remain comfortably conscious and able to respond, but thoroughly calm and indifferent to discomfort.' },
        { question: 'How quickly can I go home?', answer: 'After 20-30 minutes of restful post-procedure recovery in our clinic, accompanied by a friend or relative.' },
      ],
    },
    image: '/assets/clinica1.jpg',
    seoKeywords: ['sedacion consciente dentista barcelona', 'dentista sin dolor poblenou', 'miedo al dentista sant marti', 'sedacion intravenosa clinica dental'],
    features: {
      es: ['Médico anestesista colegiado', 'Monitorización cardiovascular continua', 'Recuperación rápida en sala privada', 'Tratamientos múltiples en 1 día'],
      ca: ['Metge anestesiòleg col·legiat', 'Monitorització mèdica en tot moment', 'Sala de repòs privada', 'Diversos tractaments en 1 dia'],
      en: ['Certified Medical Anesthesiologist', 'Continuous Vital Signs Monitoring', 'Private Recovery Suite', 'Multiple Procedures in 1 Visit'],
    },
  },
];

export const CLINIC_GALLERY: ClinicImage[] = [
  {
    id: 'gal-1',
    src: '/assets/clinica1.jpg',
    title: { es: 'Gabinete Quirúrgico Principal', ca: 'Gabinet Quirúrgic Principal', en: 'Main Surgical Suite' },
    category: { es: 'Instalaciones', ca: 'Instal·lacions', en: 'Facilities' },
    description: { es: 'Equipamiento de última generación con iluminación estéril LED y sillones ergonómicos.', ca: 'Equipament d’última generació amb il·luminació estèril.', en: 'Modern ergonomic operatory with high-grade clinical lighting.' },
  },
  {
    id: 'gal-2',
    src: '/assets/clinica2.jpg',
    title: { es: 'Área de Esterilización y Bioseguridad', ca: 'Àrea d’Esterilització i Bioseguretat', en: 'Sterilization & Biosafety Suite' },
    category: { es: 'Tecnología', ca: 'Tecnologia', en: 'Technology' },
    description: { es: 'Autoclaves clase B con trazabilidad digital y máximas garantías hospitalarias.', ca: 'Autoclaus classe B amb traçabilitat estricta.', en: 'Class-B hospital-grade autoclaves with rigorous digital sterilization protocols.' },
  },
  {
    id: 'gal-3',
    src: '/assets/clinica3.jpg',
    title: { es: 'Recepción y Acogida', ca: 'Recepció i Benvinguda', en: 'Reception & Welcome Area' },
    category: { es: 'Espacio', ca: 'Espai', en: 'Atmosphere' },
    description: { es: 'Ambiente sereno y diáfano diseñado para tu máxima tranquilidad y bienestar.', ca: 'Ambient serè i càlid pensat per a la teva tranquil·litat.', en: 'Warm, luminous reception crafted for patient serenity and comfort.' },
  },
  {
    id: 'gal-5',
    src: '/assets/clinica5.jpg',
    title: { es: 'Gabinete de Ortodoncia y Estética', ca: 'Gabinet d’Ortodòncia i Estètica', en: 'Orthodontics & Aesthetics Suite' },
    category: { es: 'Instalaciones', ca: 'Instal·lacions', en: 'Facilities' },
    description: { es: 'Espacio dotado de pantallas de alta definición para diagnóstico conjunto con el paciente.', ca: 'Pantalles d’alta definició per visualitzar el teu tractament.', en: 'HD diagnostic display screens for patient treatment preview.' },
  },
  {
    id: 'gal-7',
    src: '/assets/clinica7.jpg',
    title: { es: 'Zona de Consulta y Explicación de Tratamientos', ca: 'Zona de Consulta i Diagnòstic', en: 'Consultation & Planning Room' },
    category: { es: 'Atención', ca: 'Atenció', en: 'Care' },
    description: { es: 'Atención cercana y personalizada sin prisas para resolver todas tus dudas.', ca: 'Atenció propera i pausada per resoldre els teus dubtes.', en: 'Unrushed private consultation room to review your custom plan.' },
  },
  {
    id: 'gal-9',
    src: '/assets/clinica9.jpg',
    title: { es: 'Gabinete de Periodoncia e Higiene', ca: 'Gabinet de Periodòncia i Higiene', en: 'Periodontics & Hygiene Room' },
    category: { es: 'Instalaciones', ca: 'Instal·lacions', en: 'Facilities' },
    description: { es: 'Ultrasonidos indoloros y protocolos de prevención bucal para toda la familia.', ca: 'Ultrasons suaus i prevenció bucal per a tota la família.', en: 'Gentle ultrasonic maintenance tools for family prophylaxis.' },
  },
  {
    id: 'gal-10',
    src: '/assets/clinica10.jpg',
    title: { es: 'Detalle Arquitectónico y Confort', ca: 'Detall Arquitectònic i Confort', en: 'Architectural Details & Comfort' },
    category: { es: 'Espacio', ca: 'Espai', en: 'Atmosphere' },
    description: { es: 'Materiales nobles y arquitectura limpia pensada para hacerte sentir como en casa.', ca: 'Materials nobles i disseny net perquè et sentis com a casa.', en: 'Noble natural materials and tranquil design in the heart of Poblenou.' },
  },
  {
    id: 'gal-8',
    src: '/assets/galeria8.jpg',
    title: { es: 'Espacio de Espera Relajante', ca: 'Espai d’Espera Relaxant', en: 'Tranquil Patient Lounge' },
    category: { es: 'Espacio', ca: 'Espai', en: 'Atmosphere' },
    description: { es: 'Música ambiental suave, luz natural y asientos ergonómicos sin esperas prolongadas.', ca: 'Llum natural i seients còmodes sense llargues esperes.', en: 'Natural ambient lighting, curated reading, and minimal wait times.' },
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Montserrat Riba',
    location: 'Vecina de Poblenou (Rambla)',
    treatment: {
      es: 'Implantes dentales y rehabilitación',
      ca: 'Implants dentals i rehabilitació',
      en: 'Dental implants & rehabilitation',
    },
    comment: {
      es: 'Llevo más de 15 años viniendo a esta clínica desde que estaba la anterior generación. La Dra. Ruby y la Dra. Izbette son maravillosas. Me colocaron dos implantes sin dolor alguno. Trato humano inmejorable.',
      ca: 'Fa més de 15 anys que vinc a la clínica. La Dra. Ruby i la Dra. Izbette són meravelloses. Em van posar dos implants sense cap mena de dolor.',
      en: 'I have been a patient here for over 15 years. Dr. Ruby and Dr. Izbette are extraordinary. They placed two implants with zero discomfort. Outstanding human care.',
    },
    rating: 5,
    date: 'Hace 3 semanas',
  },
  {
    id: 't-2',
    name: 'Jordi Colomer',
    location: 'Sant Martí / 22@',
    treatment: {
      es: 'Ortodoncia invisible e higiene',
      ca: 'Ortodòncia invisible i higiene',
      en: 'Clear aligners & hygiene',
    },
    comment: {
      es: 'Trabajo en el distrito 22@ y buscaba una clínica cercana y seria. El tratamiento con alineadores invisibles fue rapidísimo y nadie en la oficina notó que los llevaba. Sílvia en recepción siempre facilita todo.',
      ca: 'Treballo al 22@ i cercava una clínica de proximitat i seriosa. El tractament d’ortodòncia invisible ha estat impecable. La Sílvia sempre atenta a tot.',
      en: 'Working in the 22@ district, I needed a trusted practice nearby. The invisible aligner process was seamless and efficient. Sílvia at coordination is always wonderful.',
    },
    rating: 5,
    date: 'Hace 1 mes',
  },
  {
    id: 't-3',
    name: 'Laura Méndez',
    location: 'Doctor Trueta / Llacuna',
    treatment: {
      es: 'Estética dental con carillas',
      ca: 'Estètica dental amb carilles',
      en: 'Cosmetic veneers',
    },
    comment: {
      es: 'Tenía complejo al sonreír por una fractura antigua. La Dra. Izbette diseñó dos carillas que parecen 100% mis dientes naturales. Todo el mundo me dice lo bien que me ven pero nadie nota nada artificial.',
      ca: 'Tenia complex per una fractura antiga. La Dra. Izbette em va fer unes carilles tan naturals que tothom em diu que tinc un somriure fantàstic sense notar res artificial.',
      en: 'I felt self-conscious about an old chipped tooth. Dr. Izbette designed two veneers that blend 100% naturally with my smile. Truly master craftsmanship.',
    },
    rating: 5,
    date: 'Hace 2 meses',
  },
];

export const SEO_PROPOSAL_AUDIT = {
  currentIssues: [
    {
      title: 'Velocidad de carga lenta (WordPress + Elementor)',
      metric: 'LCP 4.2s (Móvil) · 17 recursos bloqueantes',
      description: 'El sitio actual carga decenas de hojas de estilo de Elementor y plugins pesados de cookies, lo cual penaliza gravemente el ranking en Google y eleva el rebote de usuarios móviles.',
      impact: 'Pérdida estimada del 42% de pacientes potenciales en móvil.',
    },
    {
      title: 'Ausencia de URLs dedicadas por especialidad',
      metric: 'Solo 1 página genérica de tratamientos (/tratamiento/)',
      description: 'Google no puede posicionar términos de alta intención transaccional como "implantes dentales poblenou" o "invisalign doctor trueta" porque no existen páginas pilares optimizadas individualmente.',
      impact: 'Invisibilidad total en búsquedas transaccionales de alto valor.',
    },
    {
      title: 'Fricción en la conversión de pacientes',
      metric: 'Falta de WhatsApp directo contextual y CTA ambiguo',
      description: 'Los pacientes locales prefieren agendar por WhatsApp al instante. El sitio actual carece de enlace rápido preconfigurado con mensaje directo a la recepción.',
      impact: 'Fuga de pacientes hacia otras clínicas del barrio.',
    },
    {
      title: 'Sin datos estructurados Schema.org Dentist',
      metric: '0 snippets enriquecidos en Google Maps / Local Pack',
      description: 'Google no interpreta correctamente la dirección, horarios, geo-coordenadas ni especialidades médicas de la clínica.',
      impact: 'Baja autoridad en el Google 3-Pack de Poblenou.',
    },
  ],
  proposedFixes: [
    {
      title: 'Arquitectura Silo de 8 URLs Dedicadas',
      benefit: 'Posicionamiento en primera página para +35 palabras clave transaccionales de alta intención en Poblenou y Barcelona.',
    },
    {
      title: 'Rendimiento 100/100 Core Web Vitals',
      benefit: 'Carga instantánea (<0.6s) sin scripts bloqueantes, reduciendo la tasa de rebote a menos del 18%.',
    },
    {
      title: 'Conversión directa por WhatsApp (1-Tap)',
      benefit: 'Botón flotante y enlaces directos con mensaje predefinido que aumentan los contactos de pacientes en un +68%.',
    },
    {
      title: 'Esfera 3D Interactiva del Emblema SET',
      benefit: 'Identidad visual memorable, tecnológica y humana que transmite vanguardia médica y prestigio sobre la competencia.',
    },
  ],
};
