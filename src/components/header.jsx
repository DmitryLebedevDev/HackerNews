import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.Header__wrap}>
        <div className={styles.Header__item}>
          <Link to={'/story'}>Top stories</Link>
        </div>
        <div className={styles.Header__item}>
          <Link to={'/newStorys'}>new stories</Link>
        </div>
        <div className={styles.Header__item}>
          <Link to={'/getById'}>getById</Link>
        </div>
        <div className={styles.Header__item}>
          <Link to={'/ask'}>ask</Link>
        </div>
        <div className={styles.Header__item}>
          <Link to={'/jobs'}>jobs</Link>
        </div>  
      </div>
    </div>
  )
}

export default Header