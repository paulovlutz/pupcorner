import React, { Component } from "react";
import './HomePage.scss';
import Header from '../../components/Header/Header';
import ButtonQuiz from "../../components/ButtonQuiz/ButtonQuiz";

class HomePage extends Component {
    render() {
        return (
            <>
                <Header />
                <section className="home">
                    <div className="home__text">
                        <h1 className="home__text-title">Pupcorner</h1>
                        <h4 className="home__text-slogan">
                            Helping you find the pawfect friend
                        </h4>
                        <h4 className="home__text-slogan">
                            in this pupcorner of the world!
                        </h4>
                    </div>
                    <div className="home__button">
                        <ButtonQuiz text={"Take the Quiz"} />
                    </div>
                </section>
            </>
        )
    }
}

export default HomePage;