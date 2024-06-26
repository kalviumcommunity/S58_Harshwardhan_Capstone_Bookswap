import React, { useState, useEffect } from 'react';
import mainLogo from '../assets/mainlogo.png';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('isLoggedIn') === 'true';
        setIsLoggedIn(loggedInStatus);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:3000/Users/Logout');
            localStorage.removeItem('isLoggedIn');
            setIsLoggedIn(false);
            alert('You have been logged out.');
            document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; // Clear cookie on the client-side
            navigate('/'); // Navigate to login page after logout
        } catch (error) {
            console.error('An error occurred while logging out:', error);
        }
    };

    return (
        <>
            <nav>
                <div className="logo">
                    <img src={mainLogo} alt="Main Logo"/>
                </div>
                <div className="menu">
                    <ul>
                        <Link to="/"><li>Home</li></Link>
                        <a href=""><li>Books</li></a>
                        <Link to="/aboutpage"><li>About</li></Link>
                        <Link to="/add"><li>Sell</li></Link>
                    </ul>
                    {isLoggedIn ? (
                        <button id='logout' onClick={handleLogout}>Logout</button>
                    ) : (
                        <Link to="/login"><button id='login'>Login</button></Link>
                    )}
                    {!isLoggedIn && <Link to="/signup"><button id='signup'>SignUp</button></Link>}
                    <div className="hamburger-menu" onClick={toggleMenu}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div> 
            </nav>
            <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
                <div className="close-icon" onClick={toggleMenu}>&times;</div>
                <h3>category</h3>
            </div>
        </>
    );
}

export default Navbar;