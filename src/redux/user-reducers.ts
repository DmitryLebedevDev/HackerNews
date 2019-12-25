import IuserReducers, { IUser } from "./user-reducersType";
import { getElementByUserId, getElementById } from "../api/api";
import {getItems} from '../helpers/function';
import IStore from "./store-reducersType";

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

const addUserStory = (id:string, storys: IStore[]) => {
  return {
    type: ADD_USER_STORY,
    id,
    storys,
  }
}
const addUserCommets = (id: string, info: any[]) => {
  return {
    type: ADD_USER_COMMETNS,
    id,
    info,
  }
}

const addUser = (info: IUser):{type:string,info:IUser} => {
  return {
    type: ADD_USER,
    info,
  }
}


export const addUserCommentsThunk = (id: string) => async (dispatch: any,
  getState: () => IuserReducers) => {
  let user = getState().users[id];
  let cunt = user.cunt;
  let StoryItems: any[] = [];
  let CommentsItems: any[] = [];
  let stop = false;
}
export const addUserStoryThunk = (id: string) => async (dispatch: any,
  getState: () => IuserReducers) => {
    let user = getState().users[id];
    let cunt = user.cunt;
    let StoryItems: IStore[] = [];
    let CommentsItems: any[] = [];
    let stop = false;
    while (StoryItems.length < 100 || stop) {
      if (user.submitted) {
        let maxCunt = cunt + 99;
        if (maxCunt > user.submitted.length) {
          maxCunt = user.submitted.length - 1;
          stop = true;
        }
        let items = await getItems(user.submitted.slice(cunt,maxCunt+99));
        StoryItems = [...StoryItems,...items.story];
        CommentsItems = [...CommentsItems,...items.comments];
        cunt+=100;
      } else {
        stop = true;
        return
      }
    }
    dispatch(addUserStory(id,StoryItems));
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
    case ADD_USER_STORY: {
      let story: IStore[] = [];
      let user = state.users[action.id];
      if (user.story) {
        story = [...user.story,action.storys];
      } else {
        story = [...action.storys];
      }
      return {
        ...state,
        users:{...state.users,
          [action.id]: {
            ...state.users[action.id],
            story: story,
          }
        }
      }
    }
    default: {
      return state
    }
  }
}

export default userReducers