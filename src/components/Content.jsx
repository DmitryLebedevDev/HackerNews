import React from 'react';
import { Route, Switch } from 'react-router-dom';
import StorysList from './components-header/StoryList.tsx';
import { connect } from 'react-redux';
import { addCommentToStoryThunk } from './../redux/store-reducers';
import CommentContiner from './components-header/commentContiner';


function Content (props) {
  return (
    <div>
      
        <Route path='/comments/:storyId' render={ () => <CommentContiner/> }/>
        <Route path='/' render={() => <StorysList 
        addCommentToStoryThunk={props.addCommentToStoryThunk}
        story={props.story} />}/>
      
    </div>
  )
}

export default connect((state) => {
  return {
    story:state.storys.storys
  }
},{
  addCommentToStoryThunk
})(Content);