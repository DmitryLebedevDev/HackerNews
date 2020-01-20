import React,{useState} from 'react';
import styles from './CommentsBlock.module.css';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import MinLoadCenter from '../decorComponent/minLoadCenter';

export function BlockComment(props: {
    id?: number,
    name?: string,
    text: string,
    comments?: any,
    commentsLeng?: number,
    path?: number[],
    fullLenComments?: number,
    commetnsArr?: number[],
    funcBtn?: any,
    isLoad?: boolean,
    //addFunc?: (idCommetn: number) => void
  }) {
    let [isOpenComment, openComment] = useState(false);
    let comments = [];
    if (isOpenComment) {
      if (props.comments) {
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
        <h6 className={styles.CommentBlock__name}>
          <Link to={`/user/${props.name}`}>{props.name}</Link>
        </h6>
        <div dangerouslySetInnerHTML={{ __html: props.text }} className={styles.CommentBlock__content}>
        </div>
        {
          (props.isLoad) ? <MinLoadCenter/> :
          (props.commentsLeng || (props.commetnsArr) && props.commetnsArr.length) && (<>
            <div className={styles.Story__linkComments} onClick={() => {
              openComment(r => !r);
              if (props.funcBtn && comments.length === 0) {
                props.funcBtn();// запуск
              } 
            }}>
              <Button color="primary">Comments {props.commentsLeng}</Button>
            </div>
            {comments}
          </>)}
      </div>
    )
 }