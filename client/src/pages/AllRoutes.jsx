import React from 'react'
import { Route, Routes } from 'react-router-dom';
import MainPage from './MainPage';
import AddBookPage from './AddBookPage';
import LoginPage from './LoginPage';
import SignUp from './SignUp';
import AboutPage from './AboutPage';

function AllRoutes() {
  return (
    <>
    <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/aboutpage" element={<AboutPage/>} />
    </Routes>
    </>
    
  )
}

export default AllRoutes