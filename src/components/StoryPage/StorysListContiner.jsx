/* eslint-disable react-hooks/exhaustive-deps */
import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import { addCommentToStoryThunk, addTopStoryThunk } from './../../redux/storys-reducers';
import StorysList from './StorysList';


function StoryListContiner(props) {
  useEffect(()=>{
    if (props.storys.length < 50) {
      props.addTopStoryThunk();
    }
  },[props.story]);
  return (
    <StorysList 
      addCommentToStoryThunk={props.addCommentToStoryThunk}
      storys={props.storys} 
      storysIsLoad={props.storysIsLoad}
      addTopStoryThunk={props.addTopStoryThunk}
      lenIsMax={props.lenIsMax}
    />
  )
}
export default connect(
  (state) => {
    return {
      storys:state.storys.storys,
      storysIsLoad: state.storys.storysIsLoad,
      lenIsMax: state.storys.lenIsMax,
    }
  }, {
    addCommentToStoryThunk,
    addTopStoryThunk,
  }
)(StoryListContiner);