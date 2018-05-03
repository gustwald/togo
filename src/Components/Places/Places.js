import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from '../Menu/Menu';

import styles from './Places.module.scss';

class Places extends Component {
  state = {
    placesClass: styles.places
  };

  toggleMenu = () => {
    const { placesClass } = this.state;

    if (placesClass === styles.places) {
      this.setState({ placesClass: `${styles.places} ${styles.open}` });
    } else {
      this.setState({ placesClass: styles.places });
    }
  };

  render() {
    const { places, deletePlace, setVisible } = this.props;

    const { placesClass } = this.state;

    // Nullcheck if we dont have any saved places yet, otherwise prop-types would break the app
    if (!places) return null;
    return (
      <div>
        <Menu onMenuClick={this.toggleMenu} />
        <div className={placesClass}>
          <ul>
            {places.map(place => (
              <div key={place.id}>
                <li onClick={() => setVisible(place)} className={styles.placesListItem}>
                  {place.title}
                  <input type="checkbox" name="markAsVisited" id="markAsVisited" />
                </li>
                <button onClick={() => deletePlace(place.id)}>Radera</button>
              </div>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

Places.propTypes = {
  places: PropTypes.array.isRequired,
  deletePlace: PropTypes.func.isRequired,
  setVisible: PropTypes.func.isRequired
};

export default Places;
