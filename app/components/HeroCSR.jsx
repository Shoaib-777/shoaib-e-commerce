"use client"
import dynamic from 'next/dynamic'
import React from 'react'


const Hero = dynamic(() => import("./Hero"), { ssr: false })
const HeroCSR = () => {
    return (
        <Hero />
    )
}

export default HeroCSR