import React, { useState } from 'react';
import mainLogo from '../assets/mainlogo.png';
import './Navbar.css';

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
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Books</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Sell</a></li>
                    </ul>
                    <button id='login'>Login</button>
                    <button id='signup'>SignUp</button>
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