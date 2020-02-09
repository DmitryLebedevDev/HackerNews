import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import {initThunk} from '../../redux/ask-reducers';
import IStore from '../../redux/storeType'
import { Iask } from '../../redux/ask-reducersType';
import MinLoadCenter from '../decorComponent/minLoadCenter';
import StorysList from '../StoryPage/StorysList';

interface Iprops {
  init: boolean,
  ask: Iask[],
  initThunk: () => void
}

function AskContiner(props: Iprops) {
  useEffect(() => {
    if(!props.init) {
      props.initThunk();
    }
  },[props.init])
  if (!props.init) {
    return (
      <div style={{paddingTop:'20px'}}>
        <MinLoadCenter/>
      </div>
    )
  }
  return (
    <div>
      <StorysList storys={props.ask} storysIsLoad={false} lenIsMax={true}/>
    </div>
  )
}
export default connect((state:IStore) => {
  return {
    init: state.ask.init,
    ask: state.ask.questions,
  }
},{
  initThunk
})(AskContiner)