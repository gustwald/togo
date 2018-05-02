import React from 'react';
import styles from './Loader.module.scss';

const Loader = () => (
  <div className={styles.spinner}>
    <div className={styles.doubleBounce1} />
    <div className={styles.doubleBounce2} />
  </div>
);

export default Loader;
