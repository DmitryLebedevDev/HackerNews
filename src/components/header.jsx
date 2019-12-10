import React from 'react';
import styles from './header.module.css';

const Header = (props) => {
  return (
    <div className={styles.Header}>
      <div className={styles.Header__wrap}>
        <div className={styles.Header__item}>
          <span>new</span>
        </div>
        <div className={styles.Header__item}>
          <span>comments</span>
        </div>
        <div className={styles.Header__item}>
          <span>show</span>
        </div>
        <div className={styles.Header__item}>
          <span>ask</span>
        </div>
        <div className={styles.Header__item}>
          <span>jobs</span>
        </div>  
      </div>
    </div>
  )
}

export default Header