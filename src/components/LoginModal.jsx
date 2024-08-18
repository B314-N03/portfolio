import React, { useEffect, useRef } from 'react'
import './scss/modal.scss'

function LoginModal({modalOpen,setModalOpen}) {
  const modalRef = useRef(null)


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
  }, [modalOpen]);

  return (
      <div ref={modalRef} className={`modal-container ${modalOpen ? "d-flex" : "d-none"}`}>

      </div>
  )
}

export default LoginModal