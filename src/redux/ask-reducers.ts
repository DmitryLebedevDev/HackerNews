import IaskReducers, { 
  IinitAskActions,
  IaddAskActions,
  INIT,
  ADD_ASK,
  IaskActions
} from "./ask-reducersType";
import { getAsk, getElementById } from "../api/api";
import { ImyCastomThunk } from "./storeType";

export type IaskReducerThunk<R> = ImyCastomThunk<R,IaskActions>

const init = (): IinitAskActions => {
  return {
    type: INIT
  }
}
const addAsk = (ask: any[]): IaddAskActions => {
  return {
    type: ADD_ASK,
    ask,
  }
}


export const addFullAskThunk = (): IaskReducerThunk<Promise<void>> => async (dispatch: any) => {
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
export const initThunk = (): IaskReducerThunk<Promise<void>> => async (dispatch: any) => {
  await dispatch(addFullAskThunk());
  dispatch(init());
}

const start:IaskReducers = {
  questions: [],
  init: false
};

export default function askReducers (state=start, action:IaskActions):IaskReducers {
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