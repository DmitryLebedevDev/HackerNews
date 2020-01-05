import React, { useEffect } from 'react';
import {connect} from 'react-redux';
import IStore from '../../redux/storeType';
import {addJobsThunk} from '../../redux/jobs-reducers';

interface Iprops {
  addJobsThunk: () => void
}
function JobsContainer(props: Iprops) {
  useEffect(() => {
    props.addJobsThunk();
    console.log('i tyt')
  },[])
  return (
    <div>
      <button onClick={() => {props.addJobsThunk()}}>add</button>
      jobs
    </div>
  )
}
export default connect(
  (store:IStore) => {
    return {
    }
  }, {
    addJobsThunk,
  }
)(JobsContainer);