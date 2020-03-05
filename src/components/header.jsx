import React from 'react';
import styles from './header.module.css';
import { Link } from 'react-router-dom';
import { AppBar } from '@material-ui/core';

const Header = () => {
  return (
    <AppBar position="static">
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
    </AppBar>
    
  )
}

export default Header