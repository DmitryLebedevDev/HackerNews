import React, { useState } from 'react';
import styles from './StoryList.module.css';
import { Link } from 'react-router-dom';
import { Link as MaterialBottom} from '@material-ui/core';
import { Button, LinearProgress } from '@material-ui/core';
import MinLoadCenter from '../decorComponent/minLoadCenter';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles({
  red: {
    color: 'red',
  }
})

function StorysList(props: any) {
  let colorButton = useStyle();
  let sotys = props.story.map((item:Iprops) =>
    <StoryItem key={item.id} addCommentToStoryThunk={props.addCommentToStoryThunk} {...item}/>)
  return (
    <div className={styles.StotyList}>
      {sotys}
      {(props.storysIsLoad) && <LinearProgress />}
      {(!props.storysIsLoad && !props.lenIsMax) ? <div className={styles.Story__blockCenter}>
        <Button onClick={()=> props.addTopStoryThunk()} variant="contained" color="secondary"> add story </Button>
      </div> : ''}
    </div>
  )
}

interface Iprops {
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
  }[],
  commentsDefOpen?: boolean,
  commentsIsLoad: boolean,
  addCommentToStoryThunk: (id:number) => void;
}


function BlockComment(props: {
  id?: number,
  name?: string,
  text: string,
  comments?: any,
  commentsLeng: number,
  path: number[],
  fullLenComments: number
}) {
  let [isOpenComment, openComment] = useState(false);
  let comments = [];
  if (isOpenComment) {
    if (!props.comments) {
    } else {
      let keys = Object.keys(props.comments);
      if (props.comments && props.comments[keys[0]] && props.comments[keys[0]].id) {
        for (let current in props.comments) {
          comments.push(<BlockComment
            key={props.comments[current].id}
            id={props.comments[current].id}
            name={props.comments[current].name}
            text={props.comments[current].text}
            comments={props.comments[current].comments}
            commentsLeng={props.comments[current].commentsLeng}
            path={props.comments[current].path}
            fullLenComments={props.comments[current].fullLenComments}
          />)
        }
      } else {
      }
    }
  }
  return (
    <div className={styles.CommentBlock}>
      <h6 className={styles.CommentBlock__name}>{props.name}</h6>
      <div dangerouslySetInnerHTML={{ __html: props.text }} className={styles.CommentBlock__content}></div>
      {
        (props.commentsLeng) ? (<>
          <div className={styles.Story__linkComments} onClick={() => {
            openComment(r => !r);}}>
            <Button color="primary">Comments {props.commentsLeng}</Button>
          </div>
          {comments}
        </>) : ''}
        
    </div>
  )
}

export function StoryItem(props: Iprops) {
  let [openIsComment, openComment] = useState((props.commentsDefOpen) ? true : false);
  let [statusRecuest,setStatusRecuest] = useState(false);
  let comments = [];
  if (!statusRecuest && openIsComment && Object.keys(props.comments).length === 0) {
    console.log('МЕНЯ НЕ ЕБЁТ Я ЗАПУСКАЮСЬ');
    props.addCommentToStoryThunk(props.id);
    setStatusRecuest(true);
  }
  for (let current in props.comments) {
    comments.push(
      <BlockComment key={props.comments[current].id}
        name={props.comments[current].name}
        text={props.comments[current].text}
        comments={props.comments[current].comments}
        commentsLeng={props.comments[current].commentsLeng}
        path={props.comments[current].path}
        fullLenComments={props.comments[current].fullLenComments}
      />
    );
  }
    return (
    <div className={styles.Story}>
      <div className={styles.Story__header}>
        <MaterialBottom href={props.url} className={styles.Story__link_header}>
          {props.header}
        </MaterialBottom>
      </div>
      <div className={styles.Story__info}>
        <div className={styles.Story__blockCenter}>
          {props.score} points by 
          <Link to={`/user/${props.author}`} className={styles.Story__linkToProfile}>
            {props.author} 
          </Link> data | hide |
          <Link to={`/story/${props.id}`} className={styles.Story__linkComments}
            onClick={() => { openComment(r => !r) }}>
            <Button color="primary">
              comments {props.fullLenComments}
            </Button>
          </Link>
        </div>
        {(openIsComment) && comments}
        {(props.commentsIsLoad) ? <MinLoadCenter/> : ''}
      </div>
    </div>
  )
}

export default StorysList;