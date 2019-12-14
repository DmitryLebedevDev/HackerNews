import { getTopStorys } from './../api/api';
import { getElementById } from './../api/api';
import { JsonComent } from '../helpers/function.js';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

const ADD_STORY = 'ADD_TOP_STORY';
const ADD_COMMENT_TO_STORY = 'ADD_COMMENT_TO_STORY'; 
const START_LOAD_STORY = 'START_LOAD_STORY';
const STOP_LOAD_STORY = 'STOP_LOAD_STORY';  


export const startLoadStory = () => {
  return {
    type: START_LOAD_STORY,
  }
}
export const stopLoadStory = () => {
  return {
    type: STOP_LOAD_STORY,
  }
}

const addStory = (arrayStorys) => {
  return {
    type: ADD_STORY,
    storys: arrayStorys,
  }
}
const addStoryComment = (idStory,comments) => {
  return {
    type: ADD_COMMENT_TO_STORY,
    comments:comments,
    idStory,
  }
}

export const addCommentToStoryThunk = (idStory) => async (dispatch) => {
  let infoStory = await getElementById(idStory);
  console.log("TCL: addCommentToStoryThunk -> infoStory.kids!!!!!!!!!!!!!!!!!!!!!!!!!!!!", infoStory.kids)
  if (infoStory.kids) {
    infoStory.kids.sort((a,b) => a-b);
    for (let t=0; t<infoStory.kids.length; t++) {
      /*let comments = */JsonComent([infoStory.kids[t]],[idStory]).then(comments => dispatch(addStoryComment(idStory,comments)));
      //console.log("TCL: addCommentToStoryThunk -> comments", comments)
      //dispatch(addStoryComment(idStory,comments));
    }
  }
}

//addCommentToStoryThunk(21725139)();
export const addStoryThuck = (id) => async (dispatch) => {
  let story = await getElementById(id);
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
  }]));
  return true
}

export const addTopStoryThunk = () => async (dispatch) => {
  return new Promise (async (res,req) => {
    let indexArrayStorys = await getTopStorys();
    let fullPromiseRequest = [];
    dispatch(startLoadStory());
    //let arrayStorys = [];
    for(let t = 0; t<100; t++) {
      fullPromiseRequest.push(getElementById(indexArrayStorys[t]).then(infoStory => {
         dispatch(addStory([{
          id:indexArrayStorys[t],
          author: infoStory.by,
          time: infoStory.time,
          fullLenComments: infoStory.descendants,
          comments: [],
          commentsId: infoStory.kids,
          score: infoStory.score,
          header: infoStory.title,
          url: infoStory.url,
        }]))
      }));
      /*
      console.log("TCL: addTopStoryThunk -> infoStory", infoStory)
      //let commentJson = await JsonComent(infoStory.kids,[indexArrayStorys[t]],false);
      arrayStorys.push({
        id:indexArrayStorys[t],
        author: infoStory.by,
        time: infoStory.time,
        fullLenComments: infoStory.descendants,
        comments: {},
        commentsId: infoStory.kids,
        score: infoStory.score,
        header: infoStory.title,
        url: infoStory.url,
      })
      if (t%2===1) {
        dispatch(addStory(arrayStorys));
        arrayStorys = [];
        if (t===1) {
          res()
        }
      }*/
    }
    Promise.all(fullPromiseRequest).then(info => {
      res()
    })
  })
}

const start = {
  storys: [],
  storysIsLoad: false,
}
function storeReducers (state = start, action) {
  switch (action.type) {
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
      // action path
      /*let addObjectStory = {};
      let Story;
      // Search needen story
      for (let t=0; t<state.storys.length; t++) {
        if (action.path[0] === state.storys[t].id) {
          Story = state.storys[t];
          addObjectStory = {...Story};
          break;
        }
      }*/
      /*addObjectStory.comments = {...Story.comments};
      let buff;
      for (let t=1; t<action.path.length; t++) {
        buff = addObjectStory.comments[action.path[t]];
      }*/

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