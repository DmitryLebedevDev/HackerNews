import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import IStore from '../../redux/storeType';
import {addJobsThunk} from '../../redux/jobs-reducers';
import JobsList from './JobsList';
import { Ijob } from '../../redux/jobs-reducersType';
import Load from '../decorComponent/load';
import { LinearProgress } from '@material-ui/core';

interface Iprops {
  addJobsThunk: () => void;
  jobs: Ijob[];
  isLoad: boolean;
  isMax: boolean;
}
function JobsContainer(props: Iprops) {
  useEffect(() => {
    props.addJobsThunk();
  },[])
  if (!props.jobs.length) {
    return (
      <LinearProgress value={100}/>
    )
  }
  return (
    <div>
      <JobsList jobs={props.jobs} 
                addFunBtn={props.addJobsThunk} 
                isLoad={props.isLoad}
                isMax={props.isMax}
                />
    </div>
  )
}
export default connect(
  (store:IStore) => {
    return {
      jobs:store.jobs.jobs,
      isLoad: store.jobs.isLoad,
      isMax: store.jobs.isMax,
    }
  }, {
    addJobsThunk,
  }
)(JobsContainer);