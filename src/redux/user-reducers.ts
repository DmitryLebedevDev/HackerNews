import IuserReducers, { IUser } from "./user-reducersType";
import { getElementByUserId } from "../api/api";

const ADD_USER = 'ADD_USER';

const addUser = (info: IUser):{type:string,info:IUser} => {
  return {
    type: ADD_USER,
    info,
  }
}
export const addUserThunk = (id:string) => async (dispatch:any) => {
  let userInfo:IUser = await getElementByUserId(id);
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
        users:{...state.users,[action.id]:{
          id:action.id,
          created:action.created,
          karma:action.karma,
          about:action.about,
          submitted:action.submitted
        }}
      }
    }
    default: {
      return state
    }
  }
}

export default userReducers