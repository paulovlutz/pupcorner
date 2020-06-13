import React, { Component } from "react";
import './QuizPage.scss';
import Header from '../../components/Header/Header';
import CardQuizPage from '../../components/CardQuizPage/CardQuizPage';
import AnimatedSquareBackground from '../../components/AnimatedSquareBackground/AnimatedSquareBackground'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Wizard, Steps, Step } from 'react-albus';

class QuizPage extends Component {

    state = {
        selectedAnswers: {}
    }

    handleClick = (answerId, questionId) => {
        let answersArray = this.state.selectedAnswers[questionId];
        console.log(answerId, questionId);
        let clickedAnswers = [];
        if (answersArray === undefined) {
            clickedAnswers = [answerId];
        } else if (answersArray.includes(answerId) ) {
            answersArray.splice(answersArray.indexOf(answerId), 1);
            clickedAnswers = answersArray;
        } else {
            clickedAnswers = [...answersArray, answerId];
        }
        this.setState({
            selectedAnswers: {[questionId]: clickedAnswers}
        }, () => {
            console.log(this.state);
        })
    }

    questions = [
        { 
            id: "1",
            question: 'Is Coco the cutest dog in the world: yes or yes?', 
            answers: [
                {
                    id: "a1",
                    title: 'Card Title',
                    text: "Some quick example text to build on the card title and make up the bulk of the card's content."
                },
                {
                    id: "a2",
                    title: 'Card Title',
                    text: "Some quick example text to build on the card title and make up the bulk of the card's content."
                },
                {
                    id: "a3",
                    title: 'Card Title',
                    text: "Some quick example text to build on the card title and make up the bulk of the card's content."
                }
            ]
        },
        { 
            id: "2",
            question: 'Is Coco the most fandanginho dog in the world: yes or yes?', 
            answers: [
                {
                    id: "a4",
                    title: 'Card Title',
                    text: "Some quick example text to build on the card title and make up the bulk of the card's content."
                },
                {
                    id: "a5",
                    title: 'Card Title',
                    text: "Some quick example text to build on the card title and make up the bulk of the card's content."
                },
                {
                    id: "a6",
                    title: 'Card Title',
                    text: "Some quick example text to build on the card title and make up the bulk of the card's content."
                }
            ]
        }
    ]

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
                                                        
                                                    <Col><CardQuizPage questionId={question.id} selectedAnswers={this.state.selectedAnswers[question.id]} answers={question.answers} handleActiveClass={this.handleClick} /></Col>

                                                    <Col lg="1">
                                                        {steps.indexOf(step) < steps.length - 1 && (
                                                            <a className="quiz__cards-arrow right" onClick={next}></a>
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