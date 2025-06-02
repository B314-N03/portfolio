import { faCode } from "@fortawesome/free-solid-svg-icons";
import bashSVG from "../../assets/images/gnu_bash-icon.svg"
import { faFlutter, faPython } from "@fortawesome/free-brands-svg-icons";
import LedMatrixDemo from "../project_demos/LedMatrixDemo";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface Project {
  name: string;
  description: string;
  timeOfCreation: string;
  icon: IconProp | string;
  color: string;
  textColor?: string;
  dateColor?: string;
  techStack: string[];
  techStackTooltipText?: Record<string, string>;
  link?: string;
  linkText?: string;
  repoLink?: string;
  tags: string[];
  type: string;
  modalComponent?: React.ReactNode;
  showModalButton?: boolean;
  modalOpen?: boolean;
  modalDisabled?: boolean;
}

export const projectsMap: Project[]  =  [  
  {
    name: "Habit Line",
    description: "Mein aktuellstes Fullstack Projekt. Es ist ein Habit Tracker und soll im MVP ein AI Feature beinhalten, welches auf die hinzugefügten Tasks antworten/ Fragen stellen kann. Damit hat man eine direkte Kontrollinstanz.",
    timeOfCreation: "Mai 2025",
    icon: faCode,
    color: "#FE5F55",
    techStack: [
      "Java Springboot",
      "PostgreSQL 17",
      "React",
      "Sass",
      "HTML",
      "CSS",
      "JavaScript",
      "Git",
    ],
    link:"https://github.com/B314-N03/HabitLine/",
    linkText:"zum Repository",
    repoLink:"https://github.com/B314-N03/HabitLine/",
    tags: ["Habit Tracker", "React", "Node.js", "Firebase", "Sass", "HTML", "CSS", "JavaScript", "Git"],
    type:"personal_project"
  },
  {
    name: "Portfolio Website",
    description: "Meine eigene Porfolio Website. Hier kann ich das was ich in den letzten Jahren gelernt habe anwenden.\nAußerdem probiere ich mich hier auch mit neuen Dingen wie Three.js und Animationen aus.",
    timeOfCreation: "September 2024",
    icon: faCode,
    color: "#FE5F55",
    techStack: [
      "React",
      "Node.Js",
      "Firebase",
      "Sass",
      "HTML",
      "CSS",
      "JavaScript",
      "Git",
      ".Three.js"
    ],
    techStackTooltipText: {"Three.js": "Das ist noch in Arbeit. Ich arbeite aktuell an einem interaktivem 3D Modell meines Zimmers"},
    link:"https://github.com/B314-N03/portfolio",
    linkText:"zum Repository",
    repoLink:"https://github.com/B314-N03/portfolio",
    tags: ["Portfolio", "React", "Node.js", "Three.js", "Firebase", "Sass", "HTML", "CSS", "JavaScript", "Git"],
    type:"personal_project"
  },
  {
    name: "ELGIO Dashboard",
    description: "Das ELGIO Dashboard ist wohl mit Abstand mein umfangrichtigstes Projekt. Es umfasst ca. 30.000 Zeilen Code und zu dem Repo wurden ca 1.759 Commits getätigt.",
    timeOfCreation: "Anfang 2022",
    link: "https://dashboard.elgio.de",
    linkText:"zum ELGIO Dashboard",
    icon: faCode,
    color: "rgb(33, 150, 243)",
    techStack: [
      "React",
      "Node.Js",
      "Firebase",
      "Sass",
      "HTML",
      "CSS",
      "JavaScript",
      "Git",
      "Docker",
      "Vitest",
      "Figma"
    ],
    tags: ["Dashboard", "React", "Node.Js", "Firebase","Git","Docker","Vitest","Sass","HTML","CSS","JavaScript","ELGIO","Figma"],
    type:"business_project"
  },
  {
    name:"LED Matrix",
    description:"In meiner Wohnung hängt eine LED-Matrix. Diese zeigt unter anderem den Busfahrplan der umliegenden Stationen. Zusätzlich habe ich daran gearbeitet, ein Fußball-Display auf eben diesem zu realisieren. Alles weitere wird in der Demo erklärt.",
    timeOfCreation: "2024",
    icon: faCode,
    color: "rgb(33, 150, 243)",
    techStack: ["Python","Docker","Bash","Nginx","Raspberry Pi"],
    tags: ["Dashboard", "React", "Node.Js", "Firebase"],
    type:"personal_project",
    showModalButton: true,
    modalOpen: false,
    modalDisabled: false,
    modalComponent: <LedMatrixDemo></LedMatrixDemo>
  },
  {
    name: "Port-Scanner",
    description: "Dieses Bash-Skript führt einen Port-Scan auf einer angegebenen IP-Adresse oder einem IP-Bereich durch und speichert die Ergebnisse in einer Datei. Es unterstützt verschiedene Listen von häufig verwendeten Ports und bietet grundlegende Funktionen zur Überprüfung von IP-Adressen.",
    timeOfCreation: "Anfang 2021",
    link: "https://github.com/B314-N03/CyberSecurity/blob/master/Portscanner/README.md",
    linkText:"README.md",
    repoLink:"https://github.com/B314-N03/CyberSecurity/",
    icon: bashSVG,
    color: "rgb(3, 252, 119)",
    textColor: "var(--bg-main)",
    techStack: ["Bash"],
    dateColor: "var(--bg-main)",
    tags: ["Port-Scanner", "Bash","CyberSecurity","IP-Adressen","nmap"],
    type:"personal_project",
    showModalButton: true,
    modalOpen: false,
    modalDisabled: true,
    modalComponent: <div className="h3">Portscanner-Demo Modal Content</div>
  },
  {
    name: "Notizen CLI App",
    description: "Dieses Projekt habe ich Anfang 2021 gemacht um Python an einem reelle Beispiel zu lernen.\nDieses CLI Tool kann neue Notizen erstellen, bearbeiten und löschen. Diese werden in einer .txt-Datei gespeichert und sind somit permanent auf dem System.\nDer `Editor` in dem man die Notizen bearbeiten kann wartet solange bis man `:quit` eingibt (ähnlich wie der nano Editor).",
    timeOfCreation: `Anfang 2021`,
    link: "https://github.com/B314-N03/Python_Projects/blob/master/Notizen/README.md",
    linkText:"README.md",
    repoLink:"https://github.com/B314-N03/Python_Projects",
    icon: faPython,
    color: "rgb(3, 252, 119)",
    textColor: "var(--bg-main)",
    techStack: ["Python"],
    dateColor: "var(--bg-main)",
    tags: ["Notizen", "CLI-App", "Python","Notizen","Editor"],
    type:"personal_project"
  },
  {
    name: "Quotes App",
    description: "Diese App habe ich Ende 2021 für meine Mutter zu Weihnachten gemacht. Sie ist eine einfache App, die Zitate liefert, welche von einer API geholt werden. Sie wurde mit Flutter entwickelt.\nSie gibt einem jeden Tag ein neues Zitat, dieses kann man speichern.\nEs war ein gutes Projekt um Flutter zu lernen.",
    timeOfCreation: `Anfang 2021`,
    link: "https://github.com/B314-N03/quotes_app",
    linkText:"zum Repository",
    repoLink:"https://github.com/B314-N03/quotes_app",
    icon: faFlutter,
    color: "#042B59",
    textColor: "var(--white)",
    techStack: ["Flutter", "Dart","Git"],
    dateColor: "var(--bg-main)",
    tags: ["Zitate", "App", "Flutter", "Dart","API"],
    type:"personal_project"
  },
]
