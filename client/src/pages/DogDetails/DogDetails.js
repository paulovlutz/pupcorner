import React, { Component } from "react";
import './DogDetails.scss';
import Header from '../../components/Header/Header';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapContainer from "../../components/MapContainer/MapContainer";
import ImageGallery from 'react-image-gallery';

const backend_url = "http://localhost:8080";

class DogDetail extends Component {

    state = {
        dog: {},
        shelterLocation: {},
        shelterInfo: {},
    }

    componentDidMount() {
        window.scrollTo(0, 0)
        axios
            .get(backend_url + "/dogdetails/" + this.props.match.params.id)
            .then(result => {
                console.log("RESULT DATA ", result.data);
                this.setState({
                    dog: result.data.dog,
                    shelterInfo: result.data.dog.shelter
                })
                let shelterAddress = result.data.dog.shelter.address;
                console.log('SHELTER ADDRESS ', shelterAddress);

                let shelterPostalCode = result.data.dog.shelter.address.postcode;
                console.log("SHELTER POSTAL CODE ", shelterPostalCode);

                axios
                    .get(`https://maps.googleapis.com/maps/api/geocode/json?address=${shelterPostalCode}&key=AIzaSyBfHRxtq9XXnSARJ3G0l-_3zeA4h5sFbOo`)
                    .then(result => {
                        console.log(result.data.results[0].geometry.location);
                        this.setState({
                            shelterLocation: result.data.results[0].geometry.location
                        })
                    })
                    .catch(err => {
                        console.log(err);
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
                    <section className="dogDetails">
                    {this.state && this.state.dog && this.state.dog.name && this.state.shelterLocation.lat &&
                    <Container className="dogDetails__container">
                        <Row>
                            <Col lg="1">
                                <a onClick={this.props.history.goBack} className="dogDetails__arrow left"></a>
                            </Col>
                            <Col lg="7" className="dogDetails__image">
                                <ImageGallery items={dogInfo.photos} alt="dog profile picture" showThumbnails={false} showFullscreenButton={false} showPlayButton={false} />
                            </Col>
                            <Col lg="4" className="dogDetails__info">
                                <h1 className="dogDetails__name">{dogInfo.name}</h1>
                                <p><span className="dogDetails__info-bold">Primary Breed: </span>{dogInfo.breed}</p>
                                <p><span className="dogDetails__info-bold">Age: </span>{dogInfo.age}</p>
                                <p><span className="dogDetails__info-bold">Gender: </span>{dogInfo.gender}</p>
                                <p><span className="dogDetails__info-bold">Size: </span>{dogInfo.size}</p>
                                {this.state && this.state.dog && this.state.dog.shedding &&
                                    <>
                                        <h4 className="dogDetails__generalInfo">General Breed Information:</h4>
                                        <p><span className="dogDetails__info-bold">Shedding: </span>{dogInfo.shedding}</p>
                                        <p><span className="dogDetails__info-bold">Grooming: </span>{dogInfo.grooming}</p>
                                        <p><span className="dogDetails__info-bold">Energy Level: </span>{dogInfo.energy}</p>
                                        <p><span className="dogDetails__info-bold">Trainability: </span>{dogInfo.trainability}</p>
                                        <p><span className="dogDetails__info-bold">Temperament: </span>{dogInfo.temperament}</p>
                                        <p><span className="dogDetails__info-bold">Life Expectancy: </span>{dogInfo.life_expectancy}</p>
                                        <p><span className="dogDetails__info-bold">Weight: </span>{dogInfo.weight}</p>
                                    </>
                                }
                            </Col>
                        </Row>
                        <Row className="dogDetails__shelterRow">
                            <Col lg="6" className="dogDetails__shelterText">
                                <h2 className="dogDetails__shelter">Shelter Information</h2>
                                {dogInfo.shelter.name && <h5>{dogInfo.shelter.name}</h5> }
                                {dogInfo.shelter.address.address1 && <h5>{dogInfo.shelter.address.address1}</h5> }
                                {(dogInfo.shelter.address.city || dogInfo.shelter.address.state) && <h5>{dogInfo.shelter.address.city}, {dogInfo.shelter.address.state}</h5>}
                                {dogInfo.shelter.address.postcode && <h5>{dogInfo.shelter.address.postcode} - {dogInfo.shelter.address.country}</h5> }
                                {dogInfo.shelter.email && <h5>{dogInfo.shelter.email}</h5> }
                                {dogInfo.shelter.phone && <h5>{dogInfo.shelter.phone}</h5> }
                                <div className="dogDetails__socialIcons">
                                    {dogInfo.shelter.social_media.facebook && <a className="dogDetails__socialIcons-facebook" href={dogInfo.shelter.social_media.facebook}><i class="fab fa-facebook-square"></i></a> }
                                    {dogInfo.shelter.social_media.instagram && <a className="dogDetails__socialIcons-instagram" href={dogInfo.shelter.social_media.instagram}><i class="fab fa-instagram-square"></i></a> }
                                </div>
                            </Col>
                            <Col lg="6" className="dogDetails__mapCol">
                                <MapContainer className="dogDetails__map" shelterLocation={this.state.shelterLocation} shelterInfo={this.state.shelterInfo} />
                            </Col>
                        </Row>
                    </Container>
                }
                </section>
            </>
        )
    }
}

export default DogDetail;