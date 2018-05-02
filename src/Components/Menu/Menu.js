import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Menu.module.scss';

class Menu extends Component {
  state = {
    menu: styles.hamburgerMenu
  };

  onMenuClick = () => {
    const { onMenuClick } = this.props;

    onMenuClick();
    const { menu } = this.state;

    if (menu === styles.hamburgerMenu) {
      this.setState({ menu: `${styles.hamburgerMenu} ${styles.animate}` });
    } else {
      this.setState({ menu: styles.hamburgerMenu });
    }
  };

  render() {
    const { menu } = this.state;
    return (
      <div className={styles.menuWrapper} onClick={this.onMenuClick}>
        <div className={menu} />
      </div>
    );
  }
}

Menu.propTypes = {
  onMenuClick: PropTypes.func.isRequired
};

export default Menu;
