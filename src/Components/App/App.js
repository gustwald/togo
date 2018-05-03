import React, { Component } from 'react';
import MapBox from '../Map/Map';
import Places from '../Places/Places';
import Loader from '../Loader/Loader';
import styles from './App.module.scss';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      places: JSON.parse(localStorage.getItem('places') || '[]'),
      loaded: false,
      showAllPlaces: false
    };
  }

  highlighLocation() {}

  addPlace = place => {
    this.setState(
      {
        places: [...this.state.places, place]
      },
      // Callback because setState is asynchronous
      () => {
        localStorage.setItem('places', JSON.stringify(this.state.places));
      }
    );
  };

  showAllPlaces = checked => {
    this.setState({
      showAllPlaces: checked
    });
  };

  setLoaded = () => {
    this.setState({
      loaded: true
    });
  };

  deletePlace = id => {
    this.setState(
      {
        places: this.state.places.filter(place => place.id !== id)
      },
      () => {
        localStorage.setItem('places', JSON.stringify(this.state.places));
      }
    );
  };

  render() {
    const { places, showAllPlaces } = this.state;

    return (
      <div className={styles.app}>
        {!this.state.loaded && <Loader />}

        <MapBox
          places={this.state.places}
          addPlace={this.addPlace}
          loaded={this.state.loaded}
          onLoaded={this.setLoaded}
          showAllPlaces={showAllPlaces}
        />

        <Places
          onVisitedChange={this.handleVisitedChange}
          onPlaceClick={this.onListClick}
          showAllPlaces={this.showAllPlaces}
          deletePlace={this.deletePlace}
          places={places}
        />
      </div>
    );
  }
}

export default App;
