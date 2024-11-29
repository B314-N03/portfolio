import React from 'react'
import '../scss/glass-card.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faEgg, faMinus, faPlus} from '@fortawesome/free-solid-svg-icons';

function GlassCard({color="",windowTitle="",windowIcon=null,bodyClassName="",children,containerClassName=""}) {

  const handleMouseEnterTerminalIcon = (id) => {
    document.getElementById(id).classList.remove("opacity-0");
  };

  const handleMouseLeaveTerminalIcon = (id) => {
    document.getElementById(id).classList.add("opacity-0");
  };
  return (
    <div className={`glass-card${color.length > 0 ? "-" + color : ""}${containerClassName.length > 0 ? " " + containerClassName : ""}`}>
        <div className="card-header">
            <div className='flex-row flex-gap-1rem align-center'>
                <div className="bg-color-red terminal-header-icon" onMouseEnter={() => handleMouseEnterTerminalIcon(`terminal-icon-red-${windowTitle.replace(" ","_").toLowerCase()}`)} onMouseLeave={() => handleMouseLeaveTerminalIcon(`terminal-icon-red-${windowTitle.replace(" ","_").toLowerCase()}`)}>
                    <FontAwesomeIcon className='opacity-0' icon={faClose} fontSize={"14px"} id={`terminal-icon-red-${windowTitle.replace(" ","_").toLowerCase()}`} ></FontAwesomeIcon>
                </div>
                <div className="bg-color-yellow text-color-black terminal-header-icon" onMouseEnter={() => handleMouseEnterTerminalIcon(`terminal-icon-yellow-${windowTitle.replace(" ","_").toLowerCase()}`)} onMouseLeave={() => handleMouseLeaveTerminalIcon(`terminal-icon-yellow-${windowTitle.replace(" ","_").toLowerCase()}`)}>
                   <FontAwesomeIcon className='opacity-0' icon={faMinus} fontSize={"14px"} id={`terminal-icon-yellow-${windowTitle.replace(" ","_").toLowerCase()}`}></FontAwesomeIcon>
                </div>
                <div className="bg-color-green terminal-header-icon" onMouseEnter={() => handleMouseEnterTerminalIcon(`terminal-icon-green-${windowTitle.replace(" ","_").toLowerCase()}`)} onMouseLeave={() => handleMouseLeaveTerminalIcon(`terminal-icon-green-${windowTitle.replace(" ","_").toLowerCase()}`)}>
                  <FontAwesomeIcon className='opacity-0' icon={faPlus} fontSize={"14px"} id={`terminal-icon-green-${windowTitle.replace(" ","_").toLowerCase()}`}></FontAwesomeIcon>
                </div>
            </div>
            <div className="card-title">{windowTitle}</div>
            <div className="card-icon">
                {windowIcon !== null 
                ? <FontAwesomeIcon icon={windowIcon} className='h3'></FontAwesomeIcon>
                : <FontAwesomeIcon icon={faEgg} className='h3'></FontAwesomeIcon>
            }</div>
        </div>
        <div className="card-divider"></div>

        {/* Start of Card Body */}
        <div className={bodyClassName}>
            {children}
        </div>
    </div>
  )
}

export default GlassCard