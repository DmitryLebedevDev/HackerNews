import IuserReducers, { IUser } from "./user-reducersType";
import { getElementByUserId, getElementById } from "../api/api";
import {UserItems} from '../helpers/function';

const ADD_USER = 'ADD_USER';
const ADD_USER_STORY = 'ADD_USER_STORY';
const ADD_USER_COMMETNS  = 'ADD_USER_COMMETNS';
const UP_COUT = 'UP_COUT'; 

const upCout = (id:string,cout:number) => {
  return {
    type: UP_COUT,
    cout,
    id,
  }
}

const addUserStory = (id:string, info: any) => {
  return {
    type: ADD_USER_STORY,
  }
}
const addUserCommets = (id: string, info: any) => {
  return {
    type: ADD_USER_COMMETNS,
    info,
  }
}

const addUser = (info: IUser):{type:string,info:IUser} => {
  return {
    type: ADD_USER,
    info,
  }
}


export const addUserCommentsThunk = (id: string) => async (dispatch: any) => {
  UserItems
}
export const addUserStoryThunk = (id: string) => async (dispacth:any) => {

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
    case UP_COUT: {
      return {
        ...state,
        users: {...state.users,
          [action.id]:{
            ...state.users[action.id],
            cunt:state.users[action.id].cunt + action.cout,
          }}
      }
    }
    case ADD_USER: {
      return {
        ...state,
        users:{...state.users,[action.info.id]:{
          id:action.info.id,
          created:action.info.created,
          karma:action.info.karma,
          about:action.info.about,
          submitted:action.info.submitted,
          story: [],
          comments: [],
          favorites: [],
          cunt: 0,
        }}
      }
    }
    default: {
      return state
    }
  }
}

export default userReducers