import { getTopJobs } from "../api/api";
import IStore from "./storeType";
import {getItemsArrayLoad} from '../helpers/function';
import IjobsReduser, { Ijob } from "./jobs-reducersType";

const ADD_JOBS = 'ADD_JOBS' 
const UP_INDEX = 'UP_INDEX'
const IS_LOAD_JOBS = 25;
const SET_INDEX_ARR = 'SET_INDEX_ARR';
const START_LOAD = 'START_LOAD';
const STOP_LOAD = 'STOP_LOAD';
const MAX_LOAD_LIST = 'MAX_LOAD_LIST';

const maxLoadList = () => {
  return {
    type: MAX_LOAD_LIST
  }
}
const startLoad = () => {
  return {
    type: START_LOAD
  }
}

const stopLoad = () => {
  return {
    type: STOP_LOAD
  }
}
const setIndexArr = (arr: number[]) => {
  return {
    type:SET_INDEX_ARR,
    arr,
  }
}
const upIndex = (upIndexNum: number) => {
  return {
    type: UP_INDEX,
    upIndexNum,
  }
}
export const addJobs = (jobs: Ijob[]) => {
  return {
    type: ADD_JOBS,
    jobs,
  }
}
export const addJobsThunk = () => async (dispatch: any, getStory: () => IStore) => {
  const stor = getStory();
  let indexArr = stor.jobs.jobsIndexArr;
  if (!indexArr.length) {
    indexArr = await getTopJobs();
    dispatch(setIndexArr(indexArr));
  }
  let currentLoad = stor.jobs.loadJobsNum;
  if (currentLoad >= indexArr.length) {
    return
  }
  dispatch(startLoad());
  if (currentLoad + IS_LOAD_JOBS > indexArr.length && currentLoad < indexArr.length) {
    debugger
    let jobs = await getItemsArrayLoad(indexArr.slice(currentLoad, indexArr.length))
    dispatch(addJobs(jobs));
    dispatch(upIndex(jobs.length));
    dispatch(maxLoadList());
    dispatch(stopLoad());
    return
  }
  let jobs = await getItemsArrayLoad(indexArr.slice(currentLoad, currentLoad+IS_LOAD_JOBS));
  dispatch(addJobs(jobs));
  dispatch(upIndex(jobs.length));
  dispatch(stopLoad());
}

let start: IjobsReduser = {
  jobs: [],
  loadJobsNum: 0,
  jobsIndexArr: [],
  isLoad: false,
  isMax: false,
}
function jobsReducer (state=start,action:any):IjobsReduser{
  switch (action.type) {
    case MAX_LOAD_LIST: {
      return {
        ...state,
        isMax: true,
      }
    }
    case STOP_LOAD: {
      return {
        ...state,
        isLoad: false,
      }
    }
    case START_LOAD: {
      return {
        ...state,
        isLoad: true,
      }
    }
    case SET_INDEX_ARR: {
      return {
        ...state,
        jobsIndexArr: action.arr 
      }
    }
    case UP_INDEX: {
      return {
      	...state,
	      loadJobsNum: state.loadJobsNum + action.upIndexNum
      }
    }
    case ADD_JOBS: {
      return {
        ...state,
        jobs: [...state.jobs,...action.jobs]
      }
    }
    default: {
      return state
    }
  }
}

export default jobsReducer
