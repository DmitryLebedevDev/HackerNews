import {ICommetn} from './user-reducersType';

export const ADD_STORY = 'ADD_TOP_STORY';
export const ADD_COMMENT_TO_STORY = 'ADD_COMMENT_TO_STORY'; 
export const START_LOAD_STORY = 'START_LOAD_STORY';
export const STOP_LOAD_STORY = 'STOP_LOAD_STORY';  
export const START_LOAD_STORY_COMMETNS = 'START_LOAD_STORY_COMMETNS';
export const STOP_LOAD_STORY_COMMETNS = 'STOP_LOAD_STORY_COMMETNS';
export const ADD_LEN_STORY = 'ADD_LEN_STORY';
export const LEN_MAX_ON = 'LEN_MAX_ON';

export interface IlenMaxOn {
  type: typeof LEN_MAX_ON
}
export interface IsetLenStory {
  type: typeof ADD_LEN_STORY
  lenght: number
}
export interface IstartLoadStoryComments {
  type: typeof START_LOAD_STORY_COMMETNS
  id: number
}
export interface IstopLoadStoryComments {
  type: typeof STOP_LOAD_STORY_COMMETNS
  id: number
}
export interface IstartLoadStory {
  type: typeof START_LOAD_STORY
}
export interface IstopLoadStory {
  type: typeof STOP_LOAD_STORY
}
export interface IaddStory {
  type: typeof ADD_STORY
  storys: Istory[]
}
export interface IaddStoryComment {
  type: typeof ADD_COMMENT_TO_STORY
  comments: any
  idStory: number
}


export type IStorysActions = IlenMaxOn|IsetLenStory|
                             IstartLoadStoryComments|
                             IstopLoadStoryComments|IstartLoadStory|
                             IstartLoadStory|IstopLoadStory|
                             IaddStory|IaddStoryComment
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
  type?: 'story',
}