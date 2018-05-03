import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ReactMapboxGl, { Popup, Marker } from 'react-mapbox-gl';

import uuidv1 from 'uuid';
import 'mapbox-gl/dist/mapbox-gl.css';

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
    lng: '',
    lat: '',
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
    this.setState({ lng: '', lat: '' });
  };

  onListClick = place => {
    const { longitude, latitude } = place;
    this.setState({ lng: longitude, lat: latitude });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  handleVisitedChange = e => this.setState({ [e.target.name]: e.target.checked });

  render() {
    const { start, controls, overlay, lat, lng } = this.state;
    const { visiblePlaces, loaded, onLoaded } = this.props;

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
        {visiblePlaces.map(place => (
          <Marker key={place.id} coordinates={[place.longitude, place.latitude]} anchor="bottom">
            <img
              className={styles.marker}
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
  onLoaded: PropTypes.func.isRequired
};

export default MapBox;
