import Istore from "./store-reducersType";
import IinitReducer from "./init-reducersType";
import IuserReducers from "./user-reducersType";

export default interface IStore {
  storys: Istore,
  init: IinitReducer,
  users: IuserReducers,
}