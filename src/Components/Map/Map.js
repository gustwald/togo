import React, { Component } from 'react';
import ReactMapboxGl, { Popup, Marker } from 'react-mapbox-gl';
import uuidv1 from 'uuid';

import 'mapbox-gl/dist/mapbox-gl.css';

import { saveToLocalStorage, getPlacesFromLocalStorage } from '../../functions';
import pin from '../../assets/pin.svg';

import Places from '../Places/Places';
import styles from './Map.module.scss';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

class MapBox extends Component {
  state = {
    start: [18.06324, 59.334591],
    controls: false,
    overlay: 'mapbox://styles/mapbox/streets-v9',
    showAllPlaces: true,
    lng: '',
    lat: '',
    placeTitle: '',
    places: []
  };

  componentWillMount() {
    // Get all places from localStorage
    this.setState({ places: getPlacesFromLocalStorage() });
  }

  componentDidMount() {
    // TODO: add checkbox to show or hide all places
    // this.places !== null
    //   ? this.setState({ showAllPlaces: true })
    //   : this.setState({ showAllPlaces: false });
  }

  onMapClick = (map, evt) => {
    const { lng, lat } = evt.lngLat;

    // Set coords to state so we can add them later to localStorage
    this.setState({ lng, lat });
  };

  onAddPlace = () => {
    // Unique id for all places so we can add filters and/or remove mark as visited
    const id = uuidv1();
    const { placeTitle, lng, lat } = this.state;

    // Add all props to an object
    const place = {
      title: placeTitle,
      longitude: lng,
      latitude: lat,
      id
    };

    // We cant to store all the places as objects in an array so we can easily iterate over it
    // and spread it as markers
    // TODO: add promise so that we can update map with marker as soon as we add it
    saveToLocalStorage(place);

    // Close tooltip after adding place
    this.setState({ lng: '', lat: '' });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { start, controls, overlay, lat, lng, places, showAllPlaces } = this.state;

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
        {/* Add POPUP as component instead */}
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
        {showAllPlaces &&
          places.map(place => (
            <Marker key={place.id} coordinates={[place.longitude, place.latitude]} anchor="bottom">
              <img className={styles.marker} src={pin} alt={place.id} />
            </Marker>
          ))}
        <Places places={places} />
      </Map>
    );
  }
}

export default MapBox;
