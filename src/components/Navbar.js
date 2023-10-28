import { Component, useState } from "react";
import "./NavbarStyles.css";
import { BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';

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
                        <Link to="/" style={{ textAlign: 'center'}}>
                        <i className="fa-solid fa-house-user"></i> Home
                        </Link>
                    </li>

                    {/* <li>
                        <a href="index.html">
                            <i className="fa-solid fa-gear"/>
                            Account
                            </a>
                    </li> */}

                    <li>
                        <Link to="/techSupportPage" style={{ textAlign: 'center'}}>
                            <i className="fa-solid fa-envelope"></i> Support
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar;