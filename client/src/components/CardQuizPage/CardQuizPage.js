import React, { Component } from "react";
import './CardQuizPage.scss';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import CardDeck from 'react-bootstrap/CardDeck';

class CardQuizPage extends Component {

    cardAnswerOption = this.props.answers;
    
    render() {
        return(
            <Container>
                <CardDeck className="justify-content-lg-center">
                    {this.cardAnswerOption.map((card, _) => {
                        let activeClass = "";
                        if (this.props.selectedAnswers !== undefined && this.props.selectedAnswers.includes(card.id)) {
                            activeClass = "active";
                        }
                        return (
                        // <Col lg="auto">
                            <Card className={"quiz__card " + activeClass} onClick={() => this.props.handleActiveClass(this.props.onlyOneAnswer, card.id, this.props.questionId)}>
                                <Card.Body className="quiz__card-content">
                                    <Card.Text>{card.text}</Card.Text>
                                </Card.Body>
                            </Card>
                        // </Col>
                        )
                    })}
                </CardDeck>
            </Container>
        )
    }
}

export default CardQuizPage;