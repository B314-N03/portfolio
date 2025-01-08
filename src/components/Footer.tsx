import { useContext } from 'react'
import './scss/footer.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareGithub, faSquareInstagram, faXingSquare } from '@fortawesome/free-brands-svg-icons'
import { SiteContext } from './providers/SiteProvider';
import { faFileDownload } from '@fortawesome/free-solid-svg-icons';
import cv from '../assets/pdf/lebenslauf_bela.pdf'
import { IconProp } from '@fortawesome/fontawesome-svg-core';

function Footer(): JSX.Element {
    const {siteType} = useContext(SiteContext);
    return (
        <div className={`footer${siteType !== 'static' ? " d-none" : ""}`}>

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
                <div className="fs-1 underline"><strong>Sonstiges</strong></div>
                <div className="ml-10 flex-column flex-gap-1rem fs-3">
                        <a href={cv} download target='_blank' rel="noreferrer" className='navbar-item flex-row flex-gap-1rem'>
                            Lebenslauf
                            <FontAwesomeIcon className='white' icon={faFileDownload as IconProp}></FontAwesomeIcon>
                        </a>
                        <a href='/impressum' className='navbar-item'>Impressum</a>
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