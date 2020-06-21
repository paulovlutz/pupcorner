import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import "./MapContainer.scss";

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

    onMarkerClick = (props, marker, e) => {
        console.log('PROPS', props);
        console.log('MARKER', marker);
        console.log('SHELTER', this.props.shelterLocation);
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

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

                <Marker 
                    onClick={this.onMarkerClick}
                    name={'Current location'} 
                />

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}>
                    <div>
                        <p className="shelter__marker">{this.props.shelterInfo.name}</p>
                        <p className="shelter__marker">{this.props.shelterInfo.address.address1}</p>
                        <p className="shelter__marker">{this.props.shelterInfo.email}</p>
                        <p className="shelter__marker">{this.props.shelterInfo.phone}</p>
                        <p className="shelter__marker">{this.props.shelterInfo.address.city}, <span className="shelter__marker">{this.props.shelterInfo.address.state}</span></p>
                    </div>
                </InfoWindow>

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_MAPS_API)
})(MapContainer)