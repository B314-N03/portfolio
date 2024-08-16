import React from 'react'
import './scss/footer.scss'


function Footer() {
  return (
    <div className='footer'>

        {/* Menu */}
        <div className="flex-gap-3rem flex-wrap footer-menu-conatiner" >
            <div className="flex-column flex-gap-1rem h-100">
                <div className="fs-1 underline"><strong>Main</strong></div>
                <div className="ml-10 flex-column flex-gap-1rem fs-3">
                    <div>Home</div>
                    <div>Über mich</div>
                    <div>Projekte</div>
                    <div>Kontakt</div>
                </div>
            </div>
            <div className="footer-seperator"></div>
            <div className="flex-column flex-gap-1rem h-100">
                <div className="fs-1 underline footer-sonstiges-containter" ><strong>Sonstiges</strong></div>
                <div className="ml-10 flex-column flex-gap-1rem fs-3">
                    <div>Nebenprojekte</div>
                    <div>Lebenslauf</div>
                    <div>Impressum</div>
                </div>
            </div>
            <div className="footer-seperator"></div>
            <div className="flex-column flex-gap-1rem h-100">
                <div className="fs-1 underline"><strong>Social Media</strong></div>
                <div className="ml-10 flex-column flex-gap-1rem fs-3">
                    <div>Home</div>
                    <div>About</div>
                    <div>Contact</div>
                    <div>Projects</div>
                </div>
            </div>
        </div>

        <div className="h2">© 2024 Bela Noe</div>
        <div className="h2">All rights reserved</div>

    </div>
  )
}

export default Footer