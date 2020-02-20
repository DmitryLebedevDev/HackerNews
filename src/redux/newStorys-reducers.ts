import InewStoryReducers, {
  START_LOAD,
  STOP_LOAD,
  INITIALIZE,
  ADD_STORYS,
  SET_INDEX_STORY,
  InewsStorysActions,
  IstartLoad,
  IstopLoad,
  Iinitializ,
  IaddStorys,
  IsetIndexStory
} from "./newStorys-reducersType";
import { maxItems } from "../api/api";
import { getItemsLoadS } from "../helpers/function";
import { Istory } from "./storys-reducersType";
import IStore from "./storeType";

const IS_COUNT_LOAD_STORY = 8;
const ADD_COUNT_IN_START = 4;

const startLoad = ():IstartLoad => {
  return {
    type: START_LOAD
  }
}
const stopLoad = ():IstopLoad => {
  return {
    type: STOP_LOAD
  }
}
const initialize = ():Iinitializ => {
  return {
    type: INITIALIZE
  }
};
const addStorys = (storys:Istory[]):IaddStorys => {
  return {
    type: ADD_STORYS,
    storys,
  }
};

const setIndexStory = (index: number):IsetIndexStory => {
  return {
    type: SET_INDEX_STORY,
    index,
  }
};
export const addStoryThunk = () => async (dispatch: any, getState: () => IStore) => {
  let indexMaxItem = getState().newStorys.currentIndexStory;
  if (indexMaxItem) {
    dispatch(startLoad());
    let info = await getItemsLoadS(indexMaxItem,IS_COUNT_LOAD_STORY);
    dispatch(addStorys(info.story));
    dispatch(setIndexStory(info.index));
    dispatch(stopLoad());
  }
}
export const initNewStoryPageThunk = () => async (dispatch: any) => {
  let indexMaxItem = await maxItems();
  let info = await getItemsLoadS(indexMaxItem,IS_COUNT_LOAD_STORY+ADD_COUNT_IN_START);
  let storysArr = info.story;
  indexMaxItem = info.index;
  dispatch(addStorys(storysArr));
  dispatch(setIndexStory(indexMaxItem));
  dispatch(initialize());
};

let initState:InewStoryReducers = {
  story: [],
  isLoad: false,
  isInit: false,
};



export default function newStorysReducers (state=initState,action:InewsStorysActions):InewStoryReducers {
  switch (action.type) {
    case START_LOAD: {
      return {
        ...state,
        isLoad: true,
      }
    }
    case STOP_LOAD: {
      return {
        ...state,
        isLoad: false,
      }
    }
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