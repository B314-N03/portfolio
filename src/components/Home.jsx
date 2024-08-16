import React from 'react'
import Breadcrumb from './Breadcrumb'
import  './scss/home.scss'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

function Home() {
  return (
    <div className='content'>
      <Breadcrumb name="Home"/ >
      {/* <Canvas className=' '>
        <Experience />
      </Canvas>  */}
      <div className="home-profileCard-container">
        <div className="home-profileCard">

        <div className='h1 text-color-main p-35p'>Hallo, ich bin Béla Noé.<br/></div>
        </div>

      </div>
    </div>
  )
}

export default Home