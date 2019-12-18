/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import { addCommentToStoryThunk, addTopStoryThunk } from './../../redux/store-reducers';
import StorysList from './StoryList';


function StoryListContiner(props) {
  useEffect(()=>{
    if (props.story < 50) {
      props.addTopStoryThunk();
    }
  },[props.story]);
  return (
    <StorysList 
      addCommentToStoryThunk={props.addCommentToStoryThunk}
      story={props.story} 
      storysIsLoad={props.storysIsLoad}
      addTopStoryThunk={props.addTopStoryThunk}
    />
  )
}

export default connect(
  (state) => {
    return {
      story:state.storys.storys,
      storysIsLoad: state.storys.storysIsLoad,
    }
  }, {
    addCommentToStoryThunk,
    addTopStoryThunk,
  }
)(StoryListContiner);