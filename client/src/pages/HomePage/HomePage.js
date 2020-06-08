import React, { Component } from "react";
// import { Link } from "react-router-dom";
import './HomePage.scss';
import Header from '../../components/Header/Header';

class HomePage extends Component {
    render() {
        return (
            <>
                <Header />
                <h1>HOME PAGE</h1>
            </>
        )
    }
}

export default HomePage;