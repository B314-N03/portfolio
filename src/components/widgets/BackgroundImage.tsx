import { useContext } from 'react'
import { ThemeContext } from '../providers/ThemeProvider';
import { SiteContext } from '../providers/SiteProvider';
import kaliBg from '../../assets/images/kali-bg.png'

function BackgroundImage(): JSX.Element {
  const {theme} = useContext(ThemeContext);
  const {siteType} = useContext(SiteContext);
  return (
    siteType !== "static"
    ? 
      <img src={kaliBg} alt="kali-bg" className='bg-svg-kali'></img> 
    :
      <div className={`${siteType === "static" ? theme === "dark" ? "bg-svg-dark" : "bg-svg-light" : "bg-svg-kali"}`}></div>
  )
}

export default BackgroundImage