import React, { useEffect } from 'react'
import IStore from '../../redux/storeType';
import { connect } from 'react-redux';
import { Istory } from '../../redux/storys-reducersType';
import StorysList from '../StoryPage/StorysList';
import {initNewStoryPageThunk, addStoryThunk} from '../../redux/newStorys-reducers'
import MinLoadCenter from '../decorComponent/minLoadCenter';

interface Iprops {
  init: boolean,
  storys: Istory[],
  isLoad: boolean,
  initNewStoryPageThunk: () => void,
  addStoryThunk: () => void,
}

function NewStorysContainer(props:Iprops) {
  useEffect(()=> {
    if(!props.init) {
      props.initNewStoryPageThunk();
    }
  },[props.init])
  if (props.init) {
    return (
      <StorysList 
        storys={props.storys} 
        storysIsLoad={props.isLoad} 
        lenIsMax={false} 
        addTopStoryThunk={props.addStoryThunk}/>
    )
  } else {
    return (<MinLoadCenter/>)
  }
}
export default connect(
  (state: IStore) => {
    return {
      init: state.newStorys.isInit,
      storys: state.newStorys.story,
      isLoad: state.newStorys.isLoad,
    }
  }, {
    initNewStoryPageThunk,
    addStoryThunk,
  }
)(NewStorysContainer);