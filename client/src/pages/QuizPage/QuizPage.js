import React, { Component } from "react";
import './QuizPage.scss';
import "../../components/ButtonQuiz/ButtonQuiz.scss";
import Header from '../../components/Header/Header';
import CardQuizPage from '../../components/CardQuizPage/CardQuizPage';
import AnimatedSquareBackground from '../../components/AnimatedSquareBackground/AnimatedSquareBackground'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Wizard, Steps, Step } from 'react-albus';
import quizQuestions from "./quizQuestions.json";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Redirect } from "react-router-dom";

const backend_url = "http://localhost:8080";

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
            .post(backend_url + "/quizAnswers", this.state.selectedAnswers)
            .then(result => {
                this.props.history.push({
                    pathname: '/dogsfound',
                    state: { dogs: result.data.dogsFound }
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
                <section className="quiz">
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