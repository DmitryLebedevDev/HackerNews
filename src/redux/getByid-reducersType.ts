import {Ijob} from './jobs-reducersType';
import {IStore,ICommetn} from './user-reducersType';
import { Istory } from './storys-reducersType';

export const SET_ITEM = 'SET_ITEM';
export const START_LOAD = 'START_LOAD';
export const STOP_LOAD = 'STOP_LOAD';
export const START_TIMER = 'START_TIMER';
export const STOP_TIMER = 'STOP_TIMER';
export const SET_MAX_ITEM = 'SET_MAX_ITEM';
export const REQUERS_IN_ITEM_START = 'REQUERS_IN_ITEM_START';
export const REQUERS_IN_ITEM_STOP = 'REQUERS_IN_ITEM_STOP';
export const SET_COMMENT_IN_ITEM = 'SET_COMMENT_IN_ITEM';
export const RESET_ITEM = 'RESET_ITEM';
export const STOP_CHECK_MAX_ITEM = 'STOP_CHECK_MAX_ITEM';
export const ADD_COMMENT_TO_STORY = 'ADD_COMMENT_TO_STORY';

export type Iitem = Ijob|IStore|ICommetn|IUserLopped;

export interface IaddCommentToStory {
    type: typeof ADD_COMMENT_TO_STORY,
    comments: any
}
export interface IsetCommentInItem {
    type: typeof SET_COMMENT_IN_ITEM
    comment: ICommetn[]
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
    index: number
}
export interface IstopTimer {
    type: typeof STOP_TIMER
}
export interface IstartTime {
    type: typeof START_TIMER
    timer: NodeJS.Timeout
}
export interface IstatLoad {
    type: typeof START_LOAD
}
export interface IstopLoad {
    type: typeof STOP_LOAD
}
export interface IsetItem {
    type: typeof SET_ITEM
    item: Iitem
}
export interface IstopCheckMaxItem {
    type: typeof STOP_CHECK_MAX_ITEM
}
export interface IsetItem {
    type: typeof SET_ITEM,
    item: Iitem,
}

export type IUserLopped = {
    id?: string,
    created?: number,
    type: 'user',
    errorCode: number,
    ErrorMessage?: string,
    karma: number,
}

export type IgetByIdActions = IaddCommentToStory|IsetCommentInItem|
                              IresetItem|IresetItem|
                              IrequesInItemStart|IrequesInItemStop|
                              IsetMaxItem|IstopTimer|
                              IstatLoad|IstopLoad|
                              IsetItem| IstopCheckMaxItem|
                              IstartTime

export default interface IgetByIdReducers {
    item?:Ijob|Istory|ICommetn|IUserLopped,
    isLoad: boolean,
    timer?: NodeJS.Timeout | null,
    maxItem?: number,
    isLoadInItem: boolean,
}
