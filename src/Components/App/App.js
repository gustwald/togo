import React, { Component } from 'react';
import MapBox from '../Map/Map';
import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <MapBox />
      </div>
    );
  }
}

export default App;
