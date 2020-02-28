import {
  INIT, IinitReducerAction, Iinit
} from './init-reducersType';
import IinitReducerState from "./init-reducersType";
import { ImyCastomThunk } from './storeType';

export type IinitReducerThunk<R> = ImyCastomThunk<R,IinitReducerAction>

export const init = (): Iinit => {
  return {
    type:INIT
  }
}
export const initThunk = (): IinitReducerThunk<Promise<void>> => async (dispatch: any) => {
  dispatch(init());
  //await dispatch(addTopStoryThunk());
}

const start: IinitReducerState = {
  init: false
}

function initReducer (state=start,action: IinitReducerAction): IinitReducerState {
  if (action.type === INIT) {
    return {
      ...state,
      init:true,
    }
  }
  return state;
}

export default initReducer