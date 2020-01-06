import React from 'react'
import { Ijob } from '../../redux/jobs-reducersType'
import JobsItem from './JobsItem'
import styles from './Jobs.module.css'

interface Iprops {
  jobs: Ijob[];
  addFunBtn: () => void;
  isLoad: boolean;
}

export default function JobsList(props: Iprops) {
  let jobsItems = props.jobs.map(item => <JobsItem {...item}/>)
  return (
    <div className={styles.List}>
      {jobsItems}
    </div>
  )
}
