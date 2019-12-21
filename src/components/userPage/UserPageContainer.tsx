import React,{useState} from 'react'
import { connect } from 'react-redux';
import IStore from '../../redux/storeType';
import { withRouter, match, RouteComponentProps } from 'react-router-dom';
import { addUserThunk } from './../../redux/user-reducers';
import { IUser } from '../../redux/user-reducersType';
import Load from '../decorComponent/load';

/*interface Iprops extends RouteComponentProps<any> {
  match:match<{userId:string}>;
  users: IUser[];
  addUserThunk: (id:string) => Promise<void>;
}*/
interface Iprops extends RouteComponentProps<any> {
  match:match<{userId:string}>;
  users:{[key: string]: IUser};
  addUserThunk: (id:string) => Promise<void>;
}

const UserPageContainer:React.FC<Iprops> = (props) => {
  const [requersStatis, setrequersStatis] = useState(false);
  let currentUser;
  if(!props.users[props.match.params.userId]) {
    console.log(props.match.params.userId);
    if (!requersStatis) {  
      props.addUserThunk(props.match.params.userId);
      setrequersStatis(true);
    }
  } else {
    currentUser = props.users[props.match.params.userId];
    console.log(currentUser);
  }
  if (currentUser) {
    return (
      <div>
        User : {props.match.params.userId}
        created : {new Date(currentUser.created).toString()}
        karma : {currentUser.karma}

        <div dangerouslySetInnerHTML={{__html: (currentUser) ? 
          (currentUser.about) ? currentUser.about : ''
          : ''}}>
        </div>
      </div>
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
  }
)(withRouter(UserPageContainer));