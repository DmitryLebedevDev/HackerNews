import React, { useEffect, useRef } from 'react';
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
  let request = useRef(false);
  let addFunc:any = props.addTopStoryThunk || props.funcAdd;
  useEffect(() => {
    request.current=false
    // auto load
    const startScroll = (event: any) => {
      if (document.body.scrollHeight-150 <= 
        document.documentElement.scrollTop 
        + 
        document.documentElement.clientHeight && addFunc) {
          if (!request.current) {
            request.current = true;
            addFunc();
          }
        }
    }
    window.addEventListener('scroll', startScroll);
    return () => {
      window.removeEventListener('scroll',startScroll);
    }
  },[props.storys.length]);
  let storys = props.storys.map((item:Istory) => 
    <StoryItem key={item.id} addCommentToStoryThunk={props.addCommentToStoryThunk} {...item}/>)
  return (
    <div className={styles.StotyList}>
      {storys}
      {((props.storysIsLoad) && <LinearProgress />)}
      {(!props.storysIsLoad && !props.lenIsMax) ? <div className={styles.Story__blockCenter}>
        <div style={{marginTop: 10, paddingBottom: 15}}>
          <Button onClick={() => addFunc()} variant="contained" color="secondary"> add story </Button>
        </div>
      </div> : ''}
    </div>
  )
}