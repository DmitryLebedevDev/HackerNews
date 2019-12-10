import * as React from 'react';
import { withRouter } from 'react-router-dom';
import { WithRouterProps, WithRouterStatics, match, RouteComponentProps } from 'react-router';

interface Iprops extends RouteComponentProps<any> {
  match: match<{storyId:string}>;
}

const CommentContiner: React.FC<Iprops> = (props) => {
  console.log("TCL: CommentContiner:React.FC -> props !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", props)
  console.log(props.match.params.storyId)
  return (
    <div>
      {props.match.params.storyId}
    </div>
  )
}
export default withRouter(CommentContiner)