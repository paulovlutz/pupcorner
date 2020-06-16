import React, { Component } from "react";
import './CardDogFound.scss';
import Card from 'react-bootstrap/Card';
import dogExample from '../../assets/images/dogExample.jpeg';
import Col from 'react-bootstrap/Col';
import Row from "react-bootstrap/Row";

class CardDogFound extends Component {
    
    render() {
        return(
            <>
                {(this.props.dogs || []).map((dog, _) => {
                    let profilePhoto = "";
                    
                    dog.photos.forEach(photo => {
                        profilePhoto = photo.large;
                    });

                    return (
                        <Col lg="auto">
                            <Card className="dogfound__card">
                                <div className="dogfound__card-like">
                                    <button className="dogfound__card-heart"><i className="fas fa-heart dogfound__card-icon"></i></button>
                                </div>
                                <section className="dogfound__card-container">
                                    <Card.Img className="dogfound__card-image" variant="top" src={profilePhoto} />
                                    <Card.Body>
                                        <Row className="justify-content-md-center">
                                            <Card.Title className="dogfound__card-title">{dog.name.substring(0, 15)}</Card.Title>
                                        </Row>
                                        <Row className="justify-content-md-center">
                                            <Card.Text>
                                                <Row>
                                                    <Col>
                                                        <span>{Math.round(dog.distance) + "mi away"}</span> &#183; <span>{dog.age}</span>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col>
                                                        <span className="dogfound__card-breed">{dog.breed}</span>
                                                    </Col>
                                                </Row>
                                            </Card.Text>
                                        </Row>
                                    </Card.Body>
                                </section>
                            </Card>
                        </Col>
                    )
                })}
            </>
        )
    }
}

export default CardDogFound;