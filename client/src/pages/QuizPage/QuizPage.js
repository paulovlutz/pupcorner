import React, { Component } from "react";
import './QuizPage.scss';
import "../../components/ButtonQuiz/ButtonQuiz.scss";
import Header from '../../components/Header/Header';
import CardQuizPage from '../../components/CardQuizPage/CardQuizPage';
import AnimatedSquareBackground from '../../components/AnimatedSquareBackground/AnimatedSquareBackground';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Wizard, Steps, Step } from 'react-albus';
import quizQuestions from "./quizQuestions.json";
import Button from "react-bootstrap/Button";
import axios from "axios";

const backend_url = "http://localhost:8080";
const googleAPI = "AIzaSyBfHRxtq9XXnSARJ3G0l-_3zeA4h5sFbOo";

class QuizPage extends Component {

    state = {
        selectedAnswers: {}
    }

    handleClick = (onlyOneAnswer, answerId, questionId) => {
        let answersArray = this.state.selectedAnswers[questionId];

        console.log(answerId, questionId);
        let clickedAnswers = [];
        if (answersArray === undefined) {
            clickedAnswers = [answerId];
        } else if (answersArray.includes(answerId) ) {
            answersArray.splice(answersArray.indexOf(answerId), 1);
            clickedAnswers = answersArray;
        } else {
            if (onlyOneAnswer === true) {
                clickedAnswers = [answerId];
            } else {
                clickedAnswers = [...answersArray, answerId];
            }
        }
        this.setState({
            selectedAnswers: {...this.state.selectedAnswers, [questionId]: clickedAnswers}
        }, () => {
            console.log(this.state);
        })
    }

    handleSubmitAnswers = event => {
        event.preventDefault();

        axios
        .post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleAPI}`)
        .then(result => {
            console.log("API LOCATION ", result.data.location);
            let userLat = result.data.location.lat;
            let userLng = result.data.location.lng;
            
            console.log("USER LAT ", userLat);
            console.log("USER LONG ", userLng);

            axios
                .get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLat},${userLng}&key=${googleAPI}`)
                .then(result => {
                    let listOfAddress = result.data.results[0].address_components;
                    console.log("TRANSFORM LOCATION TO ADDRESS", result.data);
                    console.log("ADDRESS 2", listOfAddress[2].types.includes("locality"));
                    
                    let userCity = result.data.results[0].address_components.find(addressType => {
                        return addressType.types.includes("locality");
                    })
                    userCity = userCity.long_name;
                    console.log("USER CITY: ", userCity);

                    let userState = result.data.results[0].address_components.find(addressType => {
                        return addressType.types.includes("administrative_area_level_1");
                    })
                    userState = userState.long_name;
                    console.log("USER STATE: ", userState);

                    let userCountry = result.data.results[0].address_components.find(addressType => {
                        return addressType.types.includes("country");
                    })
                    userCountry = userCountry.long_name;
                    console.log("USER COUNTRY: ", userCountry);

                    let userAddress = {city: userCity, state: userState, country: userCountry};

                    console.log("USER ADDRESS STATE: ", userAddress);

                    let answerAndAddress = {answers: this.state.selectedAnswers, address: userAddress};

                    axios
                        .post(backend_url + "/quizAnswers", answerAndAddress)
                        .then(result => {
                            this.props.history.push({
                                pathname: '/dogsfound',
                                state: { dogs: result.data.dogsFound }
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                })
                .catch(err => {
                    console.log(err);
                })

        })
        .catch(err => {
            console.log(err);
        })
    }

    questions = quizQuestions;

    render() {

        return (
            <>
                <Header />
                <section className="quiz animated-background">
                    <Wizard>
                        <Steps>
                            {this.questions.map((question, _) => {
                                return (
                                    <Step
                                        id={question.id}
                                        render={({ next, previous, step, steps }) => (
                                        <div>
                                            <Container className="quiz__question">
                                                <Row className="quiz__question-question justify-content-lg-center">
                                                    <Col lg="auto">
                                                        {question.question}
                                                    </Col>
                                                </Row>
                                            </Container>

                                            <Container className="quiz__cards">
                                                <Row>
                                                    <Col lg="1">
                                                        {steps.indexOf(step) > 0 && (
                                                            <a className="quiz__cards-arrow left" onClick={previous}></a>
                                                        )}
                                                    </Col>
                                                        
                                                    <Col><CardQuizPage onlyOneAnswer={question.onlyOneAnswer} questionId={question.id} selectedAnswers={this.state.selectedAnswers[question.id]} answers={question.answers} handleActiveClass={this.handleClick} /></Col>

                                                    <Col lg="1">
                                                        {steps.indexOf(step) < steps.length - 1 && (
                                                            <a className="quiz__cards-arrow right" onClick={next}></a>
                                                        )}                                                            
                                                    </Col>
                                                </Row>
                                                <Row className="justify-content-lg-center quiz__cards-button">
                                                    <Col lg="auto">
                                                        {steps.indexOf(step) === steps.length - 1 && (
                                                            <Button href="#" className="button" onClick={this.handleSubmitAnswers}>Find Dogs!</Button>
                                                        )}
                                                    </Col>                                                     
                                                </Row>
                                            </Container>
                                        </div>
                                        )}
                                    />
                                )
                            })}
                        </Steps>
                    </Wizard>
                    <AnimatedSquareBackground />
                </section>
            </>
        )
    }
}

export default QuizPage;