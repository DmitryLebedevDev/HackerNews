
export const ADD_JOBS = 'ADD_JOBS' 
export const UP_INDEX = 'UP_INDEX'
export const IS_LOAD_JOBS = 25;
export const SET_INDEX_ARR = 'SET_INDEX_ARR';
export const START_LOAD = 'START_LOAD';
export const STOP_LOAD = 'STOP_LOAD';
export const MAX_LOAD_LIST = 'MAX_LOAD_LIST';

export interface ImaxLoadList {
  type: typeof MAX_LOAD_LIST
}
export interface IstartLoad {
  type: typeof START_LOAD
}
export interface IstopLoad {
  type: typeof STOP_LOAD
}
export interface IsetIndexArr {
  type: typeof SET_INDEX_ARR
  arr: number[]
}
export interface IupIndex {
  type: typeof UP_INDEX,
  upIndexNum: number
}
export interface IaddJobs {
  type: typeof ADD_JOBS,
  jobs: Ijob[]
}

export interface Ijob {
  by: string,
  id: number,
  score: number,
  time: number,
  title: string,
  url: string,
  type?: 'job',
}
export type IJobsActions = ImaxLoadList|IstartLoad|
                           IstopLoad|IsetIndexArr|
                           IupIndex|IaddJobs
export default interface IjobsReduser {
  jobs: Ijob[]
  loadJobsNum: number,
  jobsIndexArr: number[],
  isLoad: boolean,
  isMax: boolean,
}