import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer} from 'redux-form';
import storeReducers from './store-reducers';
import init from './init-reducers';

const redusers = combineReducers ({
    form:formReducer,
    storys:storeReducers,
    init,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(redusers, composeEnhancers(applyMiddleware(thunkMiddleware)));
window.state = store;

export default store;