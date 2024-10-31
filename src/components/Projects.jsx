import React, { useContext, useEffect, useState } from 'react'
import Breadcrumb from './Breadcrumb'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact } from '@fortawesome/free-brands-svg-icons'
import { faChevronDown, faChevronLeft, faCode, faFilter, faPerson, faSearch, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from './providers/ThemeProvider'
import './scss/projects.scss'
import { projectsMap } from './global/projectsMap.jsx'
import { set } from 'date-fns'

function Projects() {
  const {theme} = useContext(ThemeContext)

  const projectMenuMap = [
    {
      name: "Alle",
      icon: faCode
    },
    {
      name: "Berufliche Projekte",
      icon: faSuitcase
    },
    {
      name: "Persönliche Projekte",
      icon: faPerson
    },

  ]
  const [projects, setProjects] = useState(projectsMap)
  const [activeMenuIndex, setActiveMenuIndex] = useState(0)
  const [stateFilter,setStateFilter] = useState(false)
  const [searchFilter,setSearchFilter] = useState("tags")
  const [sort,setSort] = useState("asc")
  const [searchQuery,setSearchQuery] = useState("")

  const fetchCommits = async () => {
    const updatedProjects = await Promise.all(
      projectsMap.map(async (project) => {
        if (!project.repoLink || !project.repoLink.includes("github")) return {...project, timeOfLastEdit: "Letzter Commit ist nicht verfügbar (entweder nicht auf GitHub, oder ein privates Repository)"};

        try {
          const repoPath = project.repoLink.split(".")[1].split("/")[1] + "/" + project.repoLink.split(".")[1].split("/")[2];
          const response = await fetch(`https://api.github.com/repos/${repoPath}/commits?per_page=1`);
          const commits = await response.json();              
          if (commits.length > 0 && !commits.message.includes("API rate limit")) {
            const date = new Date(commits[0].commit.committer.date);
            return {
              ...project,
              timeOfLastEdit: "Letzter Commit am: " + date.toLocaleDateString('de-DE')
            };
          }
          else if(commits.message.includes("API rate limit")){
            return {
              ...project,
              timeOfLastEdit: "Letzter Commit ist nicht verfügbar, es gab einen Fehler beim laden, versuche es später erneut!"
            }
          }
        } catch (e) {
          console.error("Error fetching commit data:", e);
        }

        return project;
      })
    );
    setProjects(updatedProjects);
  };

  // useEffect(() => {
  //   if (projects.length > 0) {
  //     fetchCommits();
  //   }
  // }, [activeMenuIndex]);
  

  useEffect(() => {
    if(searchQuery.length > 0){
      let newProjects;
      switch(searchFilter){
        case "tags":
          newProjects = projectsMap.filter(project => project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))).sort((a, b) => a.name.localeCompare(b.name));
          if(sort === "desc"){
            newProjects = newProjects.reverse()
          }
          setProjects(newProjects)
          break;
        case "name":
          newProjects = projectsMap.filter(project => project.name.toLowerCase().includes(searchQuery.toLowerCase())).sort((a,b) => a.name.localeCompare(b.name))
          if(sort === "desc"){
            newProjects = newProjects.reverse()
          }
          setProjects(newProjects)
          break;
        case "time":
          newProjects = projectsMap.filter(project => project.timeOfCreation.toLowerCase().includes(searchQuery.toLowerCase())).sort((a,b) => a.name.localeCompare(b.name))
          if(sort === "desc"){
            newProjects = newProjects.reverse()
          }
          setProjects(newProjects)
          break;
        case "techstack":
          newProjects = projectsMap.filter(project => project.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))).sort((a,b) => a.name.localeCompare(b.name))
          if(sort === "desc"){
            newProjects = newProjects.reverse()
          }
          setProjects(newProjects)
          break;
        case "type":
          newProjects = projectsMap.filter(project => project.type === searchQuery).sort((a,b) => a.name.localeCompare(b.name))
          if(sort === "desc"){
            newProjects = newProjects.reverse()
          }
          setProjects(newProjects)
          break;
        default:
          setProjects(projectsMap)
          break;
      }
    }
    else{
      setProjects(projectsMap)
    }
  },[searchFilter,sort,searchQuery])



  useEffect(() => {
    switch(activeMenuIndex){
      case 0:
        setProjects(projectsMap)
        break;
      case 1: 
        setProjects(projectsMap.filter(project => project.type === "business_project"))
        break;
      case 2:
          setProjects(projectsMap.filter(project => project.type === "personal_project"))
          break;
      default:
        setProjects(projectsMap)
        break;
    }
  },[activeMenuIndex])

  const handleSetShowFilter = () => {
    if(stateFilter){
      setProjects(projectsMap)
      setSearchQuery("")
      setSearchFilter("tags")
      setSort("asc")
    }
    setStateFilter(!stateFilter)
  }

  const handleOpenModal = (index) => {
    setProjects(projects.map((project, i) => {
      if(i === index){
        project.modalOpen = !project.modalOpen
      }
      return project
    }))
    setTimeout(() => {
      projects[index].modalOpen 
      ? document.getElementById(`demo-modal-${projects[index].name.toLowerCase()}`).classList.add("w-80vw")
      : document.getElementById(`demo-modal-${projects[index].name.toLowerCase()}`).classList.remove("w-80vw")
    }, 500)
  }
  return (
    <div className='content'>
        <Breadcrumb name="Projekte"/>
        <div className="w-100 flex-column justify-center align-center flex-gap-2rem">
          <div className="text-color-main flex-column justify-center align-center flex-gap-1rem flex-wrap">
            <div className="text-color-main flex-row justify-center align-center flex-gap-1rem flex-wrap">
              {projectMenuMap.map((project, index) => {
                return (
                  <div key={index} className={`badge${activeMenuIndex === index ? ' active-badge' : ''} cursor-pointer`} onClick={() => setActiveMenuIndex(index)}>
                    <FontAwesomeIcon icon={project.icon} className={`badge-text${activeMenuIndex === index ? '-active' : ''}`}></FontAwesomeIcon>
                    <span className={`badge-text${activeMenuIndex === index ? '-active' : ''}`}>{project.name}</span>
                  </div>
                )
              })}
              <div className={`badge${stateFilter ? ' active-badge' : ''} cursor-pointer`} onClick={handleSetShowFilter}>
                <FontAwesomeIcon icon={faFilter} className={`badge-text${stateFilter ? '-active' : ''}`}></FontAwesomeIcon>
                <span className={`badge-text${stateFilter ? '-active' : ''}`}>Filtern nach</span>
                <div className="w-15p">
                  {stateFilter 
                    ? <FontAwesomeIcon icon={faChevronDown} className={`badge-text${stateFilter ? '-active' : ''}`}/> 
                    : <FontAwesomeIcon icon={faChevronLeft} className={`badge-text${stateFilter ? '-active' : ''}`}/>
                  }
                </div>
              </div>
            </div>
          {stateFilter && 
            <div className="filterBox">
              <div className="flex-column flex-gap-10p searchInput">
                <span>Suchen</span>
                <div className='flex-row align-center justify-end position-relative'>
                  <input type="text" placeholder='z.B. der Projektname...' className='input w-100' value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value)}} />
                  <FontAwesomeIcon icon={faSearch} className='search-icon'></FontAwesomeIcon>
                </div>
                
              </div>
              <div className="filterBox-select-container">
                <div className="filterBox-select">
                  <span>Suchen nach</span>
                  <select className='input w-100' onChange={(e) => {setSearchFilter(e.target.value)}} value={searchFilter}>
                    <option value="tags">Tags</option>
                    <option value="techstack">Techstack</option>
                    <option value="name">Projekt Name</option>
                    <option value="time">Jahr</option>
                    <option value="type">Typ</option>
                  </select>
                </div>
                <div className="filterBox-select">
                  <span>Sortierung</span>
                  <select className='input w-100' onChange={(e) => {setSort(e.target.value)}} value={sort}>
                    <option value="asc">Aufsteigend</option>
                    <option value="desc">Absteigend</option>
                  </select>
                </div>
              </div>

            </div>}
          </div>
          <div className="h1 text-color-main">Projekte</div>  
            {projects.length > 0 ? <VerticalTimeline lineColor={theme === 'dark' ? '#fff' : '#121212'}>
                {projects.map((project, index) => {
                        return (
                            <VerticalTimelineElement
                                className="vertical-timeline-element--work"
                                contentStyle={{ background: project.color, color: project.textColor ? project.textColor : '#fff' }}
                                contentArrowStyle={{ borderRight: '7px solid ' + project.color }}
                                iconStyle={{ background: project.color, color: project.textColor ? project.textColor : '#fff' }}
                                icon={
                                 typeof project?.icon === "string" ? <img src={project.icon} className="w-35p center-self-pos" alt={project.name}/> : <FontAwesomeIcon icon={project.icon} />
                                }
                                date={project.timeOfCreation}
                                dateClassName={project.dateColor && window.innerWidth < 1170 ? project.dateColor : 'text-color-main'} 
                            >
                              <div className="flex-column flex-gap-2rem">
                                <div className='h2'>{project.name}</div>
                                <p> 
                                    {project.description}
                                </p>
                                <div className="h5 text-color-secondary">{project.timeOfLastEdit}</div>
                                <div className="flex-column flex-gap-1rem ">
                                  <div className="h3">Technologien:</div>
                                  <div className="flex-gap-1rem flex-row flex-wrap">
                                      {project.techStack.map((tech, index) => {
                                        return (
                                          <>
                                            {tech.startsWith(".") ?
                                              <div className='tooltip-container'>
                                                <div className="tooltip">Das ist noch in Arbeit. Ich arbeite aktuell an einem interaktivem 3D Modell meines Zimmers</div>
                                                <span className={`badge${theme === 'light' ? ' text-color-white' : ''}${tech.startsWith(".") ? ' badge-disabled' : ''}`} key={index}>{tech.startsWith(".") ? tech.slice(1) : tech}</span>
                                              </div>
                                            : 
                                              <span className={`badge${theme === 'light' ? ' text-color-white' : ''}${tech.startsWith(".") ? ' badge-disabled' : ''}`} key={index}>{tech}</span>
                                            }
                                          </>
                                        )
                                      })}
                                  </div>
                                </div>

                                <div className="flex-row flex-wrap flex-gap-1rem ">
                                  {project.link && <a href={project.link} target="_blank" rel="noreferrer" className='no-text-decoration btn-main'>{project.linkText}</a>}
                                  {project.showModalButton && <div className={`${project.modalDisabled ? "btn-main-disabled":"btn-main"}`} onClick={() => {project.modalDisabled ? alert("Das funktioniert noch nicht") :handleOpenModal(index)}}>Demo öffnen</div>}
                                </div>
                              </div>

                            </VerticalTimelineElement>
                        )
                    })}
            </VerticalTimeline> : <div className="h3 text-color-main">Keine Projekte gefunden</div>}
            {projects.length > 0 && projects.map((project, index) => {
              if (!project.showModalButton && !project.modalOpen) {
                return null
              }
              return (
                <div id={`demo-modal-${project.name.toLowerCase()}`} className={`project-modal${project.modalOpen ? ' visibility-visible' : ' visibility-hidden'}`} key={index}></div>
              )
            })}
        </div>
    </div>
  )
}

export default Projects