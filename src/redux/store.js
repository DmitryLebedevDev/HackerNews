import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer} from 'redux-form';
import storeReducers from './storys-reducers';
import init from './init-reducers';
import userReducers from './user-reducers';
import jobsReducer from './jobs-reducers';
import getByIdReducers from './getById-reducers';
import newStorysReducers from './newStorys-reducers';
import askReducers from './ask-reducers';

const redusers = combineReducers ({
    form:formReducer,
    storys:storeReducers,
    newStorys: newStorysReducers,
    init,
    users:userReducers,
    jobs: jobsReducer, 
    getByItem: getByIdReducers,
    ask: askReducers,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.state = store;

export default store;