import React, { useState } from 'react'
import { connect } from 'react-redux';
import IStore from '../../redux/storeType';
import { RouteComponentProps, match, withRouter } from 'react-router-dom';
import { IUser } from '../../redux/user-reducersType';
import { addUserThunk } from './../../redux/user-reducers';

interface Iprops extends RouteComponentProps<any> {
  match: match<{userId:string}>;
  users:{[key: string]: IUser};
  addUserThunk: (id:string) => Promise<any>;
}

function UserPageCommetns(props: Iprops) {
  let [isReq, setReq] = useState(false);
  let currentUser = props.users[props.match.params.userId];
  if (!currentUser && !isReq) {
    props.addUserThunk(props.match.params.userId);
    setReq(true);
  }
  return (
    <div>
      {props.match.params.userId}
    </div>
  )
}
export default connect(
  (state:IStore) => {
    return {
      users: state.users.users,
    }
  },{
    addUserThunk
  }
)(withRouter(UserPageCommetns));