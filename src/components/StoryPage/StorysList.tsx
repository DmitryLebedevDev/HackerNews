import React, { useEffect } from 'react';
import styles from './StorysList.module.css';
import { LinearProgress, Button } from '@material-ui/core';
import StoryItem from './StoryIrem';
import { Istory } from '../../redux/storys-reducersType';

interface Iprops {
  addCommentToStoryThunk?: (id: number) => void;
  addTopStoryThunk?: () => void;
  funcAdd?: any;
  storys: Istory[];
  storysIsLoad: boolean;
  lenIsMax: boolean;
}

export default function StorysList(props: Iprops) {
  let addFunc:any = props.addTopStoryThunk || props.funcAdd;
  /*useEffect(() => {
    // auto load
    window.onscroll = () => {
      if (document.body.scrollHeight === 
        document.documentElement.scrollTop 
        + 
        document.documentElement.clientHeight && addFunc) {
          addFunc();
        }
    }
    return () => {
      console.log('я все');
    }
  },[])*/
  let storys = props.storys.map((item:Istory) => 
    <StoryItem key={item.id} addCommentToStoryThunk={props.addCommentToStoryThunk} {...item}/>)
  return (
    <div className={styles.StotyList}>
      {storys}
      {((props.storysIsLoad) && <LinearProgress />)}
      {(!props.storysIsLoad && !props.lenIsMax) ? <div className={styles.Story__blockCenter}>
        <Button onClick={() => addFunc()} variant="contained" color="secondary"> add story </Button>
      </div> : ''}
    </div>
  )
}