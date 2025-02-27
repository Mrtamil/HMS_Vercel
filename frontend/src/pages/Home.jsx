import React from 'react'
import Header from '../component/Header'
import SpecialityMenu from '../component/SpeciMenu'
import TopDoctors from '../component/TopDoc'
import Banner from '../component/Banner'

const Home = () => {
  return (
    <div>
  <Header/>
  <SpecialityMenu/>
  <TopDoctors/>
  <Banner/>
    </div>
  )
}

export default Home
