import React, { Component } from "react";
// import { Link } from "react-router-dom";
import './QuizPage.scss';
// import styled from 'styled-components';
import Header from '../../components/Header/Header';

import Card from 'react-bootstrap/Card';
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
                                Here's the question?
                            </Col>
                        </Row>
                    </Container>

                    <Container className="quiz__cards">
                        <Row>
                            <Col lg="1"><a href="/" class="quiz__cards-arrow left"></a></Col>

                            <Col>                            
                                <Container>
                                    <Row className="justify-content-lg-center">
                                        <Col lg="auto">
                                            <Card className="quiz__card active">
                                                <Card.Body>
                                                    <Card.Title>Card Title</Card.Title>
                                                    <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col lg="auto">
                                            <Card className="quiz__card">
                                                <Card.Body>
                                                    <Card.Title>Card Title</Card.Title>
                                                    <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>

                                        <Col lg="auto">
                                            <Card className="quiz__card">
                                                <Card.Body>
                                                    <Card.Title>Card Title</Card.Title>
                                                    <Card.Text>
                                                    Some quick example text to build on the card title and make up the bulk of
                                                    the card's content.
                                                    </Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Container>
                            </Col>

                            <Col lg="1"><a href="/" class="quiz__cards-arrow right"></a></Col>
                        </Row>
                    </Container>

                    <ul className="quiz__background">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </section>
            </>
        )
    }
}

export default QuizPage;