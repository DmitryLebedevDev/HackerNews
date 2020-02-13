import React from 'react'
import { IUserLopped } from '../../redux/getByid-reducersType'
import { egoDateToString } from '../../helpers/function'
import styles from './UserPage.module.css';
import { Link } from 'react-router-dom';

export default function UserSmol(props:IUserLopped) {
  return (
    <div className={styles.userSmol}>
      <div>
        name: <Link className={styles.link} to={`/user/${props.id}`}>{props.id}</Link>
      </div>
      <div>
        created: {egoDateToString(props.created)}
      </div>
      <div>
        karma: {props.karma}
      </div>
    </div>
  )
}