import React from "react";
import { Link } from "react-router-dom"
import './Header.scss';
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
                    <Link to="/">
                        <Navbar.Text className="header__navbar-brand">
                            <span className="header__navbar-brand"><i class="fas fa-paw"></i> Pupcorner</span>
                        </Navbar.Text>
                    </Link>
                </Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Link to="/">
                        <Navbar.Text>
                            <span className="header__navbar-about">About Us</span>
                        </Navbar.Text>
                    </Link>
                </Navbar.Collapse>    
        </Navbar> 
    </>
)

export default Header;