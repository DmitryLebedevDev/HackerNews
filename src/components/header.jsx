import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className={styles.Header}>
      <div className={styles.Header__wrap}>
        <div className={styles.Header__item}>
          <a href="#">new</a>
        </div>
        <div className={styles.Header__item}>
          <a href="#">comments</a>
        </div>
        <div className={styles.Header__item}>
          <Link to={'/story'}>story</Link>
        </div>
        <div className={styles.Header__item}>
          <a href="#">ask</a>
        </div>
        <div className={styles.Header__item}>
          <Link to={'/jobs'}>jobs</Link>
        </div>  
      </div>
    </div>
  )
}

export default Header