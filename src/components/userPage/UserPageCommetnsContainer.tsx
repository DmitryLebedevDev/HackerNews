import React, { useState , useEffect} from 'react'
import { connect } from 'react-redux';
import IStore from '../../redux/storeType';
import { RouteComponentProps, match, withRouter } from 'react-router-dom';
import { IUser } from '../../redux/user-reducersType';
import { addUserThunk, addUserCommentsThunk } from '../../redux/user-reducers';
import { BlockComment } from '../components-header/StoryList';
import Load from './../decorComponent/load';
import { addUserComentsOpenThunk } from './../../redux/user-reducers';

interface Iprops extends RouteComponentProps<any> {
  match: match<{userId:string}>;
  users:{[key: string]: IUser};
  addUserThunk: (id:string) => Promise<any>;
  addUserCommentsThunk: (id:string) => Promise<any>;
  addUserComentsOpenThunk: (idUser: string, idComment: number) => any
}

function UserPageCommetns(props: Iprops) {
  console.log('RENDER COMMENTS');
  let [isReq, setReq] = useState(false);
  useEffect(() => {
    props.addUserThunk(props.match.params.userId).then(res => {
      console.log(props.match.params.userId, 'я запустилась')
      props.addUserCommentsThunk(props.match.params.userId);
    });
  },[props.match.params.userId])
  let currentUser = props.users[props.match.params.userId];
  if (currentUser && currentUser.comments.length>0) {
    /*
      id: res.id,
              name: res.by,
              text: res.text,
              //comments
              //commentsLeng(pin):1
              commentsIdArr: res.kids,

      id?: number | undefined;
      name?: string | undefined;
      text: string;
      comments?: any;
      commentsLeng: number;
      path: number[];
      fullLenComments: number;
    */
    let commetns = currentUser.comments.map((item:any) => <BlockComment key={item.id}
      id={item.id}
      name={item.name}
      text={item.text}
      commetnsArr={item.commentsIdArr}
      funcBtn={() => {
        console.log(currentUser.id,'currentUser')
        props.addUserComentsOpenThunk(currentUser.id,item.id)
      }}
      comments={item.comments}
    />)
    return (
      <div>
        {commetns}
      </div>
    )
  }
  if (currentUser && currentUser.maxItems) {
    return (
      <div>
        no comments
      </div>
    )
  }
  return (
    <div>
      <Load/>
    </div>
  )
}
export default React.memo(connect(
  (state:IStore) => {
    return {
      users: state.users.users,
    }
  },{
    addUserThunk,
    addUserCommentsThunk,
    addUserComentsOpenThunk,
  }
)(withRouter(React.memo(UserPageCommetns))))