/**
 * Single source of truth for all portfolio content.
 * UI strings (buttons, section labels) live in ./i18n.ts.
 */

export type Localized = { es: string; en: string };
export type LocalizedList = { es: string[]; en: string[] };

export const site = {
  url: "https://portfolio-lvanelli.vercel.app",
  description: {
    es: "Desarrolladora Frontend especializada en crear experiencias web fluidas y escalables. React, Next.js, Tailwind CSS, GSAP.",
    en: "Frontend Developer specialized in building smooth, scalable web experiences. React, Next.js, Tailwind CSS, GSAP.",
  } satisfies Localized,
};

export const personal = {
  name: "Luciana Vanelli",
  role: "Desarrolladora Frontend",
  email: "lucianavanelli13@gmail.com",
  phone: "(54) 3402-533651",
  location: "Arroyo Seco, Santa Fe — AR",
  linkedin: "https://www.linkedin.com/in/luciana-vanelli/",
  github: "https://github.com/luchivanelli",
  cvUrl: "/cv.pdf",
  photoUrl: "/foto.webp",
  headline: "Construyendo interfaces digitales.",
  bio: {
    es: [
      "Soy desarrolladora Frontend, enfocada en crear interfaces modernas, funcionales y mantenibles. Me interesa resolver problemas técnicos de forma práctica y construir soluciones eficientes, priorizando código limpio, buenas prácticas y escalabilidad.",
      "Me gusta seguir aprendiendo constantemente para incorporar nuevas herramientas y fortalecer mi perfil profesional.",
      "Estudié Ingeniería en Sistemas de Información en la Universidad Tecnológica Nacional de Rosario durante 2 años, y desde entonces no paré de aprender y construir.",
    ],
    en: [
      "I am a Frontend developer who focuses on building modern, functional, and maintainable interfaces. I enjoy solving technical problems practically and creating efficient solutions while prioritizing clean code, best practices, and scalability.",
      "I like to keep learning constantly to add new tools and strengthen my professional profile.",
      "I studied Information Systems Engineering at the National Technological University of Rosario for two years, and since then I haven't stopped learning and building.",
    ],
  } satisfies LocalizedList,
};

export const stats = [
  { value: "+ 2", label: { es: "años de experiencia", en: "years of experience" } },
  { value: "+ 6", label: { es: "proyectos en producción", en: "production projects" } },
  { value: "+ 10", label: { es: "tecnologías dominadas", en: "technologies mastered" } },
] satisfies { value: string; label: Localized }[];

/** Page sections in display order. `navKey` maps to translations.nav. */
export const sections = [
  { id: "inicio", navKey: null },
  { id: "experiencia", navKey: "experiencia" },
  { id: "proyectos", navKey: "proyectos" },
  { id: "stack", navKey: "stack" },
  { id: "sobre-mi", navKey: "sobreMi" },
  { id: "contacto", navKey: "contacto" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

export const experience = [
  {
    company: "Infinimedia Inc",
    location: {
      es: "Remoto",
      en: "Remote",
    },
    role: {
      es: "Desarrolladora Frontend",
      en: "Frontend Developer",
    },
    period: {
      es: "Julio 2024 — Actualidad",
      en: "July 2024 — Present",
    },
    current: true,
    bullets: {
      es: [
        "Desarrollo y mantenimiento de interfaces escalables.",
        "Implementación de funcionalidades con jQuery.",
        "Estilado responsive de alta precisión con Tailwind CSS.",
        "Mejora de experiencia de usuario.",
      ],
      en: [
        "Developed and maintained scalable user interfaces.",
        "Implemented jQuery-driven features.",
        "Built pixel-perfect responsive styles with Tailwind CSS.",
        "Improved user experience across web flows.",
      ],
    },
  },
  {
    company: "Daira IT Group",
    location: {
      es: "Remoto",
      en: "Remote",
    },
    role: {
      es: "Desarrolladora Frontend",
      en: "Frontend Developer",
    },
    period: {
      es: "Febrero 2024 — Julio 2024",
      en: "February 2024 — July 2024",
    },
    current: false,
    bullets: {
      es: [
        "Desarrollo colaborativo de aplicaciones web complejas.",
        "Uso intensivo de Svelte y Tailwind CSS para interfaces reactivas.",
        "Trabajo bajo metodología ágil Scrum con organización en Trello.",
      ],
      en: [
        "Collaborative development of complex web applications.",
        "Built reactive interfaces using Svelte and Tailwind CSS.",
        "Worked in agile Scrum teams using Trello.",
      ],
    },
  },
  {
    company: "Inkua",
    location: {
      es: "Remoto",
      en: "Remote",
    },
    role: {
      es: "Desarrolladora web junior (Prácticas)",
      en: "Junior Web Developer (Internship)",
    },
    period: {
      es: "Septiembre 2022 — Marzo 2023",
      en: "September 2022 — March 2023",
    },
    current: false,
    bullets: {
      es: [
        "Maquetación y desarrollo de sitios web institucionales.",
        "Fundamentos sólidos de HTML, CSS y JavaScript moderno.",
        "Participación en proyectos colaborativos con equipos multidisciplinarios.",
      ],
      en: [
        "Created and developed institutional websites.",
        "Applied strong HTML, CSS, and modern JavaScript fundamentals.",
        "Collaborated with multidisciplinary project teams.",
      ],
    },
  },
];

export type Project = {
  title: string;
  description: Localized;
  image: string;
  liveUrl: string;
  codeUrl: string;
  tags: string[];
  note?: string;
};

export const projects: Project[] = [
  {
    title: "Reportes — El Pájaro",
    description: {
      es: "Sistema para gestionar registros diarios de reportes. Stack fullstack con autenticación.",
      en: "System to manage daily report entries with a fullstack authenticated architecture.",
    },
    image: "/reportes-v2.webp",
    liveUrl: "https://reportes-elpajaro-v2.vercel.app/",
    codeUrl: "https://github.com/luchivanelli/reportes-elpajaro-v2",
    tags: ["Next.js", "Server Actions", "Prisma", "NeonDB", "Tailwind"],
    note: "demo / demo1234",
  },
  {
    title: "SplitIT",
    description: {
      es: "Aplicación para calcular automáticamente la división de gastos entre grupos. Gestión de deudas y pagos en tiempo real.",
      en: "Application to automatically split expenses across groups, with real-time debt and payment tracking.",
    },
    image: "/splitit.webp",
    liveUrl: "https://split-it-app.vercel.app/",
    codeUrl: "https://github.com/luchivanelli/splitit",
    tags: ["Next.js", "Redux Toolkit", "Tailwind", "GSAP"],
  },
  {
    title: "MedCare",
    description: {
      es: "Sistema de reservas de turnos médicos online — selección de especialidades, profesionales y disponibilidad en tiempo real",
      en: "Online medical appointment booking system — selection of specialties, professionals, and real-time availability.",
    },
    image: "/medcare-v2.webp",
    liveUrl: "https://medcare-systems.vercel.app/",
    codeUrl: "https://github.com/luchivanelli/sistema-reservas",
    tags: ["Next.js", "TypeScript", "Tailwind", "PostgreSQL", "Prisma"],
  },
  {
    title: "LapTech Ecommerce",
    description: {
      es: "E-commerce completo con carrito de compras persistente, simulación de pagos y panel de administración intuitivo.",
      en: "Full e-commerce with persistent cart, payment simulation, and intuitive admin panel.",
    },
    image: "/ecommerce-v2.webp",
    liveUrl: "https://laptech-ecommerce.vercel.app/",
    codeUrl: "https://github.com/luchivanelli/ecommerce",
    tags: ["Next.js", "React Hook Form", "Zod", "Tailwind"],
  },
  {
    title: "Facturación — El Pájaro",
    description: {
      es: "Sistema de facturación para taller mecánico — generación de facturas en PDF.",
      en: "Billing system for auto repair shop — PDF invoice generation.",
    },
    image: "/facturacion.webp",
    liveUrl: "https://facturacion-elpajaro.vercel.app/",
    codeUrl: "https://github.com/luchivanelli/facturacion-elpajaro",
    tags: ["React", "Redux Toolkit", "jspdf-autotable", "Tailwind"],
  },
  {
    title: "Arroyo Seco es de Boca",
    description: {
      es: "Sitio web institucional para centralizar información de la institución. Diseño moderno con animaciones GSAP.",
      en: "Institutional website to centralize club information, with a modern design and GSAP animations.",
    },
    image: "/boca.webp",
    liveUrl: "https://arroyosecoesdeboca.vercel.app/",
    codeUrl: "https://github.com/luchivanelli/sede-boca",
    tags: ["Next.js", "TypeScript", "Tailwind", "GSAP"],
  },
];

export const stack = {
  Frontend: [
    "HTML", "CSS", "JavaScript", "TypeScript", "jQuery",
    "React", "Svelte", "Next.js", "Tailwind CSS", "Redux Toolkit", "GSAP",
  ],
  Backend: ["Node.js", "Express"],
  "Bases de datos & Tools": ["MySQL", "Prisma", "Git", "GitHub", "Trello"],
};

export type StackCategory = keyof typeof stack;

export const education = {
  es: {
    degree: "Ingeniería en Sistemas de Información",
    institution: "Universidad Tecnológica Nacional",
    location: "Rosario, Santa Fe",
    period: "2019 — 2021",
  },
  en: {
    degree: "Information Systems Engineering",
    institution: "National Technological University",
    location: "Rosario, Santa Fe",
    period: "2019 — 2021",
  },
};

export const languages = [
  { flag: "🇦🇷", name: { es: "Español", en: "Spanish" }, level: { es: "Nativo", en: "Native" } },
  { flag: "🇺🇸", name: { es: "Inglés", en: "English" }, level: { es: "Básico (A2)", en: "Basic (A2)" } },
] satisfies { flag: string; name: Localized; level: Localized }[];

export const marqueeItems = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
  "Svelte", "Tailwind CSS", "Redux Toolkit", "Node.js", "Express", "MySQL", "Prisma",
];
