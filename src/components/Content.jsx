import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { addCommentToStoryThunk } from './../redux/store-reducers';
import CommentContiner from './components-header/commentContiner';
import ErorrPage from './helpers-components/ErorrPage';
import StoryListContiner from './components-header/StoryListContiner';
import UserPageContainer from './userPage/UserPageContainer';


function Content (props) {
  return (
    <div>
        <Switch>
          <Route path='/story/:storyId' render={ () => <CommentContiner/> }/>
          <Route path='/story' render={() => <StoryListContiner/>}/>
          <Route path='/user/:userId' render={() => <UserPageContainer/>}/>
          <Route path='/error' render={ () => <ErorrPage/> }/>
        </Switch>
    </div>
  )
}

export default connect((state) => {
  return {
    story:state.storys.storys,
    storysIsLoad: state.storys.storysIsLoad,
  }
},{
  addCommentToStoryThunk
})(Content);