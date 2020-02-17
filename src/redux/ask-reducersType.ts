import { Istory } from "./storys-reducersType";

export const ADD_ASK = 'ADD_ASK';
export const INIT = 'INIT_ASK_REDUCER';

export interface Iask extends Istory {}

export interface IinitAskActions {
  type: typeof INIT,
}
export interface IaddAskActions {
  type: typeof ADD_ASK,
  ask: Iask[]
}

export type IaskActions = IinitAskActions | IaddAskActions

export default interface IaskReducers {
  questions: Iask[],
  init: boolean,
}