import { Istory } from './storys-reducersType';

export const SET_INDEX_STORY = 'SET_INDEX_STORY';
export const INITIALIZE = 'INITIALIZE';
export const ADD_STORYS = 'ADD_STORYS';
export const START_LOAD = 'START_LOAD';
export const STOP_LOAD = 'STOP_LOAD';

export interface IstartLoad {
  type: typeof START_LOAD
}
export interface IstopLoad {
  type: typeof STOP_LOAD
}
export interface Iinitializ {
  type: typeof INITIALIZE
}
export interface IaddStorys {
  type: typeof ADD_STORYS
  storys: Istory[]
}
export interface IsetIndexStory {
  type: typeof SET_INDEX_STORY,
  index: number
}

export type InewsStorysActions = IstartLoad|IstopLoad|
                           Iinitializ|IaddStorys|
                           IsetIndexStory

export default interface InewStoryReducers {
  story: Istory[];
  isLoad: boolean;
  currentIndexStory?: number;
  isInit: boolean;
}
