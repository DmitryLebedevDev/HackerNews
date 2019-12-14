import * as React from 'react';
import { withRouter,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { addStoryThuck } from '../../redux/store-reducers';



const CommentContiner = (props) => {
  let currentStory;
  currentStory = props.story.find(item => item.id === +props.match.params.storyId)
  if (!currentStory && !props.storysIsLoad) {
    console.log(addStoryThuck('1123123'));
    let info = addStoryThuck(props.match.params.storyId).then(name => console.log(name));
    if (!addStoryThuck(props.match.params.storyId)) {
      return (
        <Redirect to="/error" />
      )
    }
  }
  return (
    <div>
      говно
      {(currentStory) ? currentStory.author : props.match.params.storyId }
    </div>
  )
}
export default connect((state) => {
  return {
    story: state.storys.storys,
    storyIsLoad: state.storys.storysIsLoad,
  }
},{
  addStoryThuck,
})(withRouter(CommentContiner));