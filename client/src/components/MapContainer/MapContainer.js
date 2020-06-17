import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

    render() {
        const containerStyle = {
            position: 'relative',  
            width: '500px',
            height: '500px'
        }          
    return (
        <Map
            google={this.props.google}
            initialCenter={{
                lat: this.props.shelterLocation.lat,
                lng: this.props.shelterLocation.lng
            }}
            containerStyle={containerStyle}
            zoom={12}>

            <Marker onClick={this.onMarkerClick} name={'Current location'} />

        </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBfHRxtq9XXnSARJ3G0l-_3zeA4h5sFbOo")
})(MapContainer)