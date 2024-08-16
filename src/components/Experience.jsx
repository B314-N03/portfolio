import { OrbitControls } from '@react-three/drei'
import React from 'react'

function Experience() {

    return (
        <>
        <OrbitControls />
        <mesh>
            <boxGeometry />
            <meshBasicMaterial />
        </mesh>
        </>
    )
}

export default Experience