/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useRef } from 'react'
import Breadcrumb from './widgets/Breadcrumb'
import Bela from "../assets/images/bela.webp"
import { Link, NavLink } from 'react-router-dom'
import './scss/about.scss'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileText, faGraduationCap, faPerson,  faStar, faSuitcase } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from './providers/ThemeProvider'
import BackgroundImage from './widgets/BackgroundImage'
import GlassCard from './widgets/GlassCard'
import { IconProp } from '@fortawesome/fontawesome-svg-core'

function About(): JSX.Element {
  const {theme} = useContext(ThemeContext);

  const paragraphRefs = useRef<(HTMLParagraphElement | null)[]>([]) 

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

    document.getElementById("about_fact_0")?.classList.add("animate__fadeInDown")
    document.getElementById("about_fact_0")?.classList.remove("visibility-hidden")
    document.getElementById("bela")?.classList.add("animate__zoomIn")
    document.getElementById("bela")?.classList.remove("visibility-hidden")
    setTimeout(() => {
      document.getElementById("about_fact_1")?.classList.add("animate__fadeInDown")
      document.getElementById("about_fact_1")?.classList.remove("visibility-hidden")
    },200)
    setTimeout(() => {
      document.getElementById("about_fact_2")?.classList.add("animate__fadeInDown")
      document.getElementById("about_fact_2")?.classList.remove("visibility-hidden")
    },400)
    setTimeout(() => {
      document.getElementById("about_fact_3")?.classList.add("animate__fadeInDown")
      document.getElementById("about_fact_3")?.classList.remove("visibility-hidden")
    },600)
    setTimeout(() => {
      document.getElementById("about_fact_4")?.classList.add("animate__fadeInDown")
      document.getElementById("about_fact_4")?.classList.remove("visibility-hidden")
    },800)
    setTimeout(() => {
      document.getElementById("about_fact_5")?.classList.add("animate__fadeInDown")
      document.getElementById("about_fact_5")?.classList.remove("visibility-hidden")
    },1000)
    // setTimeout(() => {
    //   document.getElementById("about_fact_6").classList.add("animate__fadeInDown")
    //   document.getElementById("about_fact_6").classList.remove("visibility-hidden")
    // },1200)
    return () => {
      paragraphRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])



  return (
    <div className="content">
      <BackgroundImage/>
      <Breadcrumb name="Über mich"/>
      <div className="hide-on-large w-100">
        <div className="text-color-main m-20 flex-row align-center justify-center flex-gap-1rem">
           <div className="h4 ovalButton" onClick={() => document.getElementById("timeline")?.scrollIntoView({behavior: "smooth"})}>Zu den Beruflichen Erfahrungen</div>
        </div>
      </div>
      <GlassCard bodyClassName='w-100 about-fact-container align-center z-index-1' windowIcon={faPerson as IconProp} windowTitle=''>
        <img src={Bela} id="bela" className="min-w-200p max-w-400p animate__animated visibility-hidden" alt="Image_of_me" />
        <div className="flex-row flex-gap-2rem">
          <div className="flex-column flex-gap-1rem">
            <div className="h2 text-color-main animate__animated visibility-hidden" id='about_fact_0'>Name: Béla Noé</div>
            <div className="h2 text-color-main animate__animated visibility-hidden" id='about_fact_1'>Alter: 21</div>
            {/* <div className="h2 text-color-main animate__animated visibility-hidden" id='about_fact_2'>Status: Online</div> */}
            <div className="h2 text-color-main animate__animated visibility-hidden" id='about_fact_2'>Hauptprojekt: <a href="https://elgio.de" target="_blank" rel="noreferrer" className="no-text-decoration text-color-blue">ELGIO</a></div>
            <div className="h2 text-color-main animate__animated visibility-hidden" id='about_fact_3'>Side-Project: LED Matrix, speziell das Fußball Display <NavLink to='/projects?open_demo=led-matrix' className="no-text-decoration text-color-blue">(siehe hier)</NavLink></div>
            <div className="h2 text-color-main animate__animated visibility-hidden" id='about_fact_4'>Name: Béla Noé</div>
            <div className="h2 text-color-main animate__animated visibility-hidden" id='about_fact_5'>Derzeitiger Beruf: Fullstack Entwickler (selbstständig @ELGIO)</div>
          </div>

        </div>
        </GlassCard>

      <div className="w-100 flex-gap-1rem about-container">
        <div className="h4 text-color-main min-w-150p above-1450-max-w-800p flex-column align-center">
          <GlassCard windowTitle="Über mich Text" windowIcon={faFileText as IconProp}>
            <p className='slide-in-left paragraph' ref={(el) => (paragraphRefs.current[0]  = el )}>
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
          </GlassCard>

        </div>
          <GlassCard windowIcon={faSuitcase as IconProp}  windowTitle='Berufserfahrung' containerClassName="calc-w-100-2rem" >
          <VerticalTimeline lineColor={theme === 'dark' ? '#fff' : '#121212'}>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'var(--bg-color-secondary)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  var(--bg-color-secondary)' }}
              iconStyle={{ background: '#ff0000', color: '#fff' }}
              icon={<FontAwesomeIcon icon={faSuitcase as IconProp}/>}
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
              icon={<FontAwesomeIcon icon={faSuitcase as IconProp} />}
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
              icon={<FontAwesomeIcon icon={faSuitcase as IconProp} />}
              dateClassName='text-color-blue h4 font-weight-bold'
              date='Ende 2021 - Jetzt'  
            >
              <h3 className="vertical-timeline-element-title">Frontend/Fullstack Developer</h3>
              <h4 className="vertical-timeline-element-subtitle">Köln, ELGIO</h4>
              <p>
                UI/UX, Frontend Developer, Fullstack, App Developer, API
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              contentStyle={{ background: 'var(--bg-color-secondary)', color: '#fff' }}
              contentArrowStyle={{ borderRight: '7px solid  var(--bg-color-secondary)' }}
              iconStyle={{ background: 'var(--blue)', color: '#fff' }}
              icon={<FontAwesomeIcon icon={faGraduationCap as IconProp} />}
              dateClassName='text-color-blue h4 font-weight-bold'
              date='09.2013 - 06.2022'  
            >
              <h3 className="vertical-timeline-element-title">Schüler</h3>
              <h4 className="vertical-timeline-element-subtitle">Bonn, Carl-von-Ossietzky Gymnasium</h4>
              <p>
                Abitur mit den Leistungskursen: <br />Englisch (C1) & Pädagogik
              </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement icon={<FontAwesomeIcon icon={faStar as IconProp}/>} iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }} ></VerticalTimelineElement>
          </VerticalTimeline>
          </GlassCard>



      </div>

    </div>
  )
  
}

export default About