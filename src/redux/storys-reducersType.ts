import {ICommetn} from './user-reducersType';
export default interface IstoreReducers{
  storys: Istory[],
  lenStory: number,
  lenIsMax: boolean,
  storysIsLoad: boolean,
}
export interface Istory {
  id: number,
  author: string,
  time: number,
  fullLenComments: number,
  comments: ICommetn[],
  commentsId: number[],
  score: number,
  header: string,
  url: string,
  commentsIsLoad: boolean,
}