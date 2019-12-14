import * as React from 'react';
import {useState} from 'react';
import { WithRouterProps, WithRouterStatics, match, RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { addStoryThuck } from '../../redux/store-reducers';
import Load from './../decorComponent/load';
import { StoryItem } from './StoryList';
import { addCommentToStoryThunk } from './../../redux/store-reducers';

interface Iprops extends RouteComponentProps<any> {
  match: match<{storyId:string}>;
  story: {
    id: number,
    fullLenComments: number,
    url: string,
    header: string,
    author: string,
    score: number,
    comments: {
      id: number,
      name: string,
      text: string,
      comments: any,
      commentsLeng: number,
      path: number[],
      fullLenComments: number,
    }[]
  }[];
  storysIsLoad: boolean;
  addStoryThuck: (id: number) => Promise<boolean>;
  addCommentToStoryThunk: () => void
}

const CommentContiner = (props:Iprops) => {
  let currentStory;
  let [page,setPage] = useState(false);
  currentStory = props.story.find(item => item.id === +props.match.params.storyId)
  if (!currentStory && !props.storysIsLoad) {
    // 21787936
    if (page) {
      return <Redirect to='/error'/>
    }
    let info = props.addStoryThuck(+props.match.params.storyId).then(name => setPage(true));
    return (
      <Load/>
    )
  }
  if (currentStory) {
    return (
      <div>
        <StoryItem 
        id={currentStory.id} 
        fullLenComments={currentStory.fullLenComments} 
        url={currentStory.url}
        header={currentStory.header}
        author={currentStory.author}
        score={currentStory.score}
        comments={currentStory.comments}
        addCommentToStoryThunk={props.addCommentToStoryThunk}
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