import React,{useEffect} from 'react';
import './App.css';
import { connect } from 'react-redux';
import {initThunk} from './redux/init-reducers';

function App(props) { 
  useEffect(()=>{
    props.initThunk();
  })
  if(!props.init) {
    return (
      <div>Загрузка ебаная</div>
    )
  }
  return (
    <div>
      Здарово блять
    </div>
  );
}

export default connect(
  (state) => {
    console.log(state);
    return {
      isInit:state.init.init
    }
  },{
    initThunk
  }
)(App);
