import React, { Component } from "react";
import './DogDetails.scss';
import Header from '../../components/Header/Header';
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MapContainer from "../../components/MapContainer/MapContainer";
import ImageGallery from 'react-image-gallery';
import Loader from "../../components/Loader/Loader";

const backend_url = process.env.REACT_APP_API_URL;
const google_api_key = process.env.REACT_APP_GOOGLE_MAPS_API;

class DogDetail extends Component {

    state = {
        dog: {},
        shelterLocation: {},
        shelterInfo: {},
        loading: true
    }

    componentDidMount() {
        window.scrollTo(0, 0);

        axios
            .get(backend_url + "/dogdetails/" + this.props.match.params.id)
            .then(result => {
                this.setState({
                    dog: result.data.dog,
                    shelterInfo: result.data.dog.shelter
                })

                let shelterPostalCode = result.data.dog.shelter.address.postcode;

                // get the shelter location based on the postal code
                return (axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${shelterPostalCode}&key=${google_api_key}`))
            })    
            .then(result => {
                this.setState({
                    shelterLocation: result.data.results[0].geometry.location,
                    loading: false
                })
            })
            .catch(err => {
                // if shelter location not found proceed without it
                console.log(err);
                this.setState({
                    shelterLocation: {},
                    loading: false
                })
            })
    }

    render() {
        let dogInfo = this.state.dog;
        let shelterInfo = dogInfo.shelter;
        let shelterLocation = this.state.shelterLocation;

        return(
            <>
                <Header />
                <section className="dogDetails">
                    {this.state.loading === true &&
                        <Loader />
                    }
                    {this.state.loading === false &&
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
                                    {(dogInfo.shedding || dogInfo.grooming || dogInfo.energy || dogInfo.trainability) &&
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
                                    {shelterInfo.name && <h5>{shelterInfo.name}</h5>}
                                    {shelterInfo.address.address1 && <h5>{shelterInfo.address.address1}</h5>}
                                    {(shelterInfo.address.city || shelterInfo.address.state) && <h5>{shelterInfo.address.city}, {shelterInfo.address.state}</h5>}
                                    {(shelterInfo.address.postcode || shelterInfo.address.country) && <h5>{shelterInfo.address.postcode} - {shelterInfo.address.country}</h5>}
                                    {shelterInfo.email && <h5>{shelterInfo.email}</h5>}
                                    {shelterInfo.phone && <h5>{shelterInfo.phone}</h5>}
                                    <div className="dogDetails__socialIcons">
                                        {shelterInfo.social_media.facebook && <a className="dogDetails__socialIcons-facebook" href={shelterInfo.social_media.facebook}><i class="fab fa-facebook-square"></i></a> }
                                        {shelterInfo.social_media.instagram && <a className="dogDetails__socialIcons-instagram" href={shelterInfo.social_media.instagram}><i class="fab fa-instagram-square"></i></a> }
                                    </div>
                                </Col>
                                {shelterLocation.lat &&
                                    <Col lg="6" className="dogDetails__mapCol">
                                        <MapContainer className="dogDetails__map" shelterLocation={shelterLocation} shelterInfo={this.state.shelterInfo} />
                                    </Col>
                                }
                            </Row>
                        </Container>
                    }
                </section>
            </>
        )
    }
}

export default DogDetail;