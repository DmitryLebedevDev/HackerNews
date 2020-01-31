import React,{useState} from 'react';
import styles from './StorysList.module.css';
import { Link as MaterialBottom, Button} from '@material-ui/core';
import { BlockComment } from '../CommentsBlock/CommentsBlock';
import { Link } from 'react-router-dom';
import MinLoadCenter from '../decorComponent/minLoadCenter';
import { egoDateToString } from '../../helpers/function';
import { Istory } from '../../redux/storys-reducersType';

export interface Iprops extends Istory {
  addCommentToStoryThunk?: (id:number) => void;
  commentsDefOpen?: boolean;
  isLink?: boolean;
}

export default function StoryItem(props: Iprops) {
  debugger
  let link = props.isLink ? false : true;
  let [openIsComment, openComment] = useState((props.commentsDefOpen) ? true : false); // if comments is open
  let [statusRecuest,setStatusRecuest] = useState(false);
  let comments = [];
  // if comments open and comments len 0 then request
  if (!statusRecuest && openIsComment && Object.keys(props.comments).length === 0) {
    if (props.addCommentToStoryThunk) {
      props.addCommentToStoryThunk(props.id);
      setStatusRecuest(true);
    }
  }
  for (let current in props.comments) {
    comments.push(
      <BlockComment key={props.comments[current].id}
        name={props.comments[current].name}
        text={props.comments[current].text}
        comments={props.comments[current].comments}
        commentsLeng={props.comments[current].commentsLeng}
        fullLenComments={props.comments[current].fullLenComments}
      />
    );
  }
    return (
    <div className={styles.Story}>
      <div className={styles.Story__header}>
        <MaterialBottom href={(props.url) && props.url} className={styles.Story__link_header}>
          {props.header}
        </MaterialBottom>
      </div>
      <div className={styles.Story__info}>
        <div className={styles.Story__blockCenter}>
          {props.score} points by 
          <Link to={`/user/${props.author}`} className={styles.Story__linkToProfile}>
            {props.author} 
          </Link> {egoDateToString(props.time)} | hide 
          {(props.fullLenComments) ? (link) ? 
            <Link to={`/story/${props.id}`} className={styles.Story__linkComments}
            onClick={() => { openComment(r => !r) }}>
              <Button color="primary">
                comments {props.fullLenComments}
              </Button> 
            </Link> : //!!!!!!!
            <Button className={styles.Story__linkComments} 
            color="primary" onClick={() => { openComment(r => !r)}}>
              comments {props.fullLenComments}
            </Button>
           : ''}
        </div>
        {(openIsComment) && comments}
        {(props.commentsIsLoad) ? <MinLoadCenter/> : ''}
      </div>
    </div>
  )
}
/*
<Link to={`/story/${props.id}`} className={styles.Story__linkComments}
            onClick={() => { openComment(r => !r) }}>
            <Button color="primary">
              comments {props.fullLenComments}
            </Button>
          </Link>*/