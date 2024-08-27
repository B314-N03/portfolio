import React from 'react'
import Breadcrumb from './Breadcrumb'
import './scss/coming-soon.scss'
import Lottie from 'lottie-react'
import UnderConstruction from '../assets/lottie-animations/UnderConstruction.json'

function ComingSoon() {
  return (
    <div className="content justify-center align-center ">
        <div className="coming-soon">
            <div className="h1 text-color-main">Diese Seite existiert noch nicht!</div>
            <Lottie animationData={UnderConstruction} className='w-200p h-200p' loop={true}></Lottie>
            <div className="h2 text-color-secondary">Hier wird noch dran gearbeitet!</div>
        </div>

    </div>
)
}

export default ComingSoon