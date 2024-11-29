/* eslint-disable react-hooks/exhaustive-deps */
import { faLinux, faPage4, faPagelines, faWindows } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useRef, useState } from 'react'
import './scss/taskbar.scss'
import kaliIcon from '../assets/images/kali-icon.svg'
import { faCode, faContactBook, faDotCircle, faDownload, faFileDownload, faHome, faPager, faPerson, faScaleBalanced, faSpaghettiMonsterFlying, faTextHeight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import cv from "../assets/pdf/lebenslauf_bela.pdf"
function Taskbar() {
  const [menuOpen,setMenuOpen] = useState(false)
  const menuIconRef = useRef(null)
  return (
    <div className='taskbar'>
        <div className="taskbar-menu-container position-relative">
          {menuOpen && <TaskbarMenu setMenuOpen={setMenuOpen} menuOpen={menuOpen} menuIconRef={menuIconRef}></TaskbarMenu>}
          <img className='taskbar-icon-svg kali-icon' onClick={() => setMenuOpen(!menuOpen)} src={kaliIcon} alt='Kali Linux' ref={menuIconRef}></img>
        </div>
    </div>
  )
}

const pages = [
  {
    name: 'Home',
    link: '/',
    icon: faHome
  },
  {
    
    name: 'Über mich',
    link: '/about',
    icon: faPerson
  },
  {
    name: 'Projekte',
    link: '/projects',
    icon: faCode
  },
  {
    name: 'Kontakt',
    link: '/contact',
    icon: faContactBook
  },
  {
    name: 'Sonstiges',
    link: '/other',
    icon: "...",
    subpages: [
      {
        name: 'CV',
        fileDownload: cv,
        icon: faFileDownload,
      },
      {
        name: 'Impressum',
        link: '/other/impressum',
        icon: faScaleBalanced,
      }
    ]
  },
]

const handleMouseEnterSubmenu = () => {
  document.querySelectorAll('.taskbar-menu-item-subpages').forEach((element) => {
    element.style.display = 'flex'
  })
}

const handleMouseLeaveSubmenu = (e) => {

    document.querySelectorAll('.taskbar-menu-item-subpages').forEach((element) => {
      element.style.display = 'none'
    })
}

function TaskbarMenu({setMenuOpen,menuOpen,menuIconRef}) {
  const menuRef = useRef(null)
  const handleClickOutside = (e) => {
    if(menuRef.current && !menuRef.current.contains(e.target) && menuIconRef.current && !menuIconRef.current.contains(e.target)){
      setMenuOpen(false)
    }
  }

  useEffect(() => {
    if(menuOpen){
      document.addEventListener("mousedown", handleClickOutside);
    }
    else{
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen])

  return (
    <div className='taskbar-menu' ref={menuRef}>
      {pages.map((page) => (
        page.subpages ? 
        <div key={page.name} className='taskbar-menu-item' data-no-animation onMouseEnter={handleMouseEnterSubmenu} onMouseLeave={handleMouseLeaveSubmenu}>
          <div className='w-25p'>{page.icon}</div>
          <p>{page.name}</p>
          <div className='taskbar-menu-item-subpages'>
            {page.subpages.map((subpage) => (
              subpage.fileDownload ? 
              <div className="flex-row flex-gap-1rem align_center taskbar-menu-item">
                <FontAwesomeIcon icon={subpage.icon}></FontAwesomeIcon>
                <a href={cv} download target='_blank' rel="noreferrer" className='no-text-decoration text-color-white'>Lebenslauf</a>
              </div>
              
              :     
              <Link to={subpage.link} key={subpage.name} className='taskbar-menu-item no-text-decoration'>
                {typeof(subpage.icon) !== "string" 
                  ? <FontAwesomeIcon icon={subpage.icon}></FontAwesomeIcon>
                  : <div>{subpage.icon}</div>
                } 
                <p>{subpage.name}</p>
              </Link>
            ))}
          </div>
        </div>
        :
        <Link to={page.link} key={page.name} className='taskbar-menu-item no-text-decoration'>
            {typeof(page.icon) !== "string" 
              ? <FontAwesomeIcon icon={page.icon} className='w-25p'></FontAwesomeIcon>
              : <div className='w-25p'>{page.icon}</div>
            } 
            <p>{page.name}</p>
        </Link>
      ))}
    </div>
  )
}


export default Taskbar