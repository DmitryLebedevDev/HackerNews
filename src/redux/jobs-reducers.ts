import IuserReducers, { IUser } from "./user-reducersType";
import { getElementByUserId, getElementById, getTopJobs } from "../api/api";
import {getItems} from '../helpers/function';
import IStore from "./storeType";
import {getItemsArrayLoad} from '../helpers/function';
import {JsonComent} from '../helpers/function';
import IjobsReduser, { Ijob } from "./jobs-reducersType";

const ADD_JOBS = 'ADD_JOBS' 
const UP_INDEX = 'UP_INDEX'
const IS_LOAD_JOBS = 1;
const MAX_JOBS_LEN = 200;
const SET_INDEX_ARR = 'SET_INDEX_ARR';


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
    console.log(indexArr);
  }
  let currentLoad = stor.jobs.loadJobsNum;
  if (currentLoad >= indexArr.length) {
    return
  }
  if (currentLoad + IS_LOAD_JOBS > indexArr.length && currentLoad < indexArr.length) {
    debugger
    let jobs = await getItemsArrayLoad(indexArr.slice(currentLoad, indexArr.length))
    console.log(indexArr.slice(currentLoad, indexArr.length));
    console.log(jobs, 'info!!1111! надо разобраться')
    dispatch(addJobs(jobs));
    dispatch(upIndex(jobs.length));
    return
  }
  let jobs = await getItemsArrayLoad(indexArr.slice(currentLoad, currentLoad+IS_LOAD_JOBS));
  console.log(jobs);
  dispatch(addJobs(jobs));
  dispatch(upIndex(jobs.length));
}

let start: IjobsReduser = {
  jobs: [],
  loadJobsNum: 0,
  jobsIndexArr: []
}
function jobsReducer (state=start,action:any):IjobsReduser{
  switch (action.type) {
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
