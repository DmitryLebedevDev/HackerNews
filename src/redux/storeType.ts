import Istore from "./store-reducersType";
import IinitReducer from "./init-reducersType";
import IuserReducers from "./user-reducersType";
import IjobsReduser from "./jobs-reducersType";
import IgetByIdReducers from "./getByid-reducersType";
import InewStoryReducers from "./newStorys-reducersType";
import IaskReducers from "./ask-reducersType";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { Action } from "redux";

export type ImyCastomThunk<R, CastomAction extends Action> = ThunkAction<R,IStore, any, CastomAction>
export type IDispatch = ThunkDispatch<Istore,any,Action>

export default interface IStore {
  storys: Istore,
  init: IinitReducer,
  users: IuserReducers,
  jobs: IjobsReduser,
  getByItem: IgetByIdReducers,
  newStorys: InewStoryReducers,
  ask: IaskReducers,
}