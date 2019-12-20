import React from 'react'
import { connect } from 'react-redux';
import IStore from '../../redux/storeType';
import { withRouter, match, RouteComponentProps } from 'react-router-dom';
import { addUserThunk } from './../../redux/user-reducers';

interface Iprops extends RouteComponentProps<any> {
  match:match<{userId:string}>;
  addUserThunk: (id:string) => Promise<void>;
  //users: IUser[];
}

const UserPageContainer:React.FC<Iprops> = (props) => {
  return (
    <div>
      User : {props.match.params.userId}
    </div>
  )
}
export default connect(
  (state:IStore) => {
    return {
      users:state.users.users
    }
  }, {
    addUserThunk,
  }
)(withRouter(UserPageContainer));