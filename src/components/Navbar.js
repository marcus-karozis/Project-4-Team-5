import { Component, useState } from "react";
import "./NavbarStyles.css";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

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
    return (
        <>
            <nav>

                <i id="logo" className="fab fa-react"></i>

                <div className="menu-icons">
                    <i onClick={handleClick} className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
                </div>

                <ul className={clicked ? "navbar active" : "navbar"}>
                    <li>
                        {/* <a className="active" href="index.html">
                        <i className="fa-solid fa-house-user"></i>
                        Home
                    </a> */}
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
                </ul>
            </nav>
        </>
    )
}
// }

export default Navbar;