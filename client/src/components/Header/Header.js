import React from "react";
import { Link } from "react-router-dom";
import './Header.scss';
import logoSmall from '../../assets/images/pupcorner-logo-small.png'
import Navbar from 'react-bootstrap/Navbar';

const Header = () => (
    <header className="header">
        <nav className="header__navbar">
            <Navigation />
        </nav>
    </header>
)

const Navigation = () => (
    <>
        <Navbar sticky="top">
                <Navbar.Brand>
                    <div className="link-wrapper">
                        <Link to="/">
                            <Navbar.Text>
                            <img className="header__logo" src={logoSmall} alt="pupcorner logo" /><span className="header__navbar-brand link hover">Pupcorner</span>
                            </Navbar.Text>
                        </Link>
                    </div>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <div className="link-wrapper">
                        <Link to="/about">
                            <Navbar.Text>
                                <span className="header__navbar-about link hover">About Us</span>
                            </Navbar.Text>
                        </Link>
                    </div>
                </Navbar.Collapse>    
        </Navbar> 
    </>
)

export default Header;