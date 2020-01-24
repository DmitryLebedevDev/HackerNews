import React,{useState} from 'react'
import { connect } from 'react-redux';
import IStore from '../../redux/storeType';
import { withRouter, match, RouteComponentProps } from 'react-router-dom';
import { addUserThunk, addUserStoryThunk } from './../../redux/user-reducers';
import { IUser } from '../../redux/user-reducersType';
import Load from '../decorComponent/load';
import UserPage from './UserPage';

interface Iprops extends RouteComponentProps<any> {
  match:match<{userId:string}>;
  users:{[key: string]: IUser};
  addUserThunk: (id:string) => Promise<void>;
  addUserStoryThunk: (id: string) => Promise<any>;
}

const UserPageContainer:React.FC<Iprops> = (props) => {
  const [requersStatis, setrequersStatis] = useState(false);
  let currentUser: IUser | void;
  if(!props.users[props.match.params.userId]) {
    if (!requersStatis) {  
      props.addUserThunk(props.match.params.userId);
      setrequersStatis(true);
    }
  } else {
    currentUser = props.users[props.match.params.userId];
  }
  if (currentUser) {
    return (
      <UserPage user={currentUser} path={props.match.url}/>
    )
  } else {
    return (
      <div>
        <Load/>
      </div>
    )
  }
}
export default connect(
  (state:IStore) => {
    return {
      users:state.users.users
    }
  }, {
    addUserThunk,
    addUserStoryThunk,
  }
)(withRouter(UserPageContainer));