import React,{useEffect} from 'react';
import './App.css';
import { connect } from 'react-redux';
import {initThunk} from './redux/init-reducers';
import Header from './components/header.jsx';
import Content from './components/Content';
import store from './redux/store';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MinLoadCenter from './components/decorComponent/minLoadCenter';

interface d {
  isInit: boolean,
  initThunk: () => void
}


const App: React.FC<d> = (props:d) => {
  useEffect(() => {
    if (props.isInit) {
      return
    }
    props.initThunk();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[props.isInit]);

  if(!props.isInit) {
    return (
      <div style={{paddingTop: 15}}>
        <MinLoadCenter/>
      </div>
    )
  }
  return (
    <div>
      <Header/>
      <Content/>
    </div>
  );
}
const AppC = function () {
  return (
    <HashRouter>
      <Provider store={store}>
        <AppCont />
      </Provider>
    </HashRouter>
  )
}
const AppCont = connect(
  (state:any) => {
    return {
      isInit:state.init.init,
    }
  },{
    initThunk,
  }
)(App);

/*export default connect(
  (state:any) => {
    return {
      isInit:state.init.init,
    }
  },{
    initThunk,
  }
)(App);*/
export default AppC
