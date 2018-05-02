import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Places.module.scss';

class Places extends Component {
  render() {
    const { places, handleChange, onPlaceClick } = this.props;
    // Nullcheck if we dont have any saved places yet, otherwise prop-types would break the app
    if (!places) return null;
    return (
      <div className={styles.places}>
        <ul>
          {places &&
            places.map(place => (
              <li
                onClick={() => onPlaceClick(place)}
                className={styles.placesListItem}
                key={place.id}
              >
                {place.title}
              </li>
            ))}
        </ul>
        <label htmlFor="showAllPlaces">
          Show all places
          <input id="showAllPlaces" name="showAllPlaces" type="checkbox" onChange={handleChange} />
        </label>
      </div>
    );
  }
}

Places.propTypes = {
  places: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Places;
