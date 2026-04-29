export const personal = {
  name: "Luciana Vanelli",
  role: "Desarrolladora Frontend",
  email: "lucianavanelli13@gmail.com",
  phone: "(54) 3402-533651",
  location: "Arroyo Seco, Santa Fe — AR",
  linkedin: "https://www.linkedin.com/in/luciana-vanelli/",
  github: "https://github.com/luchivanelli",
  cvUrl: "/cv.pdf",
  photoUrl: "/foto.jpg",
  headline: "Construyendo interfaces digitales.",
  bio: [
    "Soy desarrolladora Frontend, enfocada en crear interfaces modernas, funcionales y mantenibles. Me interesa resolver problemas técnicos de forma práctica y construir soluciones eficientes, priorizando código limpio, buenas prácticas y escalabilidad.",
    "Me gusta seguir aprendiendo constantemente para incorporar nuevas herramientas y fortalecer mi perfil profesional.",
    "Estudié Ingeniería en Sistemas de Información en la Universidad Tecnológica Nacional de Rosario durante 2 años, y desde entonces no paré de aprender y construir.",
  ],
};

export const stats = [
  { value: "+ 2", label: "años de experiencia" },
  { value: "+ 6", label: "proyectos en producción" },
  { value: "+ 10", label: "tecnologías dominadas" },
];

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

export const projects = [
  {
    title: "SplitIT",
    description: {
      es: "Aplicación para calcular automáticamente la división de gastos entre grupos. Gestión de deudas y pagos en tiempo real.",
      en: "Application to automatically split expenses across groups, with real-time debt and payment tracking.",
    },
    image: "/splitit.png",
    liveUrl: "https://split-it-app.vercel.app/",
    codeUrl: "https://github.com/luchivanelli/splitit",
    tags: ["Next.js", "Redux Toolkit", "Tailwind", "GSAP"],
  },
  {
    title: "LapTech Ecommerce",
    description: {
      es: "E-commerce completo con carrito de compras persistente, simulación de pagos y panel de administración intuitivo.",
      en: "Full e-commerce with persistent cart, payment simulation, and intuitive admin panel.",
    },
    image: "/ecommerce.png",
    liveUrl: "https://laptech-ecommerce.vercel.app/",
    codeUrl: "https://github.com/luchivanelli/ecommerce",
    tags: ["Next.js", "React Hook Form", "Zod", "Tailwind"],
  },
  {
    title: "Reportes — El Pájaro",
    description: {
      es: "Sistema para gestionar registros diarios de reportes. Stack fullstack con autenticación.",
      en: "System to manage daily report entries with a fullstack authenticated architecture.",
    },
    image: "/reportes.png",
    liveUrl: "https://reportes-elpajaro.vercel.app/",
    codeUrl: "https://github.com/luchivanelli/reportes-elpajaro",
    tags: ["React", "RTK Query", "Node/Express", "MySQL"],
    note: "demo / 123456",
  },
  {
    title: "Arroyo Seco es de Boca",
    description: {
      es: "Sitio web institucional para centralizar información de la institución. Diseño moderno con animaciones GSAP.",
      en: "Institutional website to centralize club information, with a modern design and GSAP animations.",
    },
    image: "/boca.png",
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
  { flag: "🇦🇷", name: "Español", level: "Nativo" },
  { flag: "🇺🇸", name: "Inglés", level: "Básico (A2)" },
];

export const marqueeItems = [
  "HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js",
  "Svelte", "Tailwind CSS", "Redux Toolkit", "Node.js", "Express", "MySQL", "Prisma",
];
