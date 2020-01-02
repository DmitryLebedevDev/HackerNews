import IuserReducers, { IUser } from "./user-reducersType";
import { getElementByUserId, getElementById } from "../api/api";
import {getItems} from '../helpers/function';
import IStore from "./storeType";
import {JsonComent} from '../helpers/function';

let start = {
  jobs: [],
}

function userReducers (state=start,action:any):typeof start {
  switch (action.type) {
   default: {
      return state
    }
  }
}

export default userReducers