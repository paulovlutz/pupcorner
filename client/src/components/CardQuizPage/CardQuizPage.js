import React, { Component } from "react";
import './CardQuizPage.scss';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CardQuizPage extends Component {

    cardAnswerOption = [
        {
            title: 'Card Title',
            text: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },
        {
            title: 'Card Title',
            text: "Some quick example text to build on the card title and make up the bulk of the card's content."
        },
        {
            title: 'Card Title',
            text: "Some quick example text to build on the card title and make up the bulk of the card's content."
        }
    ]
    
    render() {
        return(
            <Container>
                <Row className="justify-content-lg-center">
                    {this.cardAnswerOption.map((card, _) => {
                        return (
                        <Col lg="auto">
                            <Card className="quiz__card">
                                <Card.Body>
                                    <Card.Title>{card.title}</Card.Title>
                                    <Card.Text>{card.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        )
                    })}
                </Row>
            </Container>
        )
    }
}

export default CardQuizPage;