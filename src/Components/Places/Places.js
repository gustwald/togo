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
    const { places, deletePlace } = this.props;

    const { placesClass } = this.state;

    // Nullcheck if we dont have any saved places yet, otherwise prop-types would break the app
    if (!places) return null;
    return (
      <div>
        <Menu onMenuClick={this.toggleMenu} />
        <div className={placesClass}>
          <ul>
            {places.map(place => (
              <li
                // onClick={() => onPlaceClick(place)}
                className={styles.placesListItem}
                key={place.id}
              >
                {place.title}
                <input
                  type="checkbox"
                  //   onChange={}
                  name="markAsVisited"
                  id="markAsVisited"
                />
                <button onClick={() => deletePlace(place.id)}>Radera</button>
              </li>
            ))}
          </ul>
          <label htmlFor="showAllPlaces">
            Show all places
            <input
              id="showAllPlaces"
              name="showAllPlaces"
              type="checkbox"
              onChange={this.handleChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

Places.propTypes = {
  places: PropTypes.array.isRequired,
  //   showAllPlaces: PropTypes.bool.isRequired,
  deletePlace: PropTypes.func.isRequired
};

export default Places;
