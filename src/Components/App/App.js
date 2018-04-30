import React, { Component } from 'react';

import MapBox from '../Map/Map';
import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div>
        <MapBox />
      </div>
    );
  }
}

export default App;
