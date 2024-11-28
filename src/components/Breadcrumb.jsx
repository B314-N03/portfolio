import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Breadcrumb({name="",subname=""}) {
  const navigate = useNavigate();

  const siteMap = {
    "Home": "/",
    "Über mich": "/about",
    "Projekte": "/projects",
    "Kontakt": "/contact",
    "Impressum": "/impressum",
    "Login" : "/login"
  }

  return (
    <div className='breadcrumb h4 w-fit-content'>
        <FontAwesomeIcon className='cursor-pointer' onClick={() => navigate(-1)} icon={faChevronLeft}></FontAwesomeIcon>
        {subname &&
            <>
                <Link className={subname && 'cursor-pointer no-text-decoration text-color-secondary'} to={siteMap[name]}>
                    {name}
                </Link>
                <span > / {subname}</span>
            </>
        }
        {!subname && <span>{name}</span>}
    </div>
)
}

export default Breadcrumb