import React from 'react';
import PropTypes from 'prop-types';

import { Popup } from 'react-mapbox-gl';

import styles from './Popup.module.scss';

const MapPopup = ({ lng, lat, placeTitle, onAddPlace, title, onChange }) => (
  <Popup
    coordinates={[lng, lat]}
    offset={{
      'bottom-left': [12, -38],
      bottom: [0, -38],
      'bottom-right': [-12, -38]
    }}
  >
    <h2>{title}</h2>
    <input name="placeTitle" value={placeTitle} type="text" onChange={onChange} />
    <button onClick={onAddPlace}>Lägg til</button>
  </Popup>
);

MapPopup.propTypes = {
  lng: PropTypes.number.isRequired,
  lat: PropTypes.number.isRequired,
  onAddPlace: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  placeTitle: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default MapPopup;
