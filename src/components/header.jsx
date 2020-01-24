import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

const Header = (props) => {
  return (
    <div className={styles.Header}>
      <div className={styles.Header__wrap}>
        <div className={styles.Header__item}>
          <a href="1">new</a>
        </div>
        <div className={styles.Header__item}>
          <Link to={'/getById'}>getById</Link>
        </div>
        <div className={styles.Header__item}>
          <Link to={'/story'}>Top story</Link>
        </div>
        <div className={styles.Header__item}>
          <a href="1">ask</a>
        </div>
        <div className={styles.Header__item}>
          <Link to={'/jobs'}>jobs</Link>
        </div>  
      </div>
    </div>
  )
}

export default Header