/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from 'react'
import Breadcrumb from './widgets/Breadcrumb'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronLeft, faCode, faFilter, faPerson, faSearch, faSuitcase, faX } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from './providers/ThemeProvider'
import './scss/projects.scss'
import { projectsMap } from './global/ProjectsMap'
import BackgroundImage from './widgets/BackgroundImage'
import { useSearchParams } from 'react-router-dom'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

function Projects(): JSX.Element {
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
  const [searchParams] = useSearchParams()
  const [openDemo] = useState(searchParams.get("open_demo"))
  const demoPositions: { [key: string]: { x: number, y: number, projectIndex: number } } = {
    "led-matrix":{
      x: 0,
      y: 1200,
      projectIndex:2
    },
    "port-scanner":{
      x: 0,
      y: 1700,
      projectIndex:3
    }
  }

  

  useEffect(() => {
    if(openDemo){
      setTimeout(() => {
        window.scrollTo({left:demoPositions[openDemo!].x,top:demoPositions[openDemo!].y,behavior:"smooth"})
      },500)
      setTimeout(() => {
        document.getElementsByClassName("vertical-timeline-element--work")[demoPositions[openDemo].projectIndex].classList.add("animate__animated")
        document.getElementsByClassName("vertical-timeline-element--work")[demoPositions[openDemo].projectIndex].classList.add("animate__pulse")
      }, 1200)
    }
  },[openDemo])


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

  const handleOpenModal = (index:number) => {
    const updatedProjectsMap = projectsMap.map((project, i) => {
      if(i === index){
        project.modalOpen = !project.modalOpen
      }
      return project
    })
    const demo_modal = document.getElementById(`demo-modal-${projects[index].name.toLowerCase().replace(" ","-")}`)
    const demo_modal_content = document.getElementById(`demo-modal-content-wrapper-${projects[index].name.toLowerCase().replace(" ","-")}`)
    if(updatedProjectsMap[index].modalOpen){
      setTimeout(() => {
        document.body.style.overflow = "hidden"
        setTimeout(() => {
          demo_modal_content?.classList.remove("visibility-hidden")
          demo_modal_content?.classList.remove("animate__fadeOut")
          demo_modal_content?.classList.add("animate__fadeIn")
        },800)
      }, 200)
      setProjects(updatedProjectsMap)      
    }
    else {
      document.body.style.overflow = "auto"
      demo_modal?.classList.remove("w-80vw")
      demo_modal_content?.classList.add("visibility-hidden")
      demo_modal_content?.classList.remove("animate__fadeIn")
      demo_modal_content?.classList.add("animate__fadeOut")      
      setTimeout(() => {
        setProjects(updatedProjectsMap)
      }, 1000)
    }
  }

  return (
    <div className='content'>
        <BackgroundImage></BackgroundImage>
        <Breadcrumb name="Projekte"/>
        <div className="w-100 flex-column justify-center align-center flex-gap-2rem z-index-1">
          <div className="text-color-main flex-column justify-center align-center flex-gap-1rem flex-wrap">
            <div className="text-color-main flex-row justify-center align-center flex-gap-1rem flex-wrap">
              {projectMenuMap.map((project, index) => {
                return (
                  <div key={index} className={`badge${activeMenuIndex === index ? ' active-badge' : ''} cursor-pointer`} onClick={() => setActiveMenuIndex(index)}>
                    <FontAwesomeIcon icon={project.icon as IconProp} className={`badge-text${activeMenuIndex === index ? '-active' : ''}`}></FontAwesomeIcon>
                    <span className={`badge-text${activeMenuIndex === index ? '-active' : ''}`}>{project.name}</span>
                  </div>
                )
              })}
              <div className={`badge${stateFilter ? ' active-badge' : ''} cursor-pointer`} onClick={handleSetShowFilter}>
                <FontAwesomeIcon icon={faFilter as IconProp} className={`badge-text${stateFilter ? '-active' : ''}`}></FontAwesomeIcon>
                <span className={`badge-text${stateFilter ? '-active' : ''}`}>Filtern nach</span>
                <div className="w-15p">
                  {stateFilter 
                    ? <FontAwesomeIcon icon={faChevronDown as IconProp} className={`badge-text${stateFilter ? '-active' : ''}`}/> 
                    : <FontAwesomeIcon icon={faChevronLeft as IconProp} className={`badge-text${stateFilter ? '-active' : ''}`}/>
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
                  <FontAwesomeIcon icon={faSearch as IconProp} className='search-icon'></FontAwesomeIcon>
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
                                 typeof project?.icon === "string" ? <img src={project.icon} className="w-35p center-self-pos" alt={project.name}/> : <FontAwesomeIcon icon={project.icon as IconProp} />
                                }
                                date={project.timeOfCreation}
                                key={index}
                                dateClassName={project.dateColor && window.innerWidth < 1170 ? project.dateColor : 'text-color-main'} 
                            >
                              <div className="flex-column flex-gap-2rem">
                                <div className='h2' id={project.name.toLowerCase().replace(" ","-").replace("_","-")}>{project.name}</div>
                                <p> 
                                    {project.description}
                                </p>
                                <div className="flex-column flex-gap-1rem ">
                                  <div className="h3">Technologien:</div>
                                  <div className="flex-gap-1rem flex-row flex-wrap">
                                      {project.techStack.map((tech, index) => {
                                        return (
                                          <div key={index}>
                                            {tech.startsWith(".") ?
                                              <div className='tooltip-container'>
                                                <div className="tooltip">{project.techStackTooltipText && (project.techStackTooltipText as { [key: string]: string })[tech.slice(1)]}</div>
                                                <span className={`badge${theme === 'light' ? ' text-color-white' : ''}${tech.startsWith(".") ? ' badge-disabled' : ''}`} key={index}>{tech.startsWith(".") ? tech.slice(1) : tech}</span>
                                              </div>
                                            : 
                                              <span className={`badge${theme === 'light' ? ' text-color-white' : ''}${tech.startsWith(".") ? ' badge-disabled' : ''}`} key={index}>{tech}</span>
                                            }
                                          </div>
                                        )
                                      })}
                                  </div>
                                </div>

                                <div className="flex-row flex-wrap flex-gap-1rem ">
                                  {project.link && <a href={project.link} target="_blank" rel="noreferrer" className='no-text-decoration btn-main'>{project.linkText}</a>}
                                  {project.showModalButton && <div className={`${project.modalDisabled ? "btn-main-disabled":"btn-main"}`} onClick={() => {if(project.modalDisabled) alert("Das funktioniert noch nicht"); else handleOpenModal(index)}}>Demo öffnen</div>}
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
                <div id={`demo-modal-${project.name.toLowerCase().replace(" ","-")}`} className={`glass-card-${theme} project-modal${project.modalOpen ? ' visibility-visible w-80vw' : ' visibility-hidden'}`} key={index}>
                  <div id={`demo-modal-content-wrapper-${project.name.toLowerCase().replace(" ","-")}`} className="visibility-hidden animate__animated h-100">
                    <div className="project-modal-header mb-20">  
                      <div className="h1">Demo-Modal: {project.name}</div>
                      <FontAwesomeIcon icon={faX as IconProp} className='cursor-pointer h3' onClick={() => handleOpenModal(index)}></FontAwesomeIcon>
                    </div>
                    <div className="project-modal-content">
                      {project.modalComponent}
                    </div>
                  </div>
                </div>
              )
            })}
        </div>
    </div>
  )
}

export default Projects