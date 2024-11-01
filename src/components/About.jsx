/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef } from 'react'
import Breadcrumb from './Breadcrumb'
import Bela from "../assets/images/bela.webp"
import { Link } from 'react-router-dom'
import './scss/about.scss'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap, faStar, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from './providers/ThemeProvider'

function About() {
  const {theme} = useContext(ThemeContext);

  const paragraphRefs = useRef([]) 

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible') 
          }
          if (!entry.isIntersecting) {
            entry.target.classList.remove('visible')
          }

        })
      },
      { threshold: 0.1 }
    )

    paragraphRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })



    return () => {
      paragraphRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <div className="content">
      <Breadcrumb name="Über mich"/>
      <div className="w-100">
        <div className="text-color-main m-20 flex-row align-center justify-center flex-gap-1rem">
           <div className="h4 ovalButton" onClick={() => document.getElementById("timeline").scrollIntoView({behavior: "smooth"})}>Zu den Beruflichen Erfahrungen</div>
        </div>
      </div>
      <div className="w-100 flex-row justify-center align-center">
          <img src={Bela} className="min-w-200p max-w-400p" alt="" />
      </div>

      <div className="w-100 flex-gap-1rem about-container">

        <div className="h4 text-color-main min-w-150p max-w-800p flex-column align-center">
          <p className='slide-in-left paragraph' ref={(el) => (paragraphRefs.current[0] = el)}>
            <b>Hi, ich bin Béla</b>, 21 Jahre alt und seit rund 7 Jahren begeisterter Entwickler und IT-Enthusiast.
            <br />Meine Reise in die IT begann früh durch meinen Vater, der ebenfalls in diesem Bereich tätig ist.
            <br />Schon mit 9 Jahren begann ich, die ersten technischen Zusammenhänge zu verstehen, als ich herausfand, dass sich die Internetsperre, welche mein Vater eingeschaltet hatte, durch das Ändern der IP-Adresse umgehen ließen.
          </p>
          
          <p className='slide-in-right paragraph' ref={(el) => (paragraphRefs.current[1] = el)}>
            Meine erste Leidenschaft galt der Cybersecurity. Mit 14 Jahren fing ich an mir selbst das Hacking mit Linux (beginnend mit Kali Linux) beizubringen.
            <br />Eines meiner ersten Projekte war das Hacken meines eigenen Android-Geräts mittels einer modifizierten APK-Datei.
            <br />Über Plattformen wie TryHackMe und HackTheBox erweiterte ich meine Kenntnisse in der Cybersecurity und lernte Tools wie nmap, Metasploit, und SMB-Exploits (z.B. EternalBlue) kennen. 
            <br />Auch meine Facharbeit in der 11. Klasse drehte sich um die Sicherheitslücken, die durch ungepatchte Systeme entstehen können, und wie man sich davor schützt.
          </p>
          
          <p className='slide-in-left paragraph' ref={(el) => (paragraphRefs.current[2] = el)}>
            Parallel zur Cybersecurity entdeckte ich in der 7. Klasse meine Begeisterung für das Programmieren.
            <br /> Seitdem habe ich mir durch verschiedene Projekte eine Vielzahl von Sprachen und Frameworks angeeignet, darunter Java, Python, JavaScript, React.JS, Angular, Vue3, PHP, Dart/Flutter und mehr.
          </p>
          
          <p className='slide-in-right paragraph' ref={(el) => (paragraphRefs.current[3] = el)}>
            Ende 2021 schloss ich mich dem Startup <a href="https://elgio.de" className="text-color-blue no-text-decoration font-weight-bold" target="_blank" rel="noopener noreferrer">ELGIO</a> an, das von Freunden von mir gegründet wurde. 
            <br />Dort entwickelte ich unter anderem ein Dashboard für Veranstalter, das ihnen ermöglicht, Events zu erstellen, Statistiken einzusehen, ein umfassendes Ticketing-System zu verwalten und vieles mehr.
            <br />Die Codebase des Dashboards umfasst etwa 30.000 Zeilen.
            Meine Arbeit bei ELGIO hat mir wertvolle Erfahrungen sowohl im Frontend- (primär) als auch im Backend-Bereich (mit Node.js) ermöglicht.
          </p>

          <p className='slide-in-left paragraph' ref={(el) => (paragraphRefs.current[4] = el)}>
            Nach meinem Abitur im Juni 2022 ging ich zur Bundeswehr und leistete dort 19 Monate Freiwilligen Wehrdienst in einer IT-Einheit.
            <br/>Dabei sammelte ich erste Eindrücke in der Netzwerktechnik und stärkte meine Selbstdisziplin, indem ich immer wieder meine Komfortzone verließ.
          </p>

          <p className='slide-in-right paragraph' ref={(el) => (paragraphRefs.current[5] = el)}>
            Nach meiner Zeit bei der Bundeswehr arbeitete ich für sechs Monate (01.03.2024–01.09.2024) als Frontend- und Fullstack-Entwickler bei eTailer solutions.
            <br />Dort lernte ich PHP und baute template-basierte Frontends mit Smarty.
            <br />Auch diese Erfahrung trug maßgeblich zu meinem Wachstum als Entwickler bei.
          </p>

          <p id='timeline' className='slide-in-left paragraph' ref={(el) => (paragraphRefs.current[6] = el)}>
            In den letzten Jahren habe ich zahlreiche spannende Projekte und Skripte entwickelt.
            <br />Schau sie dir gerne <Link to="/projects" onClick={() => window.scrollTo(0, 0)} className="text-color-blue no-text-decoration font-weight-bold">hier</Link> an!
          </p>
        </div>
        <div className='w-100'>
          <VerticalTimeline lineColor={theme === 'dark' ? '#fff' : '#121212'}>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'var(--bg-color-secondary)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  var(--bg-color-secondary)' }}
              iconStyle={{ background: '#ff0000', color: '#fff' }}
              icon={<FontAwesomeIcon icon={faSuitcase} />}
              dateClassName='text-color-blue h4 font-weight-bold'
              date='01.03.2024 - 01.09.2024'
            >
              <h3 className="vertical-timeline-element-title">Junior Frontend Developer</h3>
              <h4 className="vertical-timeline-element-subtitle">Remote, etailer solutions</h4>
              <p>
                Erstellung Template-basierter Frontends. <br />
                Frontend via Smarty, Backend via PHP
              </p>
            </VerticalTimelineElement>
          
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'var(--bg-color-secondary)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  var(--bg-color-secondary)' }}
              iconStyle={{ background: '#ff0000', backgroundSize: 'cover', color: '#fff' }}
              icon={<FontAwesomeIcon icon={faSuitcase} />}
              dateClassName='text-color-blue h4 font-weight-bold'
              date='01.07.2022 - 31.01.2024'
            >
              <h3 className="vertical-timeline-element-title">IT Soldat</h3>
              <h4 className="vertical-timeline-element-subtitle">Bundeswehr</h4>
              <p>
                IT-Soldat, Netzwerktechnik, Soldatische Tätigkeiten
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'var(--bg-color-secondary)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  var(--bg-color-secondary)' }}
              iconStyle={{ background: '#ff0000', color: '#fff' }}
              icon={<FontAwesomeIcon icon={faSuitcase} />}
              dateClassName='text-color-blue h4 font-weight-bold'
              date='Ende 2021 - Jetzt'  
            >
              <h3 className="vertical-timeline-element-title">Frontend Developer</h3>
              <h4 className="vertical-timeline-element-subtitle">Köln, ELGIO</h4>
              <p>
                UI/UX, Frontend Developer, Backend Developer, App Developer
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'var(--bg-color-secondary)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  var(--bg-color-secondary)' }}
              iconStyle={{ background: 'var(--blue)', color: '#fff' }}
              icon={<FontAwesomeIcon icon={faGraduationCap} />}
              dateClassName='text-color-blue h4 font-weight-bold'
              date='09.2013 - 06.2022'  
            >
              <h3 className="vertical-timeline-element-title">Schüler</h3>
              <h4 className="vertical-timeline-element-subtitle">Bonn, Carl-von-Ossietzky Gymnasium</h4>
              <p>
                Abitur mit den Leistungskursen: Englisch (C1) & Pädagogik
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement icon={<FontAwesomeIcon icon={faStar}/>} iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }} ></VerticalTimelineElement>
          </VerticalTimeline>
        </div>


      </div>

    </div>
  )
  
}

export default About