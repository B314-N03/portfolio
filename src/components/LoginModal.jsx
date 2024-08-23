import React, { useEffect, useRef, useState } from 'react'
import './scss/modal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

function LoginModal({modalOpen,setModalOpen,loggedIn,setLoggedIn}) {
  const modalRef = useRef(null)
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [loginModalMenuState, setLoginModalMenuState] = useState(0)

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }


  const handleClickOutside = (event) => {
    const loginButton = document.querySelector("#login-button")
    if (modalRef.current && !modalRef.current.contains(event.target) && loginButton && !loginButton.contains(event.target)) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if(modalOpen){
      document.addEventListener("mousedown", handleClickOutside);
    }
    else{
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const handleSubmit = () => {
    setModalOpen(false)
    setLoggedIn(true)
  }

  return (
    <div className={`login-modal ${modalOpen ? "d-flex" : "d-none"}`}>
      <div ref={modalRef} className={`login-modal-container`}>
          <div className="login-modal-close-button" onClick={() => setModalOpen(false)}>
            <FontAwesomeIcon icon={faXmark} size='2x'/>
          </div>
        <div className="login-modal-content">
          <div className="h1 login-modal-title ">{loginModalMenuState === 0 ? "Login" : "Registrierung "}</div>
          <div className="login-modal-form">
            <div className="login-modal-inputs-container flex-column flex-gap-1rem w-100">
              <div className='flex-column flex-gap-10p'>
                <label for="login-modal-input-email" className='text-color-main'>Email</label>
                <input className="login-modal-input" name='login-modal-input-email' type="text" placeholder="Gib deine Email ein"/>
              </div>
              <div className='flex-column flex-gap-10p'>
                <label for="login-modal-input-password" className='text-color-main'>Passwort</label>
                <input className="login-modal-input" name='login-modal-input-password' type="text" placeholder="Gib dein Passwort ein"/>
              </div>
            <div className="login-modal-forgot-password">Passwort vergessen?</div>
            </div>
            <button onClick={handleSubmit} className="login-modal-button" id="login-button">{loginModalMenuState === 0 ? "Login" : "Account erstellen"}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModal