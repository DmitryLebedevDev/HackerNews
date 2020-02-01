import * as React from 'react';
import {useState} from 'react';
import { match, RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { addStoryThuck } from '../../redux/storys-reducers';
import Load from './../decorComponent/load';
import  StoryItem from './StoryIrem';
import { addCommentToStoryThunk } from './../../redux/storys-reducers';
import { Istory } from '../../redux/storys-reducersType';

interface Iprops extends RouteComponentProps<any> {
  match: match<{storyId:string}>;
  story: Istory[];
  storysIsLoad: boolean;
  addStoryThuck: (id: number) => Promise<boolean>;
  addCommentToStoryThunk: (idStory: number) => void
}

const CommentContiner = (props:Iprops) => {
  let currentStory;
  let [page,setPage] = useState(false);
  currentStory = props.story.find(item => item.id === +props.match.params.storyId)
  if (!currentStory && !props.storysIsLoad) {
    if (page) {
      return <Redirect to='/error'/>
    }
    props.addStoryThuck(+props.match.params.storyId).then(() => setPage(true));
    return (
      <Load/>
    )
  }
  if (currentStory) {

    return (
      <div>
        <StoryItem {...currentStory}
          addCommentToStoryThunk={props.addCommentToStoryThunk}
          commentsDefOpen={true}
        />
      </div>
    )
  }
  return (
    <Load />
  )
}
export default connect((state:any) => {
  return {
    story: state.storys.storys,
    storyIsLoad: state.storys.storysIsLoad,
  }
},{
  addStoryThuck,
  addCommentToStoryThunk,
})(withRouter(CommentContiner));