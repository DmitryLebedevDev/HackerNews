import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StorysList from './components-header/StoryList.tsx';
import { connect } from 'react-redux';
import { addCommentToStoryThunk } from './../redux/store-reducers';
import CommentContiner from './components-header/commentContiner';
import ErorrPage from './helpers-components/ErorrPage';


function Content (props) {
  return (
    <div>
        <Switch>
          <Route path='/story/:storyId' render={ () => <CommentContiner story={props.story} /> }/>
          <Route path='/error' render={ () => <ErorrPage/> }/>
          <Route path='/' render={() => <StorysList 
          addCommentToStoryThunk={props.addCommentToStoryThunk}
          story={props.story} 
          storysIsLoad={props.storysIsLoad}
          />}/>
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