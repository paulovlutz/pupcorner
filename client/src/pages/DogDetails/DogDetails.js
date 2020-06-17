import React, { Component } from "react";
import './DogDetails.scss';
import Header from '../../components/Header/Header';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const backend_url = "http://localhost:8080";

class DogDetail extends Component {

    state = {
        dog: {}
    }

    componentDidMount() {
        axios
            .get(backend_url + "/dogdetails/" + this.props.match.params.id)
            .then(result => {
                console.log(result.data)
                this.setState({
                    dog: result.data.dog
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        let dogInfo = this.state.dog;

        return(
            <>
                <Header />
                {this.state && this.state.dog && this.state.dog.name && 
                    <section className="dogDetails">
                    <Container className="dogDetails__container">
                        <Row>
                            <Col lg="1">
                                <a onClick={this.props.history.goBack} className="dogDetails__arrow left"></a>
                            </Col>
                            <Col lg="7" className="dogDetails__image">
                                <img src={dogInfo.photo} className="dogDetails__image-image" alt="dog profile picture"></img>
                            </Col>
                            <Col lg="4" className="dogDetails__info">
                                <h1 className="dogDetails__name">{dogInfo.name}</h1>
                                {/* <p><span className="dogDetails__info-bold">Description: </span>{dogInfo.description}</p> */}
                                <p><span className="dogDetails__info-bold">Breed: </span>{dogInfo.breed}</p>
                                <p><span className="dogDetails__info-bold">Age: </span>{dogInfo.age}</p>
                                <p><span className="dogDetails__info-bold">Gender: </span>{dogInfo.gender}</p>
                                <p><span className="dogDetails__info-bold">Size: </span>{dogInfo.size}</p>
                                <h4 className="dogDetails__generalInfo">General Breed Information:</h4>
                                <p><span className="dogDetails__info-bold">Shedding: </span>{dogInfo.shedding}</p>
                                <p><span className="dogDetails__info-bold">Grooming: </span>{dogInfo.grooming}</p>
                                <p><span className="dogDetails__info-bold">Energy Level: </span>{dogInfo.energy}</p>
                                <p><span className="dogDetails__info-bold">Trainability: </span>{dogInfo.trainability}</p>
                                <p><span className="dogDetails__info-bold">Temperament: </span>{dogInfo.temperament}</p>
                                <p><span className="dogDetails__info-bold">Life Expectancy: </span>{dogInfo.life_expectancy}</p>
                                <p><span className="dogDetails__info-bold">Weight: </span>{dogInfo.weight}</p>
                            </Col>
                        </Row>
                    </Container>
                </section>
                }
            </>
        )
    }
}

export default DogDetail;