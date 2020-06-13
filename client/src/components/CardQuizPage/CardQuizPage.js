import React, { Component } from "react";
import './CardQuizPage.scss';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class CardQuizPage extends Component {

    cardAnswerOption = this.props.answers;
    
    render() {
        return(
            <Container>
                <Row className="justify-content-lg-center">
                    {this.cardAnswerOption.map((card, _) => {
                        let activeClass = "";
                        if (this.props.selectedAnswers !== undefined && this.props.selectedAnswers.includes(card.id)) {
                            activeClass = "active";
                        }
                        return (
                        <Col lg="auto">
                            <Card className={"quiz__card " + activeClass} onClick={() => this.props.handleActiveClass(card.id, this.props.questionId)}>
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