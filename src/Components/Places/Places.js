import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Menu from '../Menu/Menu';

import styles from './Places.module.scss';

class Places extends Component {
  state = {
    placesClass: styles.places,
    searchWord: ''
  };

  onSearch = e => this.setState({ [e.target.name]: e.target.value });

  toggleMenu = () => {
    const { placesClass } = this.state;

    if (placesClass === styles.places) {
      this.setState({ placesClass: `${styles.places} ${styles.open}` });
    } else {
      this.setState({ placesClass: styles.places });
    }
  };

  render() {
    const { deletePlace, setVisible, markPlaceAsVisited } = this.props;
    const { placesClass, searchWord } = this.state;
    // use let instead of const so we can manipulate places with search
    let { places } = this.props;

    // If we have searchword, we filter and see if we have any place with title that matches searchword
    if (searchWord) {
      places = places.filter(place => place.title.toLowerCase().includes(searchWord.toLowerCase()));
    }

    // Nullcheck if we dont have any saved places yet, otherwise prop-types would break the app
    if (!places) return null;
    return (
      <div>
        <Menu onMenuClick={this.toggleMenu} />
        <div className={placesClass}>
          <input
            type="text"
            name="searchWord"
            onChange={this.onSearch}
            placeholder="Search for a place.."
          />
          <ul>
            {places.map(place => (
              <div className={styles.placesWrapper} key={place.id}>
                <li onClick={() => setVisible(place)} className={styles.placesListItem}>
                  {place.title}
                </li>
                <input
                  type="checkbox"
                  name="markAsVisited"
                  id="markAsVisited"
                  checked={place.visited}
                  onChange={e => markPlaceAsVisited(place.id, e.target.checked)}
                />
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
  setVisible: PropTypes.func.isRequired,
  markPlaceAsVisited: PropTypes.func.isRequired
};

export default Places;
