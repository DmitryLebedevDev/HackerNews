import React, { useState } from 'react'
import { connect } from 'react-redux';
import IStore from '../../redux/storeType';
import { RouteComponentProps, match, withRouter } from 'react-router-dom';
import { IUser } from '../../redux/user-reducersType';
import { addUserThunk, addUserCommentsThunk } from '../../redux/user-reducers';
import { BlockComment } from '../components-header/StoryList';

interface Iprops extends RouteComponentProps<any> {
  match: match<{userId:string}>;
  users:{[key: string]: IUser};
  addUserThunk: (id:string) => Promise<any>;
  addUserCommentsThunk: (id:string) => Promise<any>;
}

function UserPageCommetns(props: Iprops) {
  let [isReq, setReq] = useState(false);
  let currentUser = props.users[props.match.params.userId];
  if (!currentUser && !isReq) {
    props.addUserThunk(props.match.params.userId).then(res => {
      props.addUserCommentsThunk(props.match.params.userId);
    });
    setReq(true);
  }
  if (currentUser) {
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
    />)
    return (
      <div>
        {commetns}
      </div>
    )
  }
  // <BlockComment />
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
    addUserThunk,
    addUserCommentsThunk,
  }
)(withRouter(UserPageCommetns));