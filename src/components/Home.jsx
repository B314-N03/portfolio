import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import './scss/home.scss';
import backgroundVideo from '../assets/videos/Background_video.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faCode, faMinus, faPlus, faTerminal, faUser } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [cardFlipped, setCardFlipped] = useState(false);
  const [terminalLines, setTerminalLines] = useState([{ command: '', output: '' }]);
  const month = new Date().getMonth();
  const day = new Date().getDate();
  const monthsMap = {
    0: "Jan",
    1: "Feb",
    2: "Mar",
    3: "Apr",
    4: "May",
    5: "Jun",
    6: "Jul",
    7: "Aug",
    8: "Sep",
    9: "Oct",
    10: "Nov",
    11: "Dec"
  }


  useEffect(() => {
 // Original permissions before chmod +x (rw-rw-r--)
 const initialPermissionsLine = "-rw-rw-r-- 1 root root 6.6K  " +  monthsMap[month] + " " + day  +  " portfolio.sh";

 // Updated permissions after chmod +x (rwxrwxr-x)
 const updatedPermissionsLine = "-rwxrwxr-x 1 root root 6.6K  " +  monthsMap[month] + " " + day  +  " portfolio.sh";
   
 const exec = async () => {
  const typeCommand = async (commandText, outputTextArray) => {
    let currentLine = { command: '', output: '' };

    // Typing out the command
    for (let i = 0; i < commandText.length; i++) {
      currentLine.command += commandText[i];
      setTerminalLines((prevLines) => {
        const updatedLines = [...prevLines];
        updatedLines[updatedLines.length - 1] = { ...currentLine };
        return updatedLines;
      });
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    await new Promise((resolve) => setTimeout(resolve, 500)); // Pause before showing the output

      // Adding the output line by line with random delays
      for (let i = 0; i < outputTextArray.length; i++) {
        currentLine.output += (i > 0 ? '\n' : '') + outputTextArray[i];
        setTerminalLines((prevLines) => {
          const updatedLines = [...prevLines];
          updatedLines[updatedLines.length - 1] = { ...currentLine };
          return updatedLines;
        });

        const randomDelay = Math.floor(Math.random() * 2000) + 1000; // Random delay between 1-10 seconds
        await new Promise((resolve) => setTimeout(resolve, randomDelay));
      }

      // Add a new line for the next command
      setTerminalLines((prevLines) => [...prevLines, { command: '', output: '' }]);
    };

    setTimeout(async () => {
      // Show the file with its initial permissions
      await typeCommand("ls -l", [initialPermissionsLine]);

      // Apply chmod +x and show the command
      await typeCommand("chmod +x portfolio.sh", []);

      // Show the file with its updated permissions
      await typeCommand("ls -l", [updatedPermissionsLine]);

        await typeCommand("./portfolio.sh", [
          "Initializing...",
          "Loading configurations...",
          "Starting server...",
          "Fetching initial data...",
          "Server initialized successfully.",
          "Done!",
          "Now starting Portfolio please Stand By...",
        ]);
      
        // After the initialization completes, trigger the fade-out/fade-in animation
        document.getElementById("terminal-body").classList.add("animate__fadeOut");
        setTimeout(() => {
          document.getElementById("terminal-body").classList.remove("flex-column");
          document.getElementById("terminal-body").classList.add("d-none");
          document.getElementById("profileCard-body").classList.remove("d-none");
          document.getElementById("profileCard-body").classList.add("animate__fadeIn");
        }, 1000); // Adjust the delay to match the duration of the fadeOut animation
      }, 2000);
    };
  
    exec();
  }, []);

  const handleMouseEnterTerminalIcon = (id) => {
    document.getElementById(id).style.opacity = '1';
  };

  const handleMouseLeaveTerminalIcon = (id) => {
    document.getElementById(id).style.opacity = '0';
  };

  const handleCardFlip = () => {
    document.getElementsByClassName("home-profileCard")[0].classList.toggle("flipped");
    setTimeout(() => {
      setCardFlipped(!cardFlipped);
    }, 270);
  };

  return (
    <div className='content'>
      <video autoPlay muted playsInline loop unselectable='true' disablePictureInPicture id="myVideo" className='home-video' src={backgroundVideo}></video>
      <Breadcrumb name="Home" />
      <div className="home-profileCard-container min-height-60vh">
        <div
          className="home-profileCard cursor-pointer">
            <div className="home-profileCard-header">
              <div className="home-profileCard-header-icon-container">
                <div className="bg-color-red terminal-header-icon" onMouseEnter={() => handleMouseEnterTerminalIcon("terminal-icon-red")} onMouseLeave={() => handleMouseLeaveTerminalIcon("terminal-icon-red")}>
                  <FontAwesomeIcon icon={faClose} fontSize={"14px"} id="terminal-icon-red"></FontAwesomeIcon>
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
                  <div className="text-color-white font-size-main">~</div>
                  <div className="text-color-white font-size-secondary">{line.command}</div>
                </div>
                {line.output && line.output.split('\n').map((outputLine, idx) => (
                  <div key={idx} className="text-color-white font-size-secondary">
                    {outputLine}
                  </div>
                ))}
              </div>
            ))}
            </div>
            <div className="home-profileCard-body animate__animated d-none" id='profileCard-body'>
              <div className="home-profileCard-left">
                <div className="h1 p-35p max-w-500p min-w-200p">
                  Hi, ich bin Béla <br /> und bin Softwareentwickler. Mit über 7 Jahren Erfahrung und Kenntnissen in mehr als 6 Sprachen, zeige ich dir hier meine Projekte.
                </div>
              </div>

              <div className="home-profileCard-right w-100 p-35p flex-column flex-gap-10p">
                <div className="w-100 justify-center align-center flex-row">
                  <div className="circle w-100p h-100p flex-column justify-center align-center">
                    <FontAwesomeIcon icon={faUser} size='2x' className="text-color-white"></FontAwesomeIcon>
                  </div>
                </div>

                <div className="w-100 padding-t-20 justify-center align-center flex-row">
                  <div className=" flex-column justify-center  flex-gap-1rem">
                    <span>
                      Name : Béla 
                    </span>
                    <span>
                      Alter : 21
                    </span>
                    <span>
                      Beruf : Softwareentwickler
                    </span>
                    <span>
                      Sprachen : Englisch, Deutsch
                    </span>
                    <span>
                      Aktuelles Projekt : ELGIO 
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

      </div>
    </div>
  );
}

export default Home;
