import React from 'react'
import { CircularProgress } from '@material-ui/core';
import styles from './minLoadCenter.module.css';
console.log(styles);


export default function MinLoadCenter() {
  return (
    <div className={styles.Center}>
      <CircularProgress color="secondary" />
    </div>
  )
}
