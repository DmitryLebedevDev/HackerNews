import React from 'react';
import {connect} from 'react-redux';
import IStore from '../../redux/storeType';

function JobsContainer() {
  return (
    <div>
      jobs
    </div>
  )
}
export default connect(
  (store:IStore) => {
    return {
    }
  }
)(JobsContainer);