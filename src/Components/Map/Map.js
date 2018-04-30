import React, { Component } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import styles from './Map.module.scss';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

class Map extends Component {

    componentDidMount() {
     this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v10',
        zoom: 11,
        attributionControl: false,
        center: [18.063240, 59.334591],
      });
    }

  render() {
    return (
      <div className={styles.map} id="map">
       
      </div>
    );
  }
}

export default Map;