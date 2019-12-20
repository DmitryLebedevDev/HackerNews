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
}