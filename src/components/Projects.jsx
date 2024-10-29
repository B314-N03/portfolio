import React, { useContext, useEffect, useState } from 'react'
import Breadcrumb from './Breadcrumb'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { faCode } from '@fortawesome/free-solid-svg-icons'
import bashSVG from "../assets/images/gnu_bash-icon.svg"
import { ThemeContext } from './providers/ThemeProvider'
import './scss/projects.scss'

function Projects() {
  const {theme} = useContext(ThemeContext)
  const [projects, setProjects] = useState([
    {
      name: "Portfolio Website",
      description: "Mein aktuellstes Projekt. Hier kann ich das was ich in den letzten Jahren gelernt habe anwenden.\nAußerdem probiere ich mich hier auch mit neuen dingen wie Three.Js und animation aus.",
      time: "seit September 2024",
      icon: faCode,
      color: "#FE5F55",
      link: null,
      linkText: null,
      techStack: [
        "React",
        "Node.Js",
        "Three.js",
        "Firebase",
      ]
    },
    {
      name: "ELGIO Dashboard",
      description: "Das ELGIO Dashboard ist wohl mit Abstand mein umfangrichtigstes Projekt. Es umfasst ca. 30.000 Zeilen Code und zu dem Repo wurden ca 1.759 Commits getätigt.",
      time: `Letzter Commit am ${new Date().toLocaleDateString('de-DE')}`,
      link: "https://dashboard.elgio.de",
      linkText:"zum ELGIO Dashboard",
      icon: faCode,
      color: "rgb(33, 150, 243)",
      techStack: [
        "React",
        "Node.Js",
        "Firebase",
      ]
    },
    {
      name: "Port-Scanner",
      description: "Dieses Bash-Skript führt einen Port-Scan auf einer angegebenen IP-Adresse oder einem IP-Bereich durch und speichert die Ergebnisse in einer Datei. Es unterstützt verschiedene Listen von häufig verwendeten Ports und bietet grundlegende Funktionen zur Überprüfung von IP-Adressen.",
      time: "Letzter Commit am 08.08.2024",
      link: "https://github.com/B314-N03/CyberSecurity/blob/master/Portscanner/README.md",
      linkText:"README.md",
      icon: bashSVG,
      color: "rgb(3, 252, 119)",
      textColor: "var(--bg-main)",
      techStack: ["Bash"],
      dateColor: "var(--bg-main)"
    },
  ])

  return (
    <div className='content'>
        <Breadcrumb name="Projekte"/>
        <div className="w-100 flex-column justify-center align-center">
          <h1 className="h1 text-color-main">Projekte</h1>  
            <VerticalTimeline lineColor={theme === 'dark' ? '#fff' : '#121212'}>
                {
                    projects.map((project, index) => {
                        return (
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: project.color, color: project.textColor ? project.textColor : '#fff' }}
                                contentArrowStyle={{ borderRight: '7px solid ' + project.color }}
                                iconStyle={{ background: project.color, color: project.textColor ? project.textColor : '#fff' }}
                                icon={
                                 typeof project?.icon === "string" ? <img src={project.icon} className="vertical-timeline-element-icon"  alt={project.name}/> : <FontAwesomeIcon icon={project.icon} />
                                }
                                date={project.time}
                                dateClassName={project.dateColor && window.innerWidth < 1170 ? project.dateColor : 'text-color-main'} 
                            >
                              <div className="flex-column flex-gap-2rem">

                                <h3 className='m-0'>{project.name}</h3>
                                <p>
                                    {project.description}
                                </p>
                                <div className="flex-column flex-gap-1rem ">
                                  <div className="h3">Technologien:</div>
                                  <div className="flex-gap-1rem flex-row flex-wrap">
                                      {project.techStack.map((tech, index) => {
                                        return (
                                          <span className={`badge${theme === 'light' ? ' text-color-white' : ''}`} key={index}>{tech}</span>
                                        )
                                      })}
                                  </div>
                                </div>

                                {
                                  project.link && <a href={project.link} target="_blank" rel="noreferrer" className='no-text-decoration btn-main'>{project.linkText}</a>
                                }
                              </div>

                            </VerticalTimelineElement>
                        )
                    })
                }
            </VerticalTimeline>
        </div>
    </div>
  )
}

export default Projects