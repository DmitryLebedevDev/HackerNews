import IaskReducers from "./ask-reducersType";
import { getAsk, getElementById } from "../api/api";

const ADD_ASK = 'ADD_ASK';
const INIT = 'INIT_ASK_REDUCER';

const init = () => {
  return {
    type: INIT
  }
}
const addAsk = (ask: any[]) => {
  return {
    type: ADD_ASK,
    ask,
  }
}
export const addFullAskThunk = () => async (dispatch: any) => {
  return new Promise (async (res,req) => {
    let info: any[] = await getAsk();
    let asksPromis = [];
    let asks: any[] = [];
    for(let t=0; t<info.length; t++) {
      asksPromis.push(getElementById(info[t]).then((res: any) => {
        asks.push({
          id: res.id,
          author: res.by,
          time: res.time,
          fullLenComments: res.descendants,
          comments: [],
          commentsId: res.kids,
          score: res.score,
          header: res.title,
          url: res.url,
          commentsIsLoad: false,
        })
      }))
    }
    Promise.all(asksPromis).then(()=>{
      dispatch(addAsk(asks));
      res()
    })
  })
}
export const initThunk = () => async (dispatch: any) => {
  await dispatch(addFullAskThunk());
  dispatch(init());
}

const start:IaskReducers = {
  questions: [],
  init: false
};

export default function askReducers (state=start,action: any):IaskReducers {
  switch (action.type) {
    case ADD_ASK: {
      return {
        ...state,
        questions: [...state.questions, ...action.ask]
      }
    }
    case INIT: {
      return {
        ...state,
        init: true
      }
    }
    default: {
      return state
    }
  }
}