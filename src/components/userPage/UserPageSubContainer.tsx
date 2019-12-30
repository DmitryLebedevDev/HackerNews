import React, { useEffect,useState } from 'react'
import { connect } from 'react-redux';
import IStore from '../../redux/storeType';
import { withRouter,match, RouteComponentProps } from 'react-router-dom';
import { IUser } from '../../redux/user-reducersType';
import Load from './../decorComponent/load';
import { addUserThunk , addUserStoryThunk} from './../../redux/user-reducers';
import StorysList from '../components-header/StoryList';

interface Iprops extends RouteComponentProps<any> {
  match:match<{userId:string}>;
  users:{[key: string]: IUser};
  addUserStoryThunk: (id: string) => void;
  addUserThunk: (id: string) => Promise<any>;
}

const UserPageSubContainer:React.FC<Iprops> = (props) => {
  useEffect(() => {
    props.addUserThunk(props.match.params.userId).then(res => {
      props.addUserStoryThunk(props.match.params.userId);
    })
  },[])
  let [isLoad, load] = useState(false);
  let currentUser = props.users[props.match.params.userId];
  if (currentUser) {
    if (currentUser.story && currentUser.story.length >= 1) {
      return (
        <StorysList 
          storysIsLoad={currentUser.isLoad}
          story={currentUser.story} 
          funcAdd={() => {
            props.addUserStoryThunk(props.match.params.userId)
          }}
          lenIsMax={currentUser.maxItems}
          />
      )
    }
    if (!currentUser.story && currentUser.maxItems) {
      return (
        <div>
          no story
        </div>
      )
    }
  }
  return (
    <div>
      <Load/>
    </div>
  )
}

export default connect(
  (store: IStore) => {
    return {
      users: store.users.users
    }
  }, {
    addUserThunk,
    addUserStoryThunk,
  }
)(withRouter(UserPageSubContainer));