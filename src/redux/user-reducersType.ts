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
  comments: [],
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
}