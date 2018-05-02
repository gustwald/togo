import React, { Component } from 'react';
import MapBox from '../Map/Map';
import Loader from '../Loader/Loader';
import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <Loader />
        <MapBox />
      </div>
    );
  }
}

export default App;
