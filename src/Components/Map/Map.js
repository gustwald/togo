import React, { Component } from 'react';
import ReactMapboxGl, { Popup } from 'react-mapbox-gl';
import uuidv1 from 'uuid';

import 'mapbox-gl/dist/mapbox-gl.css';

import { saveToLocalStorage } from '../../functions';

// import Places from '../Places/Places';
// import styles from './Map.module.scss';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

class MapBox extends Component {
  state = {
    start: [18.06324, 59.334591],
    controls: false,
    overlay: 'mapbox://styles/mapbox/streets-v9',
    showAllPlaces: false,
    lng: '',
    lat: '',
    placeTitle: ''
  };

  onMapClick = (map, evt) => {
    const { lng, lat } = evt.lngLat;
    this.setState({ lng, lat });
    console.log(this.state.lng, this.state.lat);
  };

  onAddPlace = () => {
    const id = uuidv1();
    const { placeTitle, lng, lat } = this.state;

    const place = {
      title: placeTitle,
      longitude: lng,
      latitude: lat,
      id
    };

    saveToLocalStorage(place);
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { start, controls, overlay, lat, lng } = this.state;

    return (
      <Map
        style={overlay}
        containerStyle={{
          height: '100vh',
          width: '100vw'
        }}
        attributionControl={controls}
        center={start}
        onClick={this.onMapClick}
      >
        <Popup
          coordinates={[lng, lat]}
          offset={{
            'bottom-left': [12, -38],
            bottom: [0, -38],
            'bottom-right': [-12, -38]
          }}
        >
          <h1>Title</h1>
          <input name="placeTitle" type="text" onChange={this.onChange} />
          <button onClick={this.onAddPlace}>Lägg til</button>
        </Popup>
      </Map>
    );
  }
}

export default MapBox;
