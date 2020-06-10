import React, { Component } from "react";
import './QuizPage.scss';
import Header from '../../components/Header/Header';
import CardQuizPage from '../../components/CardQuizPage/CardQuizPage';
import AnimatedSquareBackground from '../../components/AnimatedSquareBackground/AnimatedSquareBackground'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class QuizPage extends Component {

    render() {
        return (
            <>
                <Header />
                <section className="quiz">
                    <Container className="quiz__question">
                        <Row className="justify-content-lg-center">
                            <Col lg="auto">
                                Is Coco the cutest dog in the world: yes or yes?
                            </Col>
                        </Row>
                    </Container>

                    <Container className="quiz__cards">
                        <Row>
                            <Col lg="1"><a href="/" class="quiz__cards-arrow left"></a></Col>
                            <Col><CardQuizPage/></Col>
                            <Col lg="1"><a href="/" class="quiz__cards-arrow right"></a></Col>
                        </Row>
                    </Container>

                    <AnimatedSquareBackground />
                </section>
            </>
        )
    }
}

export default QuizPage;