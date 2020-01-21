import React from 'react';
import styles from './StoryList.module.css';
import { LinearProgress, Button } from '@material-ui/core';
import {Iprops as IStoryTypes} from './StoryIrem';
import StoryItem from './StoryIrem';

interface Iprops {
  addCommentToStoryThunk: () => void;
}

export default function StorysList(props: any) {
  let addFunc:any = props.addTopStoryThunk || props.funcAdd;
  let storys = props.storys.map((item:IStoryTypes) => 
    <StoryItem key={item.id} addCommentToStoryThunk={props.addCommentToStoryThunk} {...item}/>)
  return (
    <div className={styles.StotyList}>
      {storys}
      {(props.storysIsLoad) && <LinearProgress />}
      {(!props.storysIsLoad && !props.lenIsMax) ? <div className={styles.Story__blockCenter}>
        <Button onClick={() => addFunc()} variant="contained" color="secondary"> add story </Button>
      </div> : ''}
    </div>
  )
}