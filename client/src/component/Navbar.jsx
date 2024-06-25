import React, { useState } from 'react';
import mainLogo from '../assets/mainlogo.png';
import './Navbar.css';
import { Link } from 'react-router-dom'

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav>
                <div className="logo">
                    <img src={mainLogo} alt="Main Logo"/>
                </div>
                <div className="menu">
                    <ul>
                        <Link to="/"><li><a href="#">Home</a></li></Link>
                        <li><a href="#">Books</a></li>
                        <Link to="/aboutpage"><li><a href="#">About</a></li></Link>
                        <Link to="/add"><li><a href="#">Sell</a></li></Link>
                    </ul>
                    <Link to="/login"><button id='login'>Login</button></Link>
                    <Link to="/signup"><button id='signup'>SignUp</button></Link>
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div> 
            </nav>
            <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="close-icon" onClick={toggleMenu}>&times;</div>
                <h3>catogory</h3>
            </div>
        </>
    );
}

export default Navbar;