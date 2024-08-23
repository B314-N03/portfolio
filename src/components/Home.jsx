import React, { useState, useEffect } from 'react';
import Breadcrumb from './Breadcrumb';
import './scss/home.scss';
import backgroundVideo from '../assets/videos/Background_video.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faMinus, faPlus, faTerminal } from '@fortawesome/free-solid-svg-icons';

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
    const lsLine = "-rw-rw-r-- 1 root root 6.6K  " +  monthsMap[month] + " " + day  +  " portfolio.sh";
    const exec = async () => {
      const typeCommand = async (commandText, outputText) => {
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

        // Adding the output
        currentLine.output = outputText;
        setTerminalLines((prevLines) => {
          const updatedLines = [...prevLines];
          updatedLines[updatedLines.length - 1] = { ...currentLine };
          return updatedLines;
        });

        setTerminalLines((prevLines) => [...prevLines, { command: '', output: '' }]);
      };
      setTimeout( async () => {
        await typeCommand("chmod +x portfolio.sh", "");
        await typeCommand("ls -l", lsLine);
        await typeCommand("./portfolio.sh", "");
      },2000)
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
          className="home-profileCard cursor-pointer"
          onClick={handleCardFlip}
        >
          <div className={`home-profileCard-front ${cardFlipped ? "visibility-hidden" : ""}`}>
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
            <div className="home-profileCard-body flex-column flex-gap-10p p-10p">
              {terminalLines.map((line, index) => (
                <div key={index} className="home-profileCard-terminal-line">
                  <div className="flex-row flex-gap-10p align-center">
                    <div className="text-color-red font-size-secondary">root@belanoe:</div>
                    <div className="text-color-white font-size-main">~</div>
                    <div className="text-color-white font-size-secondary">{line.command}</div>
                  </div>
                  {line.output && (
                    <div className="text-color-white font-size-secondary">{line.output}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={`home-profileCard-back ${cardFlipped ? "backface-visible" : "visibility-hidden"}`}>
            <div className="home-profileCard-body">
              <div className="home-profileCard-left">
                <div className="h1 p-35p max-w-500p min-w-200p">
                  Hi, ich bin Béla <br /> und bin Softwareentwickler. Mit über 7 Jahren Erfahrung und Kenntnissen in mehr als 6 Sprachen, zeige ich dir hier meine Projekte.
                </div>
              </div>

              <div className="home-profileCard-right">
                Name : Béla
                <br />
                Beruf : Softwareentwickler
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
