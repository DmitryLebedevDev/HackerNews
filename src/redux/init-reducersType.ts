export const INIT = "INIT";

export interface Iinit {
  type: typeof INIT
} 
export type IinitReducerAction = Iinit

export default interface IinitReducerState {
  init: boolean;
}