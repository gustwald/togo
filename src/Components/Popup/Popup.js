import React from 'react';
import { Popup } from 'react-mapbox-gl';
import styles from './Popup.module.scss';

const Popup = ({ lng, lat }) => (
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
);

export default Popup;
