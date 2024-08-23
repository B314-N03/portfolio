import React from 'react'
import './scss/footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareGithub, faSquareInstagram, faXingSquare } from '@fortawesome/free-brands-svg-icons'


function Footer() {
  return (
    <div className='footer'>

        {/* Menu */}
        <div className="flex-gap-3rem flex-wrap footer-menu-conatiner" >
            <div className="flex-column flex-gap-1rem h-100">
                <div className="fs-1 underline"><strong>Main</strong></div>
                <div className="ml-10 flex-column flex-gap-1rem fs-3 te">
                    <a className='navbar-item' href="/">Home</a>
                    <a className='navbar-item' href="/about">Über mich</a>
                    <a className='navbar-item' href='/projects'>Projekte</a>
                    <a className='navbar-item' href='/contact'>Kontakt</a>
                </div>
            </div>
            <div className="footer-seperator"></div>
            <div className="flex-column flex-gap-1rem h-100">
                <a href='/other' className="fs-1 underline footer-sonstiges-containter navbar-item" data-underline><strong>Sonstiges</strong></a>
                <div className="ml-10 flex-column flex-gap-1rem fs-3">
                    <a href="/other/side-projects" className='navbar-item'>Nebenprojekte</a>
                    <a href="/other/cv" className='navbar-item'>Lebenslauf</a>
                    <a href='/other/impressum' className='navbar-item'>Impressum</a>
                </div>
            </div>
            <div className="footer-seperator"></div>
            <div className="flex-column flex-gap-1rem h-100">
                <div className="fs-1 underline"><strong>Social Media</strong></div>
                <div className="ml-10 flex-column flex-gap-1rem fs-3 align-center">
                    <a href='https://instagram.com/bela.fn' target='_blank' rel="noreferrer" className='navbar-item footer-social-media-link'>
                        <FontAwesomeIcon className='footer-icon' icon={faSquareInstagram}></FontAwesomeIcon>
                        <label className="footer-social-media-label">Instagram</label>
                    </a>
                    <a href='https://github.com/B314-N03' target='_blank' rel="noreferrer" className='navbar-item footer-social-media-link'>
                        <FontAwesomeIcon className='footer-icon' icon={faSquareGithub}></FontAwesomeIcon>
                        <label className="footer-social-media-label">GitHub</label>

                    </a>
                    <a href='https://www.xing.com/profile/Bela_Noe2' target='_blank' rel="noreferrer" className='navbar-item footer-social-media-link'>
                        <FontAwesomeIcon className=' footer-icon w-25%' icon={faXingSquare}></FontAwesomeIcon>
                        <label className="footer-social-media-label">Xing</label>
                    </a>
                </div>
            </div>
        </div>

        <div className="mt-20 h4 text-align-center w-100">
            <div>© {new Date().getFullYear()} Béla Noé</div>
            <div>All rights reserved</div>
        </div>


    </div>
  )
}

export default Footer