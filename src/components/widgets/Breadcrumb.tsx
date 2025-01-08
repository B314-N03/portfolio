import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useNavigate } from 'react-router-dom';

const siteMap = {
    Home: "/",
    "Über mich": "/about",
    Projekte: "/projects",
    Kontakt: "/contact",
    Impressum: "/impressum",
    Login: "/login",
  } as const;
  
  type SiteMapKeys = keyof typeof siteMap;
  
  interface BreadcrumbProps {
    name?: SiteMapKeys;
    subname?: string;
  }

function Breadcrumb({name="Home",subname=""} : BreadcrumbProps): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className='breadcrumb h4 w-fit-content z-index-1'>
        <FontAwesomeIcon className='cursor-pointer' onClick={() => navigate(-1)} icon={faChevronLeft as IconProp}></FontAwesomeIcon>
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