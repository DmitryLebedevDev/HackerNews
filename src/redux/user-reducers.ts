import IuserReducers, { IUser } from "./user-reducersType";
import { getElementByUserId, getElementById } from "../api/api";

const ADD_USER = 'ADD_USER';

const addUser = (info: IUser):{type:string,info:IUser} => {
  return {
    type: ADD_USER,
    info,
  }
}
export const addUserThunk = (id:string) => async (dispatch:any) => {
  let userInfo:IUser = await getElementByUserId(id);
  //if (userInfo && userInfo.submitted) {
  //}
  dispatch(addUser(userInfo));
}

const start:IuserReducers = {
  users: {}
}

function userReducers (state=start,action:any):IuserReducers {
  switch (action.type) {
    case ADD_USER: {
      return {
        ...state,
        users:{...state.users,[action.info.id]:{
          id:action.info.id,
          created:action.info.created,
          karma:action.info.karma,
          about:action.info.about,
          submitted:action.info.submitted
        }}
      }
    }
    default: {
      return state
    }
  }
}

export default userReducers