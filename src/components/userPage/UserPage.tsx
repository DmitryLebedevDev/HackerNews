import React from 'react'
import { IUser } from '../../redux/user-reducersType'
import styles from './UserPage.module.css'
import { Link } from 'react-router-dom';
import {ObjOfUnDateToString} from '../../helpers/function';
console.log("TCL: styles", styles)

interface Iprops {
  user:IUser,
  path: string,
}

export default function UserPage(props:Iprops) {
  let date = ObjOfUnDateToString(props.user.created);
  //let data = objDate.toLocaleString('en-Us',{minute: 'null'})
  //let data = [objDate.getDay(),objDate.getMonth(),objDate.getFullYear()];
  //let objDate =new Date (+date1 - +newLvl);
  return (
    <div className={styles.User}>
      <div className={styles.line}><div className={styles.blockOne}>Name : </div>{props.user.id}</div>
      <div className={styles.line}><div className={styles.blockOne}>Created : </div>{date}</div>
      <div className={styles.line}><div className={styles.blockOne}>karma : </div>{props.user.karma}</div>
      <div className={styles.line}><div className={styles.blockOne}>about : </div>
        <div className={styles.aboutWrap}>
          <div className={styles.about} dangerouslySetInnerHTML={{__html: (props.user) ? 
            (props.user.about) ? props.user.about : ''
            : ''}}>
          </div>
          <div className={styles.Links}>
            <Link to={`${props.path}/submission`}>submission</Link>
            <Link to={`${props.path}/comments`}>comments</Link>
            <Link to={`${props.path}/favorites`}>favorites</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
