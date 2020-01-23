import { Istory } from "./storys-reducersType";

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