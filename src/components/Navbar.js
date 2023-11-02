import { Component, useState, useEffect } from "react";
import "./NavbarStyles.css";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

function Navbar() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };


    //light or dark mode
    const [theme, settheme] = useState(false)
 
    const handleToggle = () => {
    settheme(!theme);
    document.body.dataset.theme = theme;
    };

    useEffect(() => {
        const data = window.localStorage.getItem('THEME_STATE');
        if ( data !== null ) settheme(JSON.parse(data));
    }, []);

    useEffect(() => {
        window.localStorage.setItem('THEME_STATE', JSON.stringify(theme));
    }, [theme]);


    return(
        <>
            <nav>
                {/* logo */}
                <div className="theme-icons">
                    <i onClick={handleToggle} className={theme ? "fas fa-moon" : "fas fa-sun"}></i>
                </div>
                
                <div className="menu-icons">
                    <i onClick={handleClick} className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <ul className={clicked ? "navbar active" : "navbar"}>
                    <li>
                        <Link to="/dashboard" >
                            <i className="fa-solid fa-house-user"></i> Home
                        </Link>
                    </li>
                    <li><Link to="/history">
                        <i className="fa-solid fa-clock-rotate-left"></i>
                        History</Link>
                    </li>
                    <li><Link href="index.html">
                        <i className="fa-solid fa-gear"></i>
                        Account</Link>
                    </li>
                    <li>
                        <Link to="/techSupportPage">
                            <i className="fa-solid fa-envelope"></i> Support
                        </Link>
                    </li>
                    <li>
                        <Link to="/tickets" style={{ textAlign: 'center'}}>
                            <i className="fa-solid fa-ticket"></i> Tickets
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;