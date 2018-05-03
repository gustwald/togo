import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import uuidv1 from 'uuid';
import 'mapbox-gl/dist/mapbox-gl.css';

import Popup from '../Popup/Popup';
import marker from '../../assets/marker.svg';
import markerVisited from '../../assets/markerVisited.svg';

import styles from './Map.module.scss';

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

class MapBox extends Component {
  state = {
    start: [18.06324, 59.334591],
    controls: false,
    overlay: 'mapbox://styles/mapbox/streets-v9',
    lng: 0,
    lat: 0,
    placeTitle: ''
  };

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
      id,
      visited: false
    };

    this.props.addPlace(place);

    // Close tooltip after adding place
    this.setState({ lng: 0, lat: 0, placeTitle: '' });
  };

  onListClick = place => {
    const { longitude, latitude } = place;
    this.setState({ lng: longitude, lat: latitude });
  };

  // onChange func so that we add the title to the state, so we then can add it to the place obj
  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleVisitedChange = e => this.setState({ [e.target.name]: e.target.checked });

  render() {
    const { start, controls, overlay, lat, lng, placeTitle } = this.state;
    const { visiblePlaces, loaded, onLoaded, places } = this.props;

    // Select places based on visiblePlaces array
    const markers = places.filter(place => visiblePlaces.includes(place.id));

    return (
      <Map
        style={overlay}
        containerStyle={{
          height: '100vh',
          width: '100vw',
          visibility: loaded ? 'visible' : 'hidden'
        }}
        onStyleLoad={onLoaded}
        attributionControl={controls}
        center={start}
        onClick={this.onMapClick}
      >
        <Popup
          lng={lng}
          lat={lat}
          placeTitle={placeTitle}
          title="Give your place a name"
          onChange={this.onChange}
          onAddPlace={this.onAddPlace}
        />
        {markers.map(place => (
          <Marker key={place.id} coordinates={[place.longitude, place.latitude]} anchor="bottom">
            <img
              className={styles.marker}
              // Different marker if place is visited
              src={place.visited ? markerVisited : marker}
              alt={place.id}
            />
          </Marker>
        ))}
      </Map>
    );
  }
}

MapBox.propTypes = {
  loaded: PropTypes.bool.isRequired,
  visiblePlaces: PropTypes.array.isRequired,
  onLoaded: PropTypes.func.isRequired,
  places: PropTypes.array.isRequired,
  addPlace: PropTypes.func.isRequired
};

export default MapBox;
