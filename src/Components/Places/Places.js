import React, { Component } from 'react';
import styles from './Places.module.scss';

class Places extends Component {
  render() {
    // TODO add to proptypes
    const { places } = this.props;
    console.log(places);
    return (
      <div className={styles.places}>
        <ul>{places && places.map(place => <li key={place.id}>{place.title}</li>)}</ul>
      </div>
    );
  }
}

export default Places;
