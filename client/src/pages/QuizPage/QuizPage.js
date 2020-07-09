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
import Spinner from 'react-bootstrap/Spinner';
import axios from "axios";

const backend_url = (process.env.NODE_ENV === "production") ? "/quizAnswers" : (process.env.REACT_APP_API_URL + "/quizAnswers");
const googleAPI = process.env.REACT_APP_GOOGLE_MAPS_API;

class QuizPage extends Component {
    state = {
        selectedAnswers: {},
        showSpinner: false
    }

    getAddressComponents = (listOfAddress) => {
        let userCity = listOfAddress.find(addressType => {
            return addressType.types.includes("locality");
        })
        userCity = userCity.long_name;

        let userState = listOfAddress.find(addressType => {
            return addressType.types.includes("administrative_area_level_1");
        })
        userState = userState.long_name;

        let userCountry = listOfAddress.find(addressType => {
            return addressType.types.includes("country");
        })
        userCountry = userCountry.long_name;

        return({city: userCity, state: userState, country: userCountry});
    }

    handleClickOnAnswer = (onlyOneAnswer, answerId, questionId) => {
        let selectedAnswersArray = this.state.selectedAnswers[questionId];
        let newSelectedAnswers = [];

        if (selectedAnswersArray === undefined) {
            newSelectedAnswers = [answerId];
        } else if (selectedAnswersArray.includes(answerId) ) {
            // If answer already selected, remove it
            selectedAnswersArray.splice(selectedAnswersArray.indexOf(answerId), 1);
            newSelectedAnswers = selectedAnswersArray;
        } else {
            if (onlyOneAnswer === true) {
                newSelectedAnswers = [answerId];
            } else {
                newSelectedAnswers = [...selectedAnswersArray, answerId];
            }
        }

        this.setState({
            selectedAnswers: {...this.state.selectedAnswers, [questionId]: newSelectedAnswers}
        })
    }

    handleSubmitAnswers = event => {
        event.preventDefault();
        
        this.setState({
            showSpinner: true
        })

        // get the latitude and longitude of the user
        axios
        .post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${googleAPI}`)
        .then(result => {
            let userLat = result.data.location.lat;
            let userLng = result.data.location.lng;

            // get the user lat and lng and transform into an address
            return (axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLat},${userLng}&key=${googleAPI}`))
        })
        .catch(err => {
            // if location not found it uses a default location - Toronto
            let userLat = 43.6532;
            let userLng = -79.3832;

            return (axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLat},${userLng}&key=${googleAPI}`))
        })
        .then((result) => {
            let listOfAddress = result.data.results[0].address_components;
            
            let userAddress = this.getAddressComponents(listOfAddress);

            let answerAndAddress = {answers: this.state.selectedAnswers, address: userAddress};

            return (axios.post(backend_url, answerAndAddress))
        })
        .then(result => {
            // redirect the information to the dogsfound page
            this.props.history.push({
                pathname: '/dogsfound',
                state: { dogs: result.data.dogsFound, otherDogsFound: result.data.otherDogsFound }
            })
        })
        .catch(err => {
            console.log("Sorry, address was not found.");
        })
    }

    render() {

        return (
            <>
                <Header />
                <section className="quiz animated-background">
                    <Wizard>
                        <Steps>
                            {quizQuestions.map((question, _) => {
                                return (
                                    <Step
                                        key={question.id}
                                        id={question.id}
                                        render={({ next, previous, step, steps }) => (
                                        <div>
                                            <Container className="quiz__question">
                                                <Row className="quiz__question-question justify-content-lg-center">
                                                    <Col lg="auto">
                                                        {question.question}
                                                        {question.onlyOneAnswer === false && 
                                                            <p className="quiz__question-selectAllthatApply">(Select all that apply)</p>
                                                        }
                                                    </Col>
                                                </Row>
                                            </Container>

                                            <Container className="quiz__cards">
                                                <Row>
                                                    <Col lg="1">
                                                        {steps.indexOf(step) > 0 && (
                                                            <a className="quiz__cards-arrow left" onClick={previous} aria-label="left arrow previous question"> </a>
                                                        )}
                                                    </Col>
                                                        
                                                    <Col><CardQuizPage onlyOneAnswer={question.onlyOneAnswer} questionId={question.id} selectedAnswers={this.state.selectedAnswers[question.id]} answers={question.answers} handleActiveClass={this.handleClickOnAnswer} /></Col>

                                                    <Col lg="1">
                                                        {/* display arrow only when you have a next step and at least one answer was selected */}
                                                        {(steps.indexOf(step) < steps.length - 1) && (this.state.selectedAnswers[question.id] !== undefined && this.state.selectedAnswers[question.id].length !== 0) && (
                                                            <a className="quiz__cards-arrow right" onClick={next} aria-label="right arrow next question"> </a>
                                                        )}                                                            
                                                    </Col>
                                                </Row>
                                                <Row className="justify-content-lg-center quiz__cards-button">
                                                    <Col lg="auto">
                                                        {steps.indexOf(step) === steps.length - 1 && this.state.showSpinner === false && (
                                                            <Button href="#" className="button" onClick={this.handleSubmitAnswers}>Find Dogs!</Button>
                                                        )}
                                                        {this.state.showSpinner === true &&
                                                            <Spinner className="quiz__spinner" animation="border" />
                                                        }
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