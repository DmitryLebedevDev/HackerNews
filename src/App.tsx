import React,{useEffect} from 'react';
import './App.css';
import { connect } from 'react-redux';
import {initThunk} from './redux/init-reducers';
import Header from './components/header.jsx';
import Content from './components/Content';

interface d {
  isInit: boolean,
  initThunk: () => void
}


const App: React.FC<d> = (props:d) => { 
  useEffect(()=>{
    if (props.isInit) {
      return
    }
    props.initThunk();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.isInit])

  if(!props.isInit) {
    return (
      <div>Загрузка ебаная</div>
    )
  }
  return (
    <div>
      <Header/>
      <Content/>
    </div>
  );
}

export default connect(
  (state:any) => {
    return {
      isInit:state.init.init,
    }
  },{
    initThunk,
  }
)(App);
