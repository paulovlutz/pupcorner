import React, { Component } from "react";
// import { Link } from "react-router-dom";
import './HomePage.scss';
import Header from '../../components/Header/Header';

class HomePage extends Component {
    render() {
        return (
            <>
                <Header />
                <section className="home">
                    <h1 className="home__title">HOME PAGE</h1>
                </section>
            </>
        )
    }
}

export default HomePage;