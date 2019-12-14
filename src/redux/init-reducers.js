import { addTopStoryThunk, stopLoadStory } from './store-reducers';

const INIT = "INIT";

export const init = () => {
  return {
    type:INIT
  }
}
export const initThunk = () => async (dispatch) => {
  dispatch(init());
  //await dispatch(addTopStoryThunk());
  dispatch(stopLoadStory());
}

const start = {
  init: false
}

function initReducer (state=start,action) {
  if (action.type === INIT) {
    return {
      ...state,
      init:true,
    }
  }
  return state;
}

export default initReducer