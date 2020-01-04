import IuserReducers, { IUser } from "./user-reducersType";
import { getElementByUserId, getElementById, getTopJobs } from "../api/api";
import {getItems} from '../helpers/function';
import IStore from "./storeType";
import {getItemsArrayLoad} from '../helpers/function';
import {JsonComent} from '../helpers/function';
import IjobsReduser, { Ijob } from "./jobs-reducersType";

const ADD_JOBS = 'ADD_JOBS' 
const UP_INDEX = 'UP_INDEX'
const IS_LOAD_JOBS = 25;
const MAX_JOBS_LEN = 200;
const SET_INDEX_ARR = 'SET_INDEX_ARR';


const setIndexArr = (arr: number[]) => {
  return {
    type:SET_INDEX_ARR,
    arr,
  }
}
const upIndex = (upIndexNum: string) => {
  return {
    type: UP_INDEX,
    upIndexNum,
  }
}
const addJobs = (jobs: Ijob[]) => {
  return {
    type: ADD_JOBS,
    jobs,
  }
}
const addJobsThunk = () => async (dispatch: any, getStory: () => IStore) => {
  const stor = getStory();
  let indexArr = stor.jobs.jobsIndexArr;
  if (!indexArr) {
    indexArr = await getTopJobs();
    dispatch(setIndexArr(indexArr));
  }
  let currentLoad = stor.jobs.loadJobsNum;
  if (currentLoad + IS_LOAD_JOBS >= indexArr.length && currentLoad < indexArr.length) {
    let info = await getItemsArrayLoad(indexArr.slice(currentLoad,currentLoad + IS_LOAD_JOBS))





  }
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
        jobs: [...state.jobs,action.jobs]
      }
    }
    default: {
      return state
    }
  }
}

export default jobsReducer
