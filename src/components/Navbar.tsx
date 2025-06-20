import { useContext, useEffect, useRef, useState } from 'react'
import './scss/navbar.scss'
import { Link, NavLink } from 'react-router-dom'
import { ThemeContext } from './providers/ThemeProvider'
import {   faSun, faMoon, faFileDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import cv from '../assets/pdf/lebenslauf_bela.pdf'
import { IconProp } from '@fortawesome/fontawesome-svg-core'


function Navbar(): JSX.Element {
  const [time, setTime] = useState(new Date().toLocaleTimeString())
  const [today] = useState(new Date().toLocaleDateString("de-DE", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  const [menuOpen, setMenuOpen] = useState(false)
  const menuMobileRef = useRef<HTMLDivElement>(null)
  const [dateTimeCurrentState, setDateTimeCurrentState] = useState(1)
  const { theme, setTheme } = useContext(ThemeContext);
  
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
  
    const updateInterval = () => {
      if (window.innerWidth > 1120 && dateTimeCurrentState === 0) {
        if (!interval) {
          setTime(new Date().toLocaleTimeString());
          interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
          }, 1000);
        }
      } else {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      }
    };
  
    updateInterval();
  
    // Add event listener for window resize
    window.addEventListener('resize', updateInterval);
  
    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener('resize', updateInterval);
    };
  }, [dateTimeCurrentState]);


  const handleClickHamburger = () => {
    setMenuOpen(!menuOpen)
    document.getElementById("menu-toggle")?.classList.toggle("nav-open")
    const navbarMenuMobile = document.getElementsByClassName("navbar-menu4mobile")[0]
    navbarMenuMobile.classList.remove("animate__fadeInOpacity-8")
    navbarMenuMobile.classList.remove("animate__fadeOut")
    navbarMenuMobile.classList.remove("opacity-8")
    if(menuOpen){
      navbarMenuMobile.classList.add("animate__fadeOut")
      setTimeout(() => {
        (navbarMenuMobile as HTMLElement).style.display ="none"
      },1000)
    }
    else{
      navbarMenuMobile.classList.add("animate__fadeInOpacity-8");
      (navbarMenuMobile as HTMLElement).style.display ="flex"
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    const showMenuIcon = document.getElementById("menu-toggle")
    if(menuOpen){
      if(menuMobileRef.current && !menuMobileRef.current.contains(e.target as Node) && showMenuIcon && !showMenuIcon.contains(e.target as Node)){
        setMenuOpen(!menuOpen)
        document.getElementById("menu-toggle")?.classList.toggle("nav-open")
        const element = document.getElementsByClassName("navbar-menu4mobile")[0];
        (element as HTMLElement).style.display ="none"
      }
    }
  }

  useEffect(() => {
    if(menuOpen){
      document.addEventListener("mousedown", handleClickOutside)
    }
    else{
      document.removeEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[menuOpen])

  
  const handleClickDateTimeMenu = () => {
    setDateTimeCurrentState(dateTimeCurrentState === 0 ? 1 : 0)
  }

  const handleChangeTheme = () => {
    if(theme === 'dark'){
      setTheme('light')
    }
    else{
      setTheme('dark')
    }
  }


  return (
    <nav className={`navbar `}>
      <div className="navbar-parent firstItem">
      <div onClick={handleClickHamburger} id="menu-toggle" className="cursor-pointer menu-toggle navbar-hamburger-menu">
          <span className="menu-toggle-bar menu-toggle-bar--top"></span>
          <span className="menu-toggle-bar menu-toggle-bar--middle"></span>
          <span className="menu-toggle-bar menu-toggle-bar--bottom"></span>
        </div>
      <div className="navbar-menu4mobile" ref={menuMobileRef} >
        <div className="flex-column flex-gap-1rem ">
          <Link to='/' className="navbar-item" >Home</Link>
          <Link to='/about' className="navbar-item">Über mich</Link>
          <Link to='/projects' className="navbar-item">Projekte</Link>
          <Link to='/contact' className="navbar-item">Kontakt</Link>
        </div>

        <div className="seperator-vertical w-100p"></div>

        <div className="flex-column flex-gap-1rem ">
        <a href={cv } download target='_blank' rel="noreferrer" className='navbar-item flex-row flex-gap-1rem'>
          Lebenslauf
          <FontAwesomeIcon className='text-color-main' icon={faFileDownload as IconProp}></FontAwesomeIcon>
        </a>
        <Link to="/impressum" className='navbar-item'>Impressum</Link>

        </div>

        </div>
        <Link to="/" className="navbar-item" data-no-animation>Béla Noé</Link>
        <div className='cursor-pointer navbar-time w-fit-content' onClick={handleClickDateTimeMenu}>
          {dateTimeCurrentState === 0 ? 
          <div className="navbar-item navbar-time" data-no-animation>{time}</div> 
          :
          <div className="navbar-item navbar-time" data-no-animation>{today}</div>}
        </div>
      </div>
      <div className={`navbar-parent ${theme === "dark" ? "bg-svg-dark" : "bg-svg-light"}`} data-navbar-list>
        <NavLink to='/' className={({isActive}) => isActive ? "navbar-item active" : "navbar-item"} >Home</NavLink>
        <NavLink to='/about' className={({isActive}) => isActive ? "navbar-item active" : "navbar-item"}>Über mich</NavLink>
        <NavLink to='/projects' className={({isActive}) => isActive ? "navbar-item active" : "navbar-item"}>Projekte</NavLink>
        <a href={cv} download target='_blank' rel="noreferrer" className='navbar-item flex-row flex-gap-1rem'>
          Lebenslauf
          <FontAwesomeIcon className='text-color-main' icon={faFileDownload as IconProp}></FontAwesomeIcon>
        </a>
        <NavLink to='/contact' className={({isActive}) => isActive ? "navbar-item active" : "navbar-item"}>Kontakt</NavLink>
      </div>
      <div className="navbar-parent flex-gap-1rem">
        {/* <div className="flex-row align-center flex-gap-1rem cursor-pointer" onClick={handleShowLogin} id='login-button'>
          <label for="login-icon" className='cursor-pointer'>{showLoginModal ? "Logout" : "Login" }</label> 
          <FontAwesomeIcon name='login-icon'  className={`navbar-item navbar-icon cursor-pointer ${showLoginModal ? "" : "navbar-login-icon"}`} icon={faRightFromBracket} data-not-hoverable data-no-transition></FontAwesomeIcon>
        </div> */}
          <FontAwesomeIcon 
            onClick={handleChangeTheme} 
            className="circle w-20p h-20p navbar-item navbar-icon"
            icon={theme === 'dark' ? faSun as IconProp : faMoon as IconProp }
            data-not-hoverable  
          ></FontAwesomeIcon>
      </div>
    </nav>
  )
}

export default Navbar
