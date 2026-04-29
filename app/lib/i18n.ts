export type Language = "es" | "en";

export const translations = {
  es: {
    nav: {
      experiencia: "Experiencia",
      proyectos: "Proyectos",
      stack: "Stack",
      sobreMi: "Sobre mí",
      contacto: "Contacto",
    },
    buttons: {
      downloadCV: "Descargar CV",
      viewProjects: "Ver proyectos",
      talk: "Hablemos",
      email: "Enviar email",
      linkedin: "LinkedIn",
      github: "GitHub",
      live: "Ver",
      code: "Código",
    },
    hero: {
      tag: "Desarrolladora Frontend",
      titleLines: ["Construyendo", "interfaces digitales"],
      subtitle: "Especializada en crear experiencias web fluidas con un enfoque meticuloso en el detalle y el rendimiento.",
      phrases: ["de alto impacto", "rápidas y escalables", "modernas y eficientes"],
    },
    stats: ["años de experiencia", "proyectos en producción", "tecnologías dominadas"],
    about: {
      sectionLabel: "// sobre mí",
      title: "Hola, soy Luciana",
      bio: [
        "Soy desarrolladora Frontend, enfocada en crear interfaces modernas, funcionales y mantenibles. Me interesa resolver problemas técnicos de forma práctica y construir soluciones eficientes, priorizando código limpio, buenas prácticas y escalabilidad.",
        "Me gusta seguir aprendiendo constantemente para incorporar nuevas herramientas y fortalecer mi perfil profesional.",
        "Estudié Ingeniería en Sistemas de Información en la Universidad Tecnológica Nacional de Rosario durante 2 años, y desde entonces no paré de aprender y construir.",
      ],
      educationLabel: "Educación",
    },
    experience: {
      sectionLabel: "// experiencia",
      title: "Recorrido\nprofesional",
      description: "Desarrollo de aplicaciones web responsivas con tecnologías modernas, implementando lógica de negocio, mejoras de UX y trabajo en equipos ágiles.",
      current: "Actual",
    },
    projects: {
      sectionLabel: "// proyectos",
      title: "Lo que he construido",
    },
    stack: {
      sectionLabel: "// stack tecnológico",
      title: "Con qué trabajo",
      categories: {
        Frontend: "Frontend",
        Backend: "Backend",
        "Bases de datos & Tools": "Bases de datos & Tools",
      },
    },
    contact: {
      sectionLabel: "// contacto",
      title: "¿Hablamos?",
      description: "Estoy disponible para nuevas oportunidades, proyectos freelance o simplemente para charlar sobre tecnología.",
    },
    footer: {
      copy: "© {year} Luciana Vanelli",
    },
  },
  en: {
    nav: {
      experiencia: "Experience",
      proyectos: "Projects",
      stack: "Stack",
      sobreMi: "About",
      contacto: "Contact",
    },
    buttons: {
      downloadCV: "Download CV",
      viewProjects: "View projects",
      talk: "Let's talk",
      email: "Send email",
      linkedin: "LinkedIn",
      github: "GitHub",
      live: "Live",
      code: "Code",
    },
    hero: {
      tag: "Frontend Developer",
      titleLines: ["Building", "digital interfaces"],
      subtitle: "Specialized in creating smooth web experiences with a sharp focus on detail and performance.",
      phrases: ["impactful", "fast and scalable", "modern and efficient"],
    },
    stats: ["years of experience", "production projects", "technologies mastered"],
    about: {
      sectionLabel: "// about",
      title: "Hi, I'm Luciana",
      bio: [
        "I am a Frontend developer who focuses on building modern, functional, and maintainable interfaces. I enjoy solving technical problems practically and creating efficient solutions while prioritizing clean code, best practices, and scalability.",
        "I like to keep learning constantly to add new tools and strengthen my professional profile.",
        "I studied Information Systems Engineering at the National Technological University of Rosario for two years, and since then I haven't stopped learning and building.",
      ],
      educationLabel: "Education",
    },
    experience: {
      sectionLabel: "// experience",
      title: "Professional\njourney",
      description: "Building responsive web applications with modern technologies, implementing business logic, UX improvements, and working in agile teams.",
      current: "Current",
    },
    projects: {
      sectionLabel: "// projects",
      title: "What I have built",
    },
    stack: {
      sectionLabel: "// tech stack",
      title: "What I work with",
      categories: {
        Frontend: "Frontend",
        Backend: "Backend",
        "Bases de datos & Tools": "Databases & Tools",
      },
    },
    contact: {
      sectionLabel: "// contact",
      title: "Want to work together?",
      description: "I'm available for new opportunities, freelance projects, or simply to talk about technology.",
    },
    footer: {
      copy: "© {year} Luciana Vanelli",
    },
  },
} as const;

export type Translation = typeof translations[Language];

export const languageOptions: { code: Language; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];
