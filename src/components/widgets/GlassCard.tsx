import { ReactNode, useContext, useEffect, useState } from 'react'
import '../scss/glass-card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEgg, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../providers/ThemeProvider';
import { IconDefinition, IconProp } from '@fortawesome/fontawesome-svg-core';

interface GlassCardProps{
    color?: string,
    windowTitle?: string,
    windowIcon?: null | IconProp | IconDefinition,
    bodyClassName?: string,
    containerClassName?: string
    children: ReactNode
}

function GlassCard({color="",windowTitle="",windowIcon=null,bodyClassName="",children,containerClassName=""} : GlassCardProps): JSX.Element {
  const [formattedWindowTitle, setFormattedWindowTitle] = useState("");
  const {theme} = useContext(ThemeContext);
  useEffect(() => {
    if (windowTitle.length > 0) {
      setFormattedWindowTitle("-" + windowTitle.replace(" ", "-").toLowerCase());
    }
    else{
      setFormattedWindowTitle("-untitled-"+ Math.floor(Math.random() * 1000));
    }
  },[windowTitle])
  const handleMouseEnterTerminalIcon = (id: string) => {
    console.log(id)
    document.getElementById(id)?.classList.remove("opacity-0");
  };

  const handleMouseLeaveTerminalIcon = (id: string) => {
    console.log(id)
    document.getElementById(id)?.classList.add("opacity-0");
  };
  return (
    <div className={`glass-card${color.length > 0 ? "-" + color : ""}${containerClassName.length > 0 ? " " + containerClassName : ""}`}>
        <div className="card-header">
            <div className='flex-row flex-gap-1rem align-center'>
                <div className="bg-color-red terminal-header-icon" onMouseEnter={() => handleMouseEnterTerminalIcon(`terminal-icon-red${formattedWindowTitle}`)} onMouseLeave={() => handleMouseLeaveTerminalIcon(`terminal-icon-red${formattedWindowTitle}`)}>
                    <FontAwesomeIcon className='opacity-0' icon={faClose as IconProp} fontSize={"14px"} id={`terminal-icon-red${formattedWindowTitle}`} ></FontAwesomeIcon>
                </div>
                <div className="bg-color-yellow text-color-black terminal-header-icon" onMouseEnter={() => handleMouseEnterTerminalIcon(`terminal-icon-yellow${formattedWindowTitle}`)} onMouseLeave={() => handleMouseLeaveTerminalIcon(`terminal-icon-yellow${formattedWindowTitle}`)}>
                   <FontAwesomeIcon className='opacity-0' icon={faMinus as IconProp} fontSize={"14px"} id={`terminal-icon-yellow${formattedWindowTitle}`}></FontAwesomeIcon>
                </div>
                <div className="bg-color-green terminal-header-icon" onMouseEnter={() => handleMouseEnterTerminalIcon(`terminal-icon-green${formattedWindowTitle}`)} onMouseLeave={() => handleMouseLeaveTerminalIcon(`terminal-icon-green${formattedWindowTitle}`)}>
                  <FontAwesomeIcon className='opacity-0' icon={faPlus as IconProp} fontSize={"14px"} id={`terminal-icon-green${formattedWindowTitle}`}></FontAwesomeIcon>
                </div>
            </div>
            <div className="card-title">{windowTitle}</div>
            <div className="card-icon">
                {windowIcon !== null 
                ? <FontAwesomeIcon icon={windowIcon as IconProp} className='h3'></FontAwesomeIcon>
                : <FontAwesomeIcon icon={faEgg as IconProp} className='h3'></FontAwesomeIcon>
            }</div>
        </div>
        <div className={`card-divider ${theme === "light" ?"bg-color-black" : ""}`}></div>

        {/* Start of Card Body */}
        <div className={bodyClassName}>
            {children}
        </div>
    </div>
  )
}

export default GlassCard