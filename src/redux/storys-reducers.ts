import { getTopStorys } from './../api/api';
import { getElementById } from './../api/api';
import { JsonComent } from '../helpers/function.js';
import IstoreReducers, { Istory } from './storys-reducersType';
import { ICommetn } from './user-reducersType';
import {IstoryRequest} from '../api/apiType';


const ADD_STORY = 'ADD_TOP_STORY';
const ADD_COMMENT_TO_STORY = 'ADD_COMMENT_TO_STORY'; 
const START_LOAD_STORY = 'START_LOAD_STORY';
const STOP_LOAD_STORY = 'STOP_LOAD_STORY';  
const START_LOAD_STORY_COMMETNS = 'START_LOAD_STORY_COMMETNS';
const STOP_LOAD_STORY_COMMETNS = 'STOP_LOAD_STORY_COMMETNS';
const ADD_LEN_STORY = 'ADD_LEN_STORY';
const LEN_MAX_ON = 'LEN_MAX_ON';

export const lenMaxOn = () => {
  return {
    type: LEN_MAX_ON
  }
}

export const setLenStory = (number:number) => {
  return {
    type: ADD_LEN_STORY,
    length: number,
  }
};

export const startLoadStoryComments = (idStory:number) => {
  return {
    type: START_LOAD_STORY_COMMETNS,
    id: idStory,
  }
};

export const stopLoadStoryComments = (idStory:number) => {
  return {
    type: STOP_LOAD_STORY_COMMETNS,
    id: idStory,
  }
};

export const startLoadStory = () => {
  return {
    type: START_LOAD_STORY,
  }
};
export const stopLoadStory = () => {
  return {
    type: STOP_LOAD_STORY,
  }
};

export const addStory = (arrayStorys: Istory[]) => {
  return {
    type: ADD_STORY,
    storys: arrayStorys,
  }
};
const addStoryComment = (idStory:number,comments:ICommetn[]) => {
  return {
    type: ADD_COMMENT_TO_STORY,
    comments:comments,
    idStory,
  }
};
// sinhron load data
export const addCommentToStoryThunk = (idStory:number) => async (dispatch: any) => {
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

export const addStoryThuck = (id:number) => async (dispatch: any) => {
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

export const addTopStoryThunk = () => async (dispatch:any,state: any) => {
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
function storeReducers (state = start, action: any) {
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
        lenStory: action.length,
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
