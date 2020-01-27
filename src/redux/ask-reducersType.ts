import { Istory } from "./storys-reducersType";

export interface Iask extends Istory {} 

export default interface IaskReducers {
  questions: Iask[],
  init: boolean,
}