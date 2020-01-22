/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import { addCommentToStoryThunk, addTopStoryThunk } from './../../redux/storys-reducers';
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
      lenIsMax={props.lenIsMax}
    />
  )
}

export default connect(
  (state) => {
    return {
      story:state.storys.storys,
      storysIsLoad: state.storys.storysIsLoad,
      lenIsMax: state.storys.lenIsMax,
    }
  }, {
    addCommentToStoryThunk,
    addTopStoryThunk,
  }
)(StoryListContiner);