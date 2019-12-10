import { getTopStorys } from './../api/api';
import { getElementById } from './../api/api';
import { JsonComent } from '../helpers/function.js';

const ADD_STORY = 'ADD_TOP_STORY';
const ADD_COMMENT_TO_STORY = 'ADD_COMMENT_TO_STORY'; 

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
  infoStory.kids.sort((a,b) => a-b);
  for (let t=0; t<infoStory.kids.length; t++) {
    let comments = JsonComent([infoStory.kids[t]],[idStory]).then(comments => dispatch(addStoryComment(idStory,comments)));
    //console.log("TCL: addCommentToStoryThunk -> comments", comments)
    //dispatch(addStoryComment(idStory,comments));
  }
}

//addCommentToStoryThunk(21725139)();

export const addTopStoryThunk = () => async (dispatch) => {
  return new Promise (async (res,req) => {
    let indexArrayStorys = await getTopStorys();
    let arrayStorys = [];
    console.log(indexArrayStorys);
    for(let t = 0; t<100; t++) {
      getElementById(indexArrayStorys[t]).then(infoStory => {
         dispatch(addStory([{
          id:indexArrayStorys[t],
          author: infoStory.by,
          time: infoStory.time,
          fullLenComments: infoStory.descendants,
          comments: {},
          commentsId: infoStory.kids,
          score: infoStory.score,
          header: infoStory.title,
          url: infoStory.url,
        }]))
      });
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
    res();
  })
}

const start = {
  storys: [],
}
function storeReducers (state = start, action) {
  switch (action.type) {
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

      console.log(Object.keys(action.comments)[0]);
      console.log({[Object.keys(action.comments)[0]]:'d'});
      console.log(action.comments[Object.keys(action.comments)[0]]);
      let storys = state.storys.map(item => {
        if (item.id !== action.idStory) {
          return item
        } else {
          return {
            ...item,
            comments: {
              [Object.keys(action.comments)[0]]:{...action.comments[Object.keys(action.comments)[0]]},
              ...item.comments,
            }
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