import { Istory } from "./storys-reducersType";
import Istore from "./storeType";

export const ADD_USER = 'ADD_USER';
export const ADD_USER_STORY = 'ADD_USER_STORY';
export const ADD_USER_COMMETNS  = 'ADD_USER_COMMETNS';
export const UP_COUT = 'UP_COUT';
export const START_LOAD = 'START_LOAD';
export const STOP_LOAD = 'STOP_LOAD';
export const MAX_ITEMS = 'MAX_ITEMS';
export const ADD_USER_COMMETNS_OPEN = 'ADD_USER_COMMETNS_OPEN';

export interface ImaxItem {
  type: typeof MAX_ITEMS
  id: string
}
export interface IstartLoad {
  type: typeof START_LOAD
  id: string
}
export interface IstopLoad {
  type: typeof STOP_LOAD
  id: string
}
export interface IupCout {
  type: typeof UP_COUT
  id:string
  cout: number
}
export interface IaddUserStory {
  type: typeof ADD_USER_STORY
  id: string
  storys: Istore[]
}
export interface IaddUserComments {
  type: typeof ADD_USER_COMMETNS
  id: string
  info: any[]
}
export interface IaddUserCommentsOpen {
  type: typeof ADD_USER_COMMETNS_OPEN
  info: any[]
  id: string
  idComments: number
}
export interface IaddUser {
  type: typeof ADD_USER,
  info: IUser
}

export type IuserActions = ImaxItem|IstartLoad|
                           IstopLoad|IupCout|
                           IaddUserStory|IaddUserComments|
                           IaddUserCommentsOpen|IaddUser

export default interface IuserReducers {
  users: {
    [key:string]: IUser,
  }
}
export interface IUser {
  id:string,
  created: number,
  karma: number,
  about?: string,
  submitted?: number[],
  story?: IStore[],
  comments: ICommetn[],
  favorites?: [],
  cunt: number,
  isLoad: boolean,
  maxItems: boolean,
}
export interface IStore extends Istory {
  deleted?: boolean,
  type?: 'story'
}
export interface ICommetn {
  id: number,
  name: string,
  text: string,
  comments?: ICommetn[],
  commentsLeng?:number
  commentsIdArr: number[],
  kids: number[],
  type?: 'comment',
  fullLenComments?: number,
}