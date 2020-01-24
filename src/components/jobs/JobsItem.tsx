import React from 'react'
import {Ijob} from '../../redux/jobs-reducersType'
import { egoDateToString } from '../../helpers/function'
import { Link } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
interface Iprops extends Ijob {}

let style = makeStyles({
  linkToJob: {
    color: 'blue',
    fontSize: 15,
    transition: '0.2s',
    '&:hover': {
      color: 'rgb(0, 159, 233)'
    }
  },
  egoTime: {
    fontSize: 13,
    color: '#828282'
  }
})
export default function JobsItem(props:Iprops) {
  let styles = style();
  return (
    <div style={{paddingLeft: '15px',paddingRight: '15px'}}>
      <Link className={styles.linkToJob} href={props.url}>
        {props.title}
      </Link>
      <div className={styles.egoTime}>{egoDateToString(props.time)}</div>
    </div>
  )
}
