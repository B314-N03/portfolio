import React, { useContext } from 'react'
import { ThemeContext } from '../providers/ThemeProvider';
import { SiteContext } from '../providers/SiteProvider';
import kaliBg from '../../assets/images/kali-bg.png'

function BackgroundImage() {
  const {theme} = useContext(ThemeContext);
  const {siteType} = useContext(SiteContext);
  return (
    <img src={`${siteType === "static" ? "" : kaliBg}`} className={`${siteType === "static" ? theme === "dark" ? "bg-svg-dark" : "bg-svg-light" : "bg-svg-kali"}`}  alt={`${theme === "dark" ? "dark-svg-background" : "light-svg-background"}`}></img>
  )
}

export default BackgroundImage