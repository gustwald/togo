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
      visiblePlaces: []
    };
  }

  setLoaded = () => {
    this.setState({
      loaded: true
    });
  };

  setVisible = visible => {
    this.setState({
      visiblePlaces: [visible.id]
    });
  };

  markPlaceAsVisited = (id, visited) => {
    this.setState(
      {
        // Map over the places, if we find a match, we change the prop visited to true for that match,
        // otherwise dont change anything
        places: this.state.places.map(place => (place.id === id ? { ...place, visited } : place))
      },
      // Callback because setState is asynchronous
      () => {
        localStorage.setItem('places', JSON.stringify(this.state.places));
      }
    );
  };
  deletePlace = id => {
    this.setState(
      {
        places: this.state.places.filter(place => place.id !== id),
        visiblePlaces: this.state.visiblePlaces.filter(place => place !== id)
      },
      // Callback because setState is asynchronous
      () => {
        localStorage.setItem('places', JSON.stringify(this.state.places));
      }
    );
  };

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

  render() {
    const { places, visiblePlaces } = this.state;

    return (
      <div className={styles.app}>
        {!this.state.loaded && <Loader />}

        <MapBox
          places={this.state.places}
          addPlace={this.addPlace}
          loaded={this.state.loaded}
          onLoaded={this.setLoaded}
          visiblePlaces={visiblePlaces}
        />

        <Places
          deletePlace={this.deletePlace}
          setVisible={this.setVisible}
          places={places}
          markPlaceAsVisited={this.markPlaceAsVisited}
        />
      </div>
    );
  }
}

export default App;
