/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useContext } from 'react';
import Breadcrumb from './Breadcrumb';
import './scss/home.scss';
import backgroundVideo from '../assets/videos/Background_video.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faMinus, faPlus, faTerminal, faUser } from '@fortawesome/free-solid-svg-icons';
import {  faGithub, faNodeJs, faReact, faSass } from '@fortawesome/free-brands-svg-icons';
import firebaseSVG from '../assets/images/firebase-icon.svg'
import vitestSVG from '../assets/images/logos--vitest.svg'
import flutterSVG from "../assets/images/flutterio-icon.svg"
import javaSVG from "../assets/images/java-icon.svg"
import typescriptSVG from "../assets/images/typescriptlang-icon.svg"
import bashSVG from "../assets/images/gnu_bash-icon.svg"
import pythonSVG from "../assets/images/python.svg"
import Taskbar from './taskbar';
import kaliBg from "../assets/images/kali-bg.png"
import { ThemeContext } from './providers/ThemeProvider';
import { SiteContext } from './providers/SiteProvider';
import BackgroundImage from './widgets/Background_image';

function Home() {
  const [terminalLines, setTerminalLines] = useState([]);
  const [showTerminal, setShowTerminal] = useState(false);
  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [currentCommand,setCurrentCommand] = useState("")
  const {theme} = useContext(ThemeContext)
  const {siteType} = useContext(SiteContext)

  const birthdate = new Date(2003, 5, 13);  
  const today = new Date();
  let age = today.getFullYear() - birthdate.getFullYear();
  const monthDifference = today.getMonth() - birthdate.getMonth();
  const dayDifference = today.getDate() - birthdate.getDate();
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
      age--;
  }  
  const ageOfMe = age   
  const typeCommand = async (commandText, outputTextArray, styles = {}) => {
    const { commandColor, commandSize, outputColor, outputSize } = styles;
    let currentLine = { command: "", output: "", styles: {} };
  
    // Typing out the command
    for (let i = 0; i < commandText.length; i++) {
      currentLine.command += commandText[i];
      currentLine.styles = { commandColor, commandSize };
      setTerminalLines((prevLines) => {
        const updatedLines = [...prevLines];
        updatedLines[updatedLines.length - 1] = { ...currentLine };
        return updatedLines;
      });
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  
    await new Promise((resolve) => setTimeout(resolve, 300)); // Pause before showing the output
  
    // Adding the output line by line
    for (let i = 0; i < outputTextArray.length; i++) {
      currentLine.output += (i > 0 ? "\n" : "") + outputTextArray[i];
      currentLine.styles = { commandColor, commandSize, outputColor, outputSize };
      setTerminalLines((prevLines) => {
        const updatedLines = [...prevLines];
        updatedLines[updatedLines.length - 1] = { ...currentLine };
        return updatedLines;
      });
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  
    // Add a new line for the next command
    setTerminalLines((prevLines) => [...prevLines, { command: "", output: "" }]);
  };
const exec = async () => {
 // Enhanced function to include styles
   setTimeout(async () => {
      await typeCommand("./portfolio.sh",["Starting...","Hi, ich bin Béla Noé und bin Softwareentwickler und IT-Enthusiast!","Mit über 7 Jahren Erfahrung und Kenntnissen in mehr als 6 Sprachen, zeige ich dir hier meine Projekte.","Aktuellstes Projekt: ELGIO","Techstack bei ELGIO: NodeJs, React, Firebase, Sass, HTML, CSS, JavaScript, Git, Docker, Vitest",]);
      await typeCommand("help",["Das portfolio ist so kreiert, dass man sich wie auf einem normalen Pc zurecht findet.","Klicke auf die Desktop-Symbole oder tippe den Befehl hier in das Terminal um durch mein Portfolio zu navigieren.","Verfügbare Befehle: help, projects, contact"]);
      if(document.getElementById("terminal-body") === null) return
     }, 2000);
};
 

   useEffect(() => {
    // exec();
  },[]);

  const handleMouseEnterTerminalIcon = (id) => {
    document.getElementById(id).style.opacity = '1';
  };

  const handleMouseLeaveTerminalIcon = (id) => {
    document.getElementById(id).style.opacity = '0';
  };

  const techStack = {
    "react_js":{
      name:"React.js",
      icon:faReact,
      iconClassName:"text-color-blue"
    },
    "node_js":{
      name:"Node.js",
      icon:faNodeJs,
      iconClassName:"text-color-green"
    },
    "firebase": {
      name:"Firebase",
      svg: true,
      svgPath: firebaseSVG
    },
    "github": {
      name:"GitHub",
      icon:faGithub,
    },
    "vitest": {
      name:"Vitest",
      svg:true,
      svgPath: vitestSVG
    },
    "sass":{
      name:"Sass",
      icon:faSass,
      iconClassName:"text-color-sass"
    },
    "flutter": {
      name:"Flutter",
      svg: true,
      svgPath:flutterSVG
    },
    "typescript": {
      name:"TypeScript",
      svg: true,
      svgPath: typescriptSVG
    },
    "bash":{
      name:"Bash",
      svg:true,
      svgPath: bashSVG
    },
    "python": {
      name:"Python",
      svg:true,
      svgPath: pythonSVG
    },
    "java": {
      name:"Java",
      svg: true,
      svgPath: javaSVG
    },
  }

  const handleOpenNewTerminal = () => {
    setTerminalLines([])
    setShowTerminal(!showTerminal)
    exec()
  }


  const handleCheckboxClick = () => {
    setCheckboxChecked(!checkboxChecked)
  }


  const handleCommandSubmit = (e) => {
    e.preventDefault();

    if (currentCommand.trim()) {
      let output = '';

      // Define your commands here
      switch (currentCommand.trim()) {
        case 'help':
          output = "Available commands: help, projects, contact";
          break;
        case 'projects':
          output = "Current project: ELGIO\nTechstack: Node.js, React, Firebase, Sass, etc.";
          break;
        case 'contact':
          output = "Contact me at: example@example.com";
          break;
        default:
          output = `Unknown command: ${currentCommand}`;
      }

      // Add command and output to the terminal
      setTerminalLines((prevLines) => [
        ...prevLines,
        { command: currentCommand, output },
      ]);

      setCurrentCommand(''); // Clear input field
    }
  };

  useEffect(() => {
    if(siteType === "static") {
      document.getElementById("text-1").classList.add("animate__fadeInDown")
      document.getElementById("text-1").classList.remove("visibility-hidden")
      setTimeout(() => {
        document.getElementById("text-2").classList.add("animate__fadeInDown")
        document.getElementById("text-2").classList.remove("visibility-hidden")
      },250)
      setTimeout(() => {
        document.getElementById("text-3").classList.add("animate__fadeInDown")
        document.getElementById("text-3").classList.remove("visibility-hidden")
      },500)
    }
  },[])

  return (
    <div className='content'>
      <BackgroundImage/>
      {/* Content for interactive site */}
        {siteType !== "static" && <Taskbar></Taskbar>}
        {siteType !== "static" && <div>
          {!showTerminal && 
                <div className="flex-column flex-gap-5p justify -center align-center w-fit-content position-absolute cursor-pointer" onClick={handleOpenNewTerminal}>
                  <FontAwesomeIcon icon={faTerminal} className="h4 home-profileCard-header-terminal-icon "></FontAwesomeIcon>
                  <div className="h4 text-color-main">Terminal</div>
          </div>}
        </div>}
        {showTerminal && siteType !== "static" && <div className="home-profileCard-container min-height-60vh">
          <div className="home-profileCard text-color-main">
              <div className="home-profileCard-header">
                <div className="home-profileCard-header-icon-container">
                  <div className="bg-color-red terminal-header-icon" onMouseEnter={() => handleMouseEnterTerminalIcon("terminal-icon-red")} onClick={() => setShowTerminal(!showTerminal)} onMouseLeave={() => handleMouseLeaveTerminalIcon("terminal-icon-red")}>
                    <FontAwesomeIcon icon={faClose} fontSize={"14px"} id="terminal-icon-red" ></FontAwesomeIcon>
                  </div>
                  <div className="bg-color-yellow text-color-black terminal-header-icon" onMouseEnter={() => handleMouseEnterTerminalIcon("terminal-icon-yellow")} onMouseLeave={() => handleMouseLeaveTerminalIcon("terminal-icon-yellow")}>
                    <FontAwesomeIcon icon={faMinus} fontSize={"14px"} id="terminal-icon-yellow"></FontAwesomeIcon>
                  </div>
                  <div className="bg-color-green terminal-header-icon" onMouseEnter={() => handleMouseEnterTerminalIcon("terminal-icon-green")} onMouseLeave={() => handleMouseLeaveTerminalIcon("terminal-icon-green")}>
                    <FontAwesomeIcon icon={faPlus} fontSize={"14px"} id="terminal-icon-green"></FontAwesomeIcon>
                  </div>
                </div>
                <div className="home-profileCard-header-title">
                  <span className="h4">root@belanoe: </span>
                  <span className="h3">~</span>
                </div>
                <span className="h4 home-profileCard-header-terminal-icon">
                  <FontAwesomeIcon icon={faTerminal}></FontAwesomeIcon>
                </span>
              </div>
              <div className="home-profileCard-body flex-column flex-gap-10p p-10p animate__animated" id='terminal-body'>
              {terminalLines.map((line, index) => (
                  <div key={index} className="home-profileCard-terminal-line">
                    <div className="flex-row flex-gap-10p align-center">
                      <div className="text-color-red font-size-secondary">root@belanoe:</div>
                      <div className="text-color-main font-size-main">~</div>
                      <div className="text-color-main font-size-secondary">{line.command}</div>
                    </div>
                    {line.output &&
                      line.output.split('\n').map((outputLine, idx) => (
                        <div key={idx} className="text-color-main font-size-secondary">
                          {outputLine}
                        </div>
                      ))}
                  </div>
                ))}

                {/* Command Input */}
                <form onSubmit={handleCommandSubmit} className="flex-row align-center flex-gap-10p">
                  <div className="text-color-red font-size-secondary">root@belanoe:</div>
                  <div className="text-color-main font-size-main">~</div>
                  <input
                    type="text"
                    value={currentCommand}
                    onChange={(e) => setCurrentCommand(e.target.value)}
                    autoFocus
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      outline: 'none',
                      color: 'var(--text-color-main)',
                      width: '100%',
                      fontSize: 'var(--font-size-secondary)',
                      fontFamily:'"Inconsolata", sans-serif',
                      padding:"0"
                    }}
                  />
                </form>
              </div>
              
            </div>

        </div>}
      {/* End of content for interactive site */}


      {/* Content for static site */}
        {siteType === "static" && 
          <div className='home-flex-container z-index-1 w-100 align-center text-color-main'>
            <div className="flex-column flex-gap-5p w-50-none-mobile">
              <div id="text-1" className="font-size-huge animate__animated visibility-hidden">Béla Noé</div>
              <div id='text-2' className="font-size-huge animate__animated visibility-hidden">Softwareentwickler</div>
              <div id="text-3" className="font-size-huge animate__animated visibility-hidden">7 Jahre Erfahrung</div>
            </div>

            <div className="glass-card-grey static-profile-card flex-column  flex-gap-1rem home-profileCard-static">
                <div className="w-100 flex-row justify-center">
                  <div className="circle w-100p h-100p flex-column justify-center align-center">
                      <FontAwesomeIcon icon={faUser} size='2x' className="text-color-white"></FontAwesomeIcon>
                  </div>
                </div>

                <div className="h2 animate__animated animate__fadeInDown">Alter: {ageOfMe}</div>
                <div className="h2 animate__animated animate__fadeInDown">Beruf: Softwareentwickler</div>
                <div className="h2 animate__animated animate__fadeInDown">Sprachen: Deutsch, Englisch</div>
                <div className="h2 animate__animated animate__fadeInDown">Aktuellstes Projekt: <a href="https://elgio.de" target="_blank" rel="noopener noreferrer" className='text-color-blue no-text-decoration'>ELGIO</a>  </div>
                <span>
                  <div className='h2 animate__animated animate__fadeInDown'>Aktueller Techstack :</div>
                      <div className="flex-row techstack-container  animate__animated animate__fadeInDown">
                          { 
                          Object.keys(techStack).map((entry) => {
                            if(techStack[entry].svg){
                              return(
                                <div className="techstack-child-container" key={entry}>
                                  <img src={techStack[entry].svgPath} alt={techStack[entry].name} className={`techstack-child-icon${techStack[entry].svgClassName !== undefined ? " " + techStack[entry].svgClassName : ''}`}></img>
                                  <span className='techstack-child-name'>{techStack[entry].name}</span>
                                </div>
                              )
                            }
                            else{
                              return(
                                <div className="techstack-child-container" key={entry}>
                                  <FontAwesomeIcon icon={techStack[entry].icon} className={`techstack-child-icon${techStack[entry].iconClassName !== undefined ? " " + techStack[entry].iconClassName : ''}`}></FontAwesomeIcon>
                                  <span className='techstack-child-name'>{techStack[entry].name}</span>
                                </div>
                              )
                            }
                          })
                          }
                      </div>
                </span>
                <div className="h2"></div>
            </div>
          </div>
        }
      {/* End of content for static site */}

    </div>
  );
}

export default Home;
