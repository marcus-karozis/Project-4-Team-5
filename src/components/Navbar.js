import { Component, useState } from "react";
import "./NavbarStyles.css";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Dropdown from './Dropdown'
function Navbar() {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(!clicked);
    };




    // state={clicked: false};
    // handleClick = () =>{
    //     this.setState({clicked: !this.state.clicked})
    // }
    // render(){

    const [dropdown, setDropdown] = useState(false);
    return (
        <>
            <nav>
                          
                <i id="logo" className="fab fa-react"></i>

                <div className="menu-icons">
                    <i onClick={handleClick} className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <ul className={clicked ? "navbar active" : "navbar"}>
                    <li>

                        <Link to="/dashboard" style={{ textAlign: 'center' }}>
                            <i className="fa-solid fa-house-user"></i> Home
                        </Link>
                    </li>
                    {/* <li className="menu-items">
                        <a href="index.html">
                            <i className="fa-solid fa-gear"></i>
                            Account
                        </a>
       
                    </li> */}

                    <li>
                        <a  href="#" role="button" className="dropdown-btn"  aria-haspopup="menu" aria-expanded={dropdown ? "true" : "false"}
                            onClick={() => setDropdown((prev) => !prev)}>
                            Account
                        </a>
                        <Dropdown dropdown={dropdown} />
                    </li>
                    <li>
                        <Link to="/techSupportPage" style={{ textAlign: 'center' }}>
                            <i className="fa-solid fa-envelope"></i> Support
                        </Link>
                    </li>
                </ul>

            </nav>
        </>
    )
}
// }

export default Navbar;