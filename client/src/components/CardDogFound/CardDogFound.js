import React, { Component } from "react";
import './CardDogFound.scss';
import Card from 'react-bootstrap/Card';
import dogExample from '../../assets/images/dogExample.jpeg';
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";

class CardDogFound extends Component {

    cardDogsOption = [
        {
            name: "Coco",
            distance: "10km",
            breed: "Maltese",
            age: "2 years old"
        },
        {
            name: "Coco",
            distance: "10km",
            breed: "Maltese",
            age: "2 years old"
        },
        {
            name: "Coco",
            distance: "10km",
            breed: "Maltese",
            age: "2 years old"
        }
    ]
    
    render() {
        return(
            <>
                {this.cardDogsOption.map((card, _) => {
                    return (
                        <Col lg="auto">
                            <Card className="dogfound__card">
                                <div className="dogfound__card-like">
                                    <button className="dogfound__card-heart"><i class="fas fa-heart dogfound__card-icon"></i></button>
                                </div>
                                <container className="dogfound__card-container">
                                    <Card.Img className="dogfound__card-image" variant="top" src={dogExample} />
                                    <Card.Body>
                                        <Row className="justify-content-md-center">
                                            <Card.Title className="dogfound__card-title">{card.name}</Card.Title>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <Card.Text>
                                                <Row>
                                                    <Col>
                                                        <span>{card.distance}</span> &#183; <span>{card.age}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <span className="dogfound__card-breed">{card.breed}</span>
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                        </Row>
                                    </Card.Body>
                                </container>
                            </Card>
                        </Col>
                    )
                })}
            </>
        )
    }
}

export default CardDogFound;