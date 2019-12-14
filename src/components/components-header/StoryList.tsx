import React, { useState } from 'react';
import styles from './StoryList.module.css';
import { Link } from 'react-router-dom';

function StorysList(props: any) {
  let sotys = props.story.map((item:Iprops) =>
    <StoryItem key={item.id} addCommentToStoryThunk={props.addCommentToStoryThunk} {...item}/>)
  return (
    <div className={styles.StotyList}>
      {sotys}
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
  addCommentToStoryThunk: (id:number) => void 
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
  let [isOpenComment, openComment] = useState(true);
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
      <h6 className={styles.CommentBlock}>Name:{props.name}</h6>
      <div dangerouslySetInnerHTML={{ __html: props.text }} className={styles.CommentBlock__content}></div>
      {
        (1) ? (<>
          <div className={styles.Story__linkComments} onClick={() => {
            openComment(r => !r);}}>
            Comments:{props.commentsLeng}
          </div>
          {comments}
        </>) : ''}
    </div>
  )
}

function StoryItem(props: Iprops) {
  let [openIsComment, openComment] = useState(false);
  let comments = [];
  if (openIsComment && Object.keys(props.comments).length === 0) {
    console.log('МЕНЯ НЕ ЕБЁТ Я ЗАПУСКАЮСЬ');
    props.addCommentToStoryThunk(props.id);
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
        <Link to={`story/${props.id}`} className={styles.Story__linkComments}
          onClick={() => { openComment(r => !r) }}> {props.fullLenComments} comments </Link>
        {(openIsComment) && comments}
      </div>
    </div>
  )
}

export default StorysList;