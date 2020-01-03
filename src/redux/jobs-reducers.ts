import IuserReducers, { IUser } from "./user-reducersType";
import { getElementByUserId, getElementById } from "../api/api";
import {getItems} from '../helpers/function';
import IStore from "./storeType";
import {JsonComent} from '../helpers/function';
import IjobsReduser, { Ijob } from "./jobs-reducersType";

const ADD_JOBS = 'ADD_JOBS' 
const UP_INDEX = 'UP_INDEX'
const IS_LOAD_JOBS = 25;
const MAX_JOBS_LEN = 200;

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
  let currentLoad = stor.jobs.loadJobsNum;
  if (currentLoad + IS_LOAD_JOBS >= MAX_JOBS_LEN && currentLoad < MAX_JOBS_LEN) {
    




  }
}

let start: IjobsReduser = {
  jobs: [],
  loadJobsNum: 0,
  jobsIndexArr: []
}

function jobsReducer (state=start,action:any):IjobsReduser{
  switch (action.type) {
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