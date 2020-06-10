import React, { Component } from "react";
import './DogsFound.scss';
import Header from '../../components/Header/Header';
import CardDogFound from '../../components/CardDogFound/CardDogFound';
import Row from 'react-bootstrap/Row';
import ButtonRetakeQuiz from "../../components/ButtonRetakeQuiz/ButtonRetakeQuiz";

class HomePage extends Component {
    render() {
        return (
            <>
                <Header />
                <section className="dogsfound">
                    <div className="dogsfound__closest">
                        <h1 className="dogsfound__title">Best Closest Matches</h1>
                        <Row className="justify-content-lg-center">
                            <CardDogFound />
                        </Row>
                    </div>

                    <div className="dogsfound__others">
                        <h1 className="dogsfound__title">Other Dogs Found</h1>
                        <Row className="justify-content-lg-center">
                            <CardDogFound />
                        </Row>
                    </div>
                    <Row className="justify-content-lg-center">
                        <ButtonRetakeQuiz />
                    </Row>
                </section>
            </>
        )
    }
}

export default HomePage;