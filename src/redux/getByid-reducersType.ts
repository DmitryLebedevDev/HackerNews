import {Ijob} from './jobs-reducersType';
import {IStore,ICommetn} from './user-reducersType';
import { Istory } from './storys-reducersType';

const SET_ITEM = 'SET_ITEM';
const START_LOAD = 'START_LOAD';
const STOP_LOAD = 'STOP_LOAD';
const START_TIMER = 'START_TIMER';
const STOP_TIMER = 'STOP_TIMER';
const SET_MAX_ITEM = 'SET_MAX_ITEM';
const REQUERS_IN_ITEM_START = 'REQUERS_IN_ITEM_START';
const REQUERS_IN_ITEM_STOP = 'REQUERS_IN_ITEM_STOP';
const SET_COMMENT_IN_ITEM = 'SET_COMMENT_IN_ITEM';
const RESET_ITEM = 'RESET_ITEM';
const STOP_CHECK_MAX_ITEM = 'STOP_CHECK_MAX_ITEM';
const ADD_COMMENT_TO_STORY = 'ADD_COMMENT_TO_STORY';

export interface IaddCommentToStory {
    type: typeof ADD_COMMENT_TO_STORY
}
export interface IsetCommentInItem {
    type: typeof SET_COMMENT_IN_ITEM
    comment: ICommetn
}
export interface IresetItem {
    type: typeof RESET_ITEM
}
export interface IrequesInItemStart {
    type: typeof REQUERS_IN_ITEM_START
}
export interface IrequesInItemStop {
    type: typeof REQUERS_IN_ITEM_STOP
}
export interface IsetMaxItem {
    type: typeof SET_MAX_ITEM
    intex: number
}
export interface IstopTimer {
    type: typeof STOP_TIMER
}
export interface IstartTime {
    type: typeof START_TIMER
    timer: NodeJS.Timeout
}


export type Iitem = Ijob|IStore|ICommetn|IUserLopped;

export type IUserLopped = {
    id?: string,
    created?: number,
    type: 'user',
    errorCode: number,
    ErrorMessage?: string,
    karma: number,
}

export default interface IgetByIdReducers {
    item?:Ijob|Istory|ICommetn|IUserLopped,
    isLoad: boolean,
    timer?: NodeJS.Timeout | null,
    maxItem?: number,
    isLoadInItem: boolean,
}
