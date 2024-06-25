import React from 'react'
import './mainPage.css'
import Navbar from '../component/Navbar'
import SearchBar from '../component/SearchBar'
import Result from '../component/Result'
import Footer from '../component/Footer'

function MainPage() {
  return (
    <>
        <Navbar/>
        <SearchBar/>
        <Result/>
        <Footer/>
    </>
  )
}

export default MainPage