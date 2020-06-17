import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
    };

    onMarkerClick = (props, marker, e) =>
    this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true
    });

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

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
                zoom={12}
                onClick={this.onMapClicked} >

                <Marker onClick={this.onMarkerClick}
                    name={'Current location'} />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <h1>Shelter</h1>
                    </div>
                </InfoWindow>

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyBfHRxtq9XXnSARJ3G0l-_3zeA4h5sFbOo")
})(MapContainer)