// ============================================================
//  FUENTE ÚNICA DE DATOS — Edita este archivo para actualizar
//  el portafolio sin tocar ningún componente JSX.
// ============================================================

export const personal = {
  name: "Rayson Steve Lopez De La Cruz",
  headline: "Arquitectura de Redes y Desarrollo Backend.",
  shortDescription:
    "Estudiante de Tecnologías de la Información orientado al diseño de infraestructuras de red complejas, automatización de procesos y desarrollo de soluciones de software.",
  about:
    "Estudiante de la Universidad de las Fuerzas Armadas (ESPE). Especializado en la convergencia entre la infraestructura tecnológica y el desarrollo backend. Cuento con capacidad técnica para implementar protocolos de enrutamiento avanzados, administrar bases de datos relacionales y aplicar principios de ciberseguridad, priorizando la optimización de recursos y la continuidad del negocio.",
};

export const contact = {
  github: "https://github.com/Rycks-Fullstack",
  linkedin: "https://www.linkedin.com/in/stvrays/",
  email: "stevenl32003@hotmail.com",
};

export const education = [
  {
    institution: "Universidad de las Fuerzas Armadas (ESPE)",
    degree: "Tecnologías de la Información",
    status: "En curso",
    icon: "graduation-cap",
  },
];

export const projects = [
  {
    id: "drp-muchflowers",
    title: "Plan de Recuperación ante Desastres (DRP) — MuchFlowers",
    area: "Gestión de Riesgos y Continuidad de Negocio",
    description:
      "Desarrollo de un DRP integral para la empresa MuchFlowers. El proyecto incluyó la ejecución del mapeo de procesos críticos y el análisis de impacto organizacional (BIA) para asegurar la continuidad del negocio ante incidentes.",
    technologies: ["BIA", "DRP", "Análisis de Riesgos", "Continuidad de Negocio"],
    color: "#00d4ff",
  },
  {
    id: "network-automation",
    title: "Arquitectura y Automatización de Redes",
    area: "Infraestructura y Redes",
    description:
      "Implementación y simulación de topologías de red utilizando protocolos de enrutamiento (OSPF, BGP, RIP) y configuraciones MPLS L3VPN en entornos EVE-NG. Automatización de despliegues y configuración de equipos mediante Ansible.",
    technologies: ["Cisco", "Ansible", "EVE-NG", "OSPF", "BGP", "MPLS L3VPN", "Packet Tracer"],
    color: "#7c3aed",
  },
  {
    id: "backend-databases",
    title: "Sistemas de Bases de Datos Distribuidas y Scraping",
    area: "Desarrollo Backend",
    description:
      "Desarrollo de aplicaciones backend orientadas a la gestión de datos. Incluye la creación de un scraper para la automatización de procesos de matriculación universitaria y el diseño de arquitecturas para bases de datos distribuidas.",
    technologies: ["Python (Flask)", "C# (ASP.NET MVC)", "PostgreSQL", "MariaDB", "SQL Server"],
    color: "#06b6d4",
  },
  {
    id: "security-hardening",
    title: "Auditoría y Hardening de Servidores",
    area: "Ciberseguridad",
    description:
      "Ejecución de auditorías de seguridad en entornos controlados (Hack The Box), análisis de vulnerabilidades, esteganografía y aplicación de estrategias de hardening en servidores basados en contenedores Docker.",
    technologies: ["Kali Linux", "Metasploit", "Nmap", "Hydra", "Docker"],
    color: "#10b981",
  },
];

// ── URL helpers ──────────────────────────────────────────
// DI  → devicon CDN  (cdn.jsdelivr.net/gh/devicons/devicon)
// SI  → simpleicons CDN (cdn.simpleicons.org)
const DI = (name, variant = 'plain') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${name}/${name}-${variant}.svg`;
const SI = (slug, hex) => `https://cdn.simpleicons.org/${slug}/${hex}`;

export const skills = [
  {
    category: "Redes e Infraestructura",
    icon: "network",
    items: [
      { name: "Cisco",      icon: SI('cisco','1BA0D7'),           color: "#1BA0D7" },
      { name: "Ansible",    icon: SI('ansible','EE0000'),         color: "#EE0000" },
      { name: "Docker",     icon: DI('docker'),                   color: "#2496ED" },
      { name: "Linux",      icon: DI('linux'),                    color: "#FCC624" },
      { name: "Bash",       icon: DI('bash'),                     color: "#4EAA25" },
      { name: "PowerShell", icon: DI('powershell'),               color: "#5391FE" },
      { name: "EVE-NG",     icon: null, emoji: "🖧",             color: "#00d4ff" },
      { name: "OSPF/BGP",   icon: null, emoji: "🔀",             color: "#7c3aed" },
    ],
  },
  {
    category: "Desarrollo Backend",
    icon: "code",
    items: [
      { name: "Python",   icon: DI('python'),              color: "#3776AB" },
      { name: "Flask",    icon: SI('flask','94949A'),       color: "#94949A" },
      { name: "C#",       icon: DI('csharp'),               color: "#239120" },
      { name: ".NET",     icon: DI('dotnetcore'),           color: "#512BD4" },
      { name: "PHP",      icon: DI('php'),                  color: "#777BB4" },
      { name: "Node.js",  icon: DI('nodejs'),               color: "#339933" },
      { name: "Java",     icon: DI('java'),                 color: "#007396" },
      { name: "R",        icon: DI('r','original'),         color: "#276DC3" },
    ],
  },
  {
    category: "Frontend y Mobile",
    icon: "monitor",
    items: [
      { name: "HTML",         icon: DI('html5'),              color: "#E34F26" },
      { name: "CSS",          icon: DI('css3'),               color: "#1572B6" },
      { name: "JavaScript",   icon: DI('javascript'),         color: "#F7DF1E" },
      { name: "React",        icon: DI('react','original'),   color: "#61DAFB" },
      { name: "React Native", icon: DI('react','original'),   color: "#20d2f5" },
      { name: "Flutter",      icon: DI('flutter','original'), color: "#02569B" },
      { name: "Kotlin",       icon: DI('kotlin'),             color: "#7F52FF" },
      { name: "Android",      icon: DI('android'),            color: "#3DDC84" },
      { name: "WordPress",    icon: DI('wordpress'),          color: "#21759B" },
    ],
  },
  {
    category: "Bases de Datos",
    icon: "database",
    items: [
      { name: "PostgreSQL", icon: DI('postgresql'),             color: "#4169E1" },
      { name: "SQL Server", icon: DI('microsoftsqlserver'),     color: "#CC2927" },
      { name: "MariaDB",    icon: SI('mariadb','C0765A'),       color: "#C0765A" },
      { name: "MySQL",      icon: DI('mysql','original'),       color: "#4479A1" },
    ],
  },
  {
    category: "Ciberseguridad",
    icon: "shield",
    items: [
      { name: "Kali Linux",   icon: SI('kalilinux','557C94'),   color: "#557C94" },
      { name: "Hack The Box", icon: SI('hackthebox','9FEF00'),  color: "#9FEF00" },
      { name: "Nmap",         icon: null, emoji: "🔍",          color: "#00d4ff" },
      { name: "Metasploit",   icon: null, emoji: "💀",          color: "#2596CD" },
      { name: "Hydra",        icon: null, emoji: "💧",          color: "#10b981" },
    ],
  },
  {
    category: "Herramientas y Diseño",
    icon: "pen-tool",
    items: [
      { name: "Git",         icon: DI('git'),                            color: "#F05032" },
      { name: "GitHub",      icon: SI('github','ffffff'),                color: "#e2e8f0" },
      { name: "LaTeX",       icon: SI('latex','008080'),                 color: "#008080" },
      { name: "Figma",       icon: SI('figma','F24E1E'),                 color: "#F24E1E" },
      { name: "Illustrator", icon: SI('adobeillustrator','FF9A00'),      color: "#FF9A00" },
      { name: "Photoshop",   icon: SI('adobephotoshop','31A8FF'),         color: "#31A8FF" },
      { name: "Tinkercad",   icon: SI('autodesk','F7941D'),              color: "#F7941D" },
      { name: "Gemini AI",   icon: SI('googlegemini','4285F4'),          color: "#4285F4" },
      { name: "Apps Script", icon: SI('googleappsscript','34A853'),      color: "#34A853" },
    ],
  },
];
