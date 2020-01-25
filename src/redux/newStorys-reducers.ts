import InewStoryReducers from "./newStorys-reducersType";
import { maxItems } from "../api/api";
import { getItems } from "../helpers/function";
import { Istory } from "./storys-reducersType";

const SET_INDEX_STORY = 'SET_INDEX_STORY';
const INITIALIZE = 'INITIALIZE';
const ADD_STORYS = 'ADD_STORYS';

const IS_COUNT_LOAD_STORY = 10;

const initialize = () => {
  return {
    type: INITIALIZE
  }
}

const addStorys = (storys:Istory) => {
  return {
    type: ADD_STORYS,
    storys,
  }
}

const setIndexStory = (index: number) => {
  return {
    type: SET_INDEX_STORY,
    index,
  }
}

export const initNewStoryPageThunk = () => async (dispatch: any) => {
  let indexMaxItem = await maxItems();
  let indexsLoading = [];
  for (let t=0; t<IS_COUNT_LOAD_STORY && IS_COUNT_LOAD_STORY-t>=1; t++) {
    indexsLoading.push(indexMaxItem-t);
  }
  indexMaxItem-=IS_COUNT_LOAD_STORY;
  let storys = await getItems(indexsLoading);
  dispatch(addStorys(storys));
  dispatch(setIndexStory(indexMaxItem));
  dispatch(initialize());
}

let initState:InewStoryReducers = {
  story: [],
  isLoad: false,
  isInit: false,
}

export default function newStorysReducers (state=initState,action:any):InewStoryReducers {
  switch (action.type) {
    case SET_INDEX_STORY: {
      return {
        ...state,
        currentIndexStory: action.index     
      }
    }
    case ADD_STORYS: {
      return {
        ...state,
        story:[...state.story,...action.storys]
      }
    }
    case INITIALIZE: {
      return {
        ...state,
        isInit: true,
      }
    }
    default: {
      return state
    }
  }
}