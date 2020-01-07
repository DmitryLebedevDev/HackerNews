import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux';
import IStore from '../../redux/storeType';
import { withRouter, match, RouteComponentProps } from 'react-router-dom';
import { addUserThunk, addUserStoryThunk } from './../../redux/user-reducers';
import { IUser } from '../../redux/user-reducersType';
import Load from '../decorComponent/load';
import UserPage from './UserPage';

/*interface Iprops extends RouteComponentProps<any> {
  match:match<{userId:string}>;
  users: IUser[];
  addUserThunk: (id:string) => Promise<void>;
}*/
interface Iprops extends RouteComponentProps<any> {
  match:match<{userId:string}>;
  users:{[key: string]: IUser};
  addUserThunk: (id:string) => Promise<void>;
  addUserStoryThunk: (id: string) => Promise<any>;
}

const UserPageContainer:React.FC<Iprops> = (props) => {
  //console.log("TCL: props !!!!!!!!!!!!!!!!!!!!!!",  props)
  const [requersStatis, setrequersStatis] = useState(false);
  let currentUser: IUser | void;
  if(!props.users[props.match.params.userId]) {
    console.log(props.match.params.userId);
    if (!requersStatis) {  
      debugger
      props.addUserThunk(props.match.params.userId);
      console.log("TCL: props.match", props.match)
      console.log('ты не думой нахой  ятут')
      setrequersStatis(true);
    }
  } else {
    currentUser = props.users[props.match.params.userId];
    console.log(currentUser);
  }
  useEffect(() => {
    if (currentUser) {
      if (currentUser)
      console.log(currentUser)
      //props.addUserStoryThunk(currentUser.id);
    }
  },[currentUser, props])
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
/**
 * User : {props.match.params.userId}
        created : {new Date(currentUser.created).toString()}
        karma : {currentUser.karma}

        <div dangerouslySetInnerHTML={{__html: (currentUser) ? 
          (currentUser.about) ? currentUser.about : ''
          : ''}}>
        </div>
 * 
 * 
 * 
 */
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