import React, { Component } from 'react';
import LocationPicker from 'react-location-picker';
import "./location.css"

/* Default position */
const defaultPosition = {
  lat: 27.9878,
  lng: 86.9250
};
 
 
export default class LocationPickerExample extends Component {
  constructor (props) {
    super(props);
 
    this.state = {
      address: "MT Everest",
      position: {
         lat: 27.9878,
         lng: 86.9250
      }
    };
 
    // Bind
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }
 
  handleLocationChange ({ position, address }) {
 
    // Set new location
    this.setState({ position, address });
  }
 
  render () {
    return (
      <div className="col-8 mx-auto">
        <h1>{this.state.address}</h1>
        <div>
          <LocationPicker
            containerElement={ <div style={ {height: '25%'} } /> }
            mapElement={ <div style={ {height: '200px'} } /> }
            defaultPosition={defaultPosition}
            onChange={this.handleLocationChange}
          />
        </div>
      </div>
    )
  }
}