import React, { Component } from "react";
import './DogsFound.scss';
import Header from '../../components/Header/Header';
import CardDogFound from '../../components/CardDogFound/CardDogFound';
import Row from 'react-bootstrap/Row';
import ButtonQuiz from "../../components/ButtonQuiz/ButtonQuiz";

class HomePage extends Component {

    render() {
        return (
            <>
                <Header />
                <section className="dogsfound">
                    <div className="dogsfound__closest">
                        <h1 className="dogsfound__title">Best Matches</h1>
                        <Row className="justify-content-lg-center">
                            <CardDogFound dogs={this.props.location.state.dogs} />
                        </Row>
                    </div>

                    <div className="dogsfound__others">
                        <h1 className="dogsfound__title">Other Dogs</h1>
                        <Row className="justify-content-lg-center">
                            <CardDogFound dogs={this.props.location.state.otherDogsFound}/>
                        </Row>
                    </div>
                    <Row className="justify-content-lg-center">
                        <ButtonQuiz text={"Retake the Quiz"} />
                    </Row>
                </section>
            </>
        )
    }
}

export default HomePage;