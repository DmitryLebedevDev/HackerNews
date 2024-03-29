import IstoreReducers, { Istory,
  ADD_STORY,
  ADD_COMMENT_TO_STORY,
  START_LOAD_STORY,
  STOP_LOAD_STORY,
  START_LOAD_STORY_COMMETNS,
  STOP_LOAD_STORY_COMMETNS,
  ADD_LEN_STORY,
  LEN_MAX_ON,
  IStorysActions,
  IlenMaxOn,
  IsetLenStory,
  IstartLoadStoryComments,
  IstopLoadStoryComments,
  IstartLoadStory,
  IstopLoadStory,
  IaddStory,
  IaddStoryComment
} from './storys-reducersType';
import { getTopStorys } from './../api/api';
import { getElementById } from './../api/api';
import { JsonComent } from '../helpers/function.js';
import { ICommetn } from './user-reducersType';
import {IstoryRequest} from '../api/apiType';
import { ImyCastomThunk } from './storeType';

export type IstorysReducerThunk<R> = ImyCastomThunk<R,IStorysActions>

export const lenMaxOn = ():IlenMaxOn => {
  return {
    type: LEN_MAX_ON
  }
}

export const setLenStory = (number:number):IsetLenStory => {
  return {
    type: ADD_LEN_STORY,
    lenght: number,
  }
};

export const startLoadStoryComments = (idStory:number):IstartLoadStoryComments => {
  return {
    type: START_LOAD_STORY_COMMETNS,
    id: idStory,
  }
};

export const stopLoadStoryComments = (idStory:number):IstopLoadStoryComments => {
  return {
    type: STOP_LOAD_STORY_COMMETNS,
    id: idStory,
  }
};

export const startLoadStory = ():IstartLoadStory => {
  return {
    type: START_LOAD_STORY,
  }
};
export const stopLoadStory = ():IstopLoadStory => {
  return {
    type: STOP_LOAD_STORY,
  }
};

export const addStory = (arrayStorys: Istory[]):IaddStory => {
  return {
    type: ADD_STORY,
    storys: arrayStorys,
  }
};
const addStoryComment = (idStory:number,comments:ICommetn[]):IaddStoryComment => {
  return {
    type: ADD_COMMENT_TO_STORY,
    comments:comments,
    idStory,
  }
};
// sinhron load data
export const addCommentToStoryThunk = (idStory:number): IstorysReducerThunk<Promise<void>> => async (dispatch: any) => {
  let infoStory = await getElementById(idStory);
  if (infoStory.kids) {
    infoStory.kids.sort((a:number,b:number) => a-b);
    let arrComments = [];
    dispatch(startLoadStoryComments(idStory));
    for (let t=0; t<infoStory.kids.length; t++) {
      let infoComments = JsonComent([infoStory.kids[t]],[idStory])
      .then(comments => {
        if (Object.keys(comments).length !== 0) {
          dispatch(addStoryComment(idStory,comments));
        }
      });
      arrComments.push(infoComments);
    }
    Promise.all(arrComments).then(() => dispatch(stopLoadStoryComments(idStory)));
  }
};

export const addStoryThuck = (id:number): IstorysReducerThunk<Promise<boolean>> => async (dispatch: any):Promise<boolean> => {
  let story = await getElementById(id);
  if (!story) {
    return false
  }
  if (story.type !== 'story') {
    return false
  }
  dispatch(addStory([{
    id,
    author: story.by,
    time: story.time,
    fullLenComments: story.descendants,
    comments: [],
    commentsId: story.kids,
    score: story.score,
    header: story.title,
    url: story.url,
    commentsIsLoad: false,
  }]));
  return true
};

export const addTopStoryThunk = (): IstorysReducerThunk<Promise<void>> => async (dispatch:any,state: any) => {
  return new Promise (async (res,req) => {
    let indexArrayStorys = await getTopStorys();
    let fullPromiseRequest = [];
    let arrStorys: any = [];
    let CurrentState = state();
    if (CurrentState.storys.lenIsMax) {
      res();
      return;
    }
    let current = CurrentState.storys.lenStory;
    let currentMax = current+25
    if (currentMax >= 500) {
      dispatch(lenMaxOn());
    }
    dispatch(startLoadStory());
    for(let t = current; t<currentMax; t++) {
      fullPromiseRequest.push(getElementById(indexArrayStorys[t]).then((infoStory: IstoryRequest) => {
        if (infoStory) {
          arrStorys.push({
            id:indexArrayStorys[t],
            author: infoStory.by,
            time: infoStory.time,
            fullLenComments: infoStory.descendants,
            comments: [],
            commentsId: infoStory.kids,
            score: infoStory.score,
            header: infoStory.title,
            url: infoStory.url,
            commentsIsLoad: false,
          });
        }
      }));
    }
    Promise.all(fullPromiseRequest).then(info => {
      dispatch(addStory(arrStorys));
      dispatch(stopLoadStory());
      dispatch(setLenStory(currentMax));
      res()
    })
  })
};

const start:IstoreReducers = {
  storys: [],
  lenStory: 0,
  lenIsMax: false,
  storysIsLoad: false,
};
function storeReducers (state = start, action: IStorysActions) {
  switch (action.type) {
    case LEN_MAX_ON: {
      return {
        ...state,
        lenIsMax: true,
      }
    }
    case ADD_LEN_STORY: {
      return {
        ...state,
        lenStory: action.lenght,
      }
    }
    case START_LOAD_STORY_COMMETNS: {
      return {
        ...state,
        storys: state.storys.map(item => (item.id !== action.id) ? item : {...item,commentsIsLoad:true})
      }
    }
    case STOP_LOAD_STORY_COMMETNS: {
      return {
        ...state,
        storys: state.storys.map(item => (item.id !== action.id) ? item : {...item,commentsIsLoad:false})
      }
    }
    case STOP_LOAD_STORY: {
      return {
        ...state,
        storysIsLoad: false,
      }
    }
    case START_LOAD_STORY: {
      return {
        ...state,
        storysIsLoad: true,
      }
    }
    case ADD_STORY: {
      return {
        ...state,
        storys: [...state.storys,...action.storys],
      }
    }
    case ADD_COMMENT_TO_STORY: {
      let storys = state.storys.map(item => {
        if (item.id !== action.idStory) {
          return item
        } else {
          return {
            ...item,
            comments: [...item.comments,{...action.comments[Object.keys(action.comments)[0]]}]
          }
        }
      })
      return {
        ...state,
        storys: storys
      }
    }
    default: {
      return state
    }
  }
}

export default storeReducers;
