import React, { useState } from 'react';
import styles from './StoryList.module.css';
import { Link } from 'react-router-dom';
import { Button, LinearProgress, CircularProgress } from '@material-ui/core';
import MinLoadCenter from '../decorComponent/minLoadCenter';


function StorysList(props: any) {
  console.log("TCL: StorysList -> props", props)
  let sotys = props.story.map((item:Iprops) =>
    <StoryItem key={item.id} addCommentToStoryThunk={props.addCommentToStoryThunk} {...item}/>)
  return (
    <div className={styles.StotyList}>
      {sotys}
      {(props.storysIsLoad) && <LinearProgress />}
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
  commentsIsLoad: boolean,
  addCommentToStoryThunk: (id:number) => void;
}

function openComment() {

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
        (1) ? (<>
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
  let [openIsComment, openComment] = useState(false);
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
        <a href={props.url}>{props.header}</a>
      </div>
      <div className={styles.Story__info}>
        {props.score} points by {props.author} data | hide |
        <Link to={`/story/${props.id}`} className={styles.Story__linkComments}
          onClick={() => { openComment(r => !r) }}><Button color="primary">{props.fullLenComments} comments</Button> </Link>
        {(openIsComment) && comments}
        {(props.commentsIsLoad) ? <MinLoadCenter/> : ''}
      </div>
    </div>
  )
}

export default StorysList;