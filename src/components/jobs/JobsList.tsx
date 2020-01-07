import React from 'react'
import { Ijob } from '../../redux/jobs-reducersType'
import JobsItem from './JobsItem'
import styles from './Jobs.module.css'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import MinLoadCenter from '../decorComponent/minLoadCenter'

interface Iprops {
  jobs: Ijob[];
  addFunBtn: () => void;
  isLoad: boolean;
  isMax: boolean;
}
let style = makeStyles({
  btn: {
    margin: '0 auto',
    marginTop: '10px',
    display: 'block',
    fontWeight: 900
  }
})
export default function JobsList(props: Iprops) {
  let styleMater = style();
  let jobsItems = props.jobs.map(item => <JobsItem key={item.id} {...item}/>)
  return (
    <div className={styles.List}>
      {jobsItems}
      {(!props.isLoad && !props.isMax) ? 
        <Button onClick={props.addFunBtn} className={styleMater.btn} variant="contained" color="secondary">
          add jobs
        </Button> : (!props.isMax) ? <MinLoadCenter/> : ''
        }
    </div>
  )
}
