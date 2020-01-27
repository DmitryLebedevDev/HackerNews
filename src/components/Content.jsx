import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import CommentContiner from './StoryPage/StoryCommentOpen';
import ErorrPage from './helpers-components/ErorrPage';
import StorysListContiner from './StoryPage/StorysListContiner';
import UserPageContainer from './userPage/UserPageContainer';
import UserPageSub from './userPage/UserPageSubContainer';
import UserPageCommetns from './userPage/UserPageCommetnsContainer';
import JobsContainer from './jobs/JobsContainer';
import GetByIdPageContainer from './getById/GetByIdPageContainer.tsx';
import NewStorysContainer from './newStorys/newStorysContainer';
import AskContiner from './ask/askContiner';

function Content (props) {
  return (
    <div>
        <Switch>
          <Route path='/getById' render={ () => <GetByIdPageContainer />} />
          <Route path='/getById/:id' render={ () => <GetByIdPageContainer />}/>
          <Route path='/newStorys'render={ () => <NewStorysContainer/>}/>
          <Route path='/story/:storyId' render={ () => <CommentContiner/> }/>
          <Route path='/story' render={() => <StorysListContiner/>}/>
          <Route path='/user/:userId/submission' render={() => <UserPageSub/>} />
          <Route path='/user/:userId/comments' render={() => <UserPageCommetns/>}/>
          <Route path='/user/:userId/favorites' render={() => <div>favorites</div>}/>
          <Route path='/user/:userId' render={() => <UserPageContainer/>}/>
          <Route path='/ask' render={() => <AskContiner/> } />
          <Route path='/jobs' render={() => <JobsContainer />}/>
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
})(Content);