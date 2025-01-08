import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ReactNode, useEffect, useState } from 'react'

interface AccordionProps{
    children: ReactNode,
    title: string,
    openPerDefault?: boolean
}

function Accordion({children,title,openPerDefault=false} :  AccordionProps): JSX.Element {
    const [open,setOpen] = useState(openPerDefault)
    useEffect(() => {
        return () => {
          if(!openPerDefault)setOpen(false)
        }
    },[openPerDefault])

    return (
        <div className='flex-column flex-gap-1rem w-100 accordion'>
            <div className="flex-row justify-between cursor-pointer" onClick={() => setOpen(!open)}>
                <div className="flex-row flex-gap-3rem w-100">
                    <div className="flex-row flex-gap-1rem">
                        <FontAwesomeIcon icon={open ? faChevronDown as IconProp : faChevronRight as IconProp} className='h3 text-color-main w-25p'></FontAwesomeIcon>
                    </div>
                    <div className="fs-1 "><strong>{title}</strong></div>
                </div>
            </div>
            {open && <div className="accordion-seperator"></div>}
            {open && children}
        </div>
)

}

export default Accordion