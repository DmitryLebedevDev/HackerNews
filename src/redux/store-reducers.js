import { getTopStorys } from './../api/api';
import { getElementById } from './../api/api';


const ADD_STORY = 'ADD_TOP_STORY';
const ADD_COMMENT_TO_STORY = 'ADD_COMMENT_TO_STORY'; 


const addStory = (arrayStorys) => {
  return {
    type: ADD_STORY,
    storys: arrayStorys,
  }
}
const addStoryComment = (id,text) => {
  return {
    type: ADD_COMMENT_TO_STORY,

  }
}

const addCommentToStory = (idStory) => (dispatch,story) => {

}

export const addTopStoryThunk = () => async (dispatch) => {
  return new Promise (async (res,req) => {
    let indexArrayStorys = await getTopStorys();
    let arrayStorys = [];
    console.log(indexArrayStorys);
    for(let t = 0; t<1; t++) {
      async function Json (arr) {
        if (arr===undefined||!arr.length) {
          return
        }
        let json = {};
        for (let t=0; t<arr.length; t++) {
          let infoArrItem = await getElementById (arr[t]);
          json[arr[t]] = {
            id: arr[t],
            name: infoArrItem.by,
            text: infoArrItem.text,
            comments: await Json(infoArrItem.kids)
          }
        }
        return json
      }
      let info = await (Json([21656022]));
      console.log(info);
      let infoStory = await getElementById(indexArrayStorys[t]);
      /**
       * {
       *  id {
*           name
            text
            comments {
              id
              id
              id
            }
       *  }
       *    
       *    
       *    comments
       * }
       */
      let commentJson = {};
      
      arrayStorys.push({
        id:indexArrayStorys[t],
        author: infoStory.by,
        time: infoStory.time,
        comments: infoStory.descendants,
        commentsId: infoStory.kids,
        score: infoStory.score,
        header: infoStory.title,
        url: infoStory.url,
      }) 
    }
    dispatch(addStory(arrayStorys));
    res();
  })
  /*
  let indexArrayStorys = await getTopStorys();
  let arrayStorys = [];
  console.log(indexArrayStorys);
  for(let t = 0; t<10; t++) {
    let infoStory = await getElementById(indexArrayStorys[t]);
    arrayStorys.push({
      id:indexArrayStorys[t],
      author: infoStory.by,
      time: infoStory.time,
      comments: infoStory.descendants,
      commentsId: infoStory.kids,
      score: infoStory.score,
      header: infoStory.title,
      url: infoStory.url,
    }) 
  }
  dispatch(addStory(arrayStorys));*/
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
    default: {
      return state
    }
  }
}

export default storeReducers;