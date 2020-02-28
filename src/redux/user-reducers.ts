import IuserReducers, {
  IUser,
  ADD_USER,
  ADD_USER_COMMETNS,
  ADD_USER_COMMETNS_OPEN,
  ADD_USER_STORY,
  UP_COUT,
  START_LOAD,
  STOP_LOAD,
  MAX_ITEMS,
  IuserActions,
  ImaxItem,
  IstartLoad,
  IstopLoad,
  IupCout,
  IaddUser,
  IaddUserStory,
  IaddUserComments,
  IaddUserCommentsOpen,
} from "./user-reducersType";
import { getElementByUserId } from "../api/api";
import {getItems} from '../helpers/function';
import IStore, { ImyCastomThunk } from "./storeType";
import {JsonComent} from '../helpers/function';

export type IuserReducersThunk<R> = ImyCastomThunk<R,IuserActions>

const maxItem = (id: string): ImaxItem => {
  return {
    type: MAX_ITEMS,
    id,
  }
}
const startLoad = (id:string): IstartLoad => {
  return {
    type: START_LOAD,
    id,
  }
}
const stopLoad = (id:string): IstopLoad => {
  return {
    type: STOP_LOAD,
    id
  }
}

const upCout = (id:string,cout:number): IupCout => {
  return {
    type: UP_COUT,
    cout,
    id,
  }
}

const addUserStory = (id:string, storys: IStore[]): IaddUserStory => {
  return {
    type: ADD_USER_STORY,
    id,
    storys,
  }
}
const addUserCommets = (id: string, info: any[]): IaddUserComments => {
  return {
    type: ADD_USER_COMMETNS,
    id,
    info,
  }
}
const addUserComentsOpen = (id: string,idComments: number, info: any[]): IaddUserCommentsOpen => {
  return {
    type: ADD_USER_COMMETNS_OPEN,
    info,
    id,
    idComments,
  }
}
const addUser = (info: IUser):IaddUser => {
  return {
    type: ADD_USER,
    info,
  }
}

export const addUserComentsOpenThunk = (idUser: string, idComment: number) => (dispatch: any, getState: () => IStore) => {
  let commetns:any[] = [];
  let promisCommetns: any[] = [];
  let currentUser = getState().users.users[idUser];
  let userComments = currentUser.comments.find((item) => item.id === idComment);
  if (userComments && userComments.commentsIdArr) {
    userComments.commentsIdArr.forEach((item) => {
      promisCommetns.push(JsonComent([item]).then((res) => {
        commetns.push(res)
      }))
    })
  }
  Promise.all(promisCommetns).then(res => {
    dispatch(addUserComentsOpen(idUser,idComment,commetns));
  })
}
// <- no thunk 
async function addCommentsOrStoryUser (type: 'story'|'comments',id:string,whatUpNum = 25, dispatch: any, getState: any) {
    dispatch(startLoad(id));
    let user = getState().users.users[id];
    let cunt = user.cunt;
    let StoryItems: IStore[] = [];
    let CommentsItems: any[] = [];
    let stop = false;
    while (((type === 'story') ? StoryItems.length : CommentsItems.length) < whatUpNum || stop) {
      if (user.submitted) {
        let maxCunt = cunt + (whatUpNum-1);
        if (maxCunt > user.submitted.length) {
          maxCunt = user.submitted.length - 1;
          stop = true;
          let items = await getItems(user.submitted.slice(cunt,cunt+(whatUpNum-1)));
          StoryItems = [...StoryItems,...items.story];
          CommentsItems = [...CommentsItems,...items.comments];
          dispatch(maxItem(id));
          break
        }
        let items = await getItems(user.submitted.slice(cunt,cunt+(whatUpNum-1)));
        StoryItems = [...StoryItems,...items.story];
        CommentsItems = [...CommentsItems,...items.comments];
        cunt+=whatUpNum;
      } else {
        stop = true;
        return [];
      }
    }
    dispatch(addUserStory(id,StoryItems));
    dispatch(addUserCommets(id,CommentsItems))
    dispatch(upCout(id,cunt));
    dispatch(stopLoad(id));
    return StoryItems
}
// <- no thunk 
export const addUserCommentsThunk = (id: string, whatUpNum = 25): IuserReducersThunk<Promise<IStore[]>> => async (dispatch: any,
  getState: () => IStore): Promise<IStore[]> => {
  console.log('запусk',id)
  return addCommentsOrStoryUser('comments',id,whatUpNum,dispatch,getState);
}
export const addUserStoryThunk = (id: string, whatUpNum = 25) => async (dispatch: any,
  getState: () => IStore): Promise<IStore[]> => {
  return addCommentsOrStoryUser('story',id,whatUpNum,dispatch,getState);
}
export const addUserThunk = (id:string) => async (dispatch:any) => {
  let userInfo:IUser = await getElementByUserId(id);
  dispatch(addUser(userInfo));
}

const start:IuserReducers = {
  users: {}
}

function userReducers (state=start,action:IuserActions):IuserReducers {
  switch (action.type) {
    case ADD_USER_COMMETNS_OPEN: {
      let user = {...state.users[action.id]};
      let comments: any = {};
      for (let t=0; t<action.info.length; t++) {
        comments = {...comments,...action.info[t]};
        console.log(action.info,t,action.info[t],comments,'1234')
      }
      let com = user.comments.map(item => {
        if (item.id === action.idComments) {
          let t = {...item, comments: comments}
          return t
        }
        return item
      })
      user.comments = com;
      return {
        ...state,
        users: {
          ...state.users,
          [action.id]:user,
        }
      }
    }
    case ADD_USER_COMMETNS: {
      let currentUser = state.users[action.id];
      if (currentUser) {
        return {
          ...state,
          users: {...state.users,
            [action.id]: {
              ...currentUser,
              comments: [...currentUser.comments,...action.info]
            }
          }
        }
      } else {
        return state
      }
    }
    case MAX_ITEMS: {
      return {
        ...state,
        users: {...state.users,
          [action.id]:{
            ...state.users[action.id],
            maxItems: true,
          }
        }
      }
    }
    case STOP_LOAD: {
      return {
        ...state,
        users: {...state.users,
          [action.id]:{
            ...state.users[action.id],
            isLoad:false
          }
        }
      }
    }
    case START_LOAD: {
      return {
        ...state,
        users: {...state.users,
          [action.id]:{
            ...state.users[action.id],
            isLoad:true,
          }
        }
      }
    }
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
          isLoad: false,
          maxItems: false,
        }}
      }
    }
    case ADD_USER_STORY: {
      let story: any[] = [];
      let user = state.users[action.id];
      if (user.story) {
        story = [...user.story,...action.storys];
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