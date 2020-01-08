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
export interface IStore {
  by: string,
  descendants: number,
  id: number,
  kids: string[],
  score: number,
  time: string,
  title: string,
  url: string,
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
  type?: 'comment'
}