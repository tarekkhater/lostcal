import React, { useEffect } from 'react'
import "./Home.css"
import Header from '../../Components/HomeLayout/Header'
import Landing from '../../Components/HomeLayout/Landing'
import Services from '../../Components/HomeLayout/Services'
import WhatWeDo from '../../Components/HomeLayout/WhatWeDo'
import About from '../../Components/HomeLayout/About'
import Contact from '../../Components/HomeLayout/Contact'
import { useSelector } from 'react-redux'


const Home = () => {
  return (
    <div className='home'>
        <Header/>
        <Landing/>
        <Services/>
        <WhatWeDo/>
        <About/>
        <Contact/>
    </div>
  )
}

export default Home