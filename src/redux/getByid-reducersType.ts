import {Ijob} from './jobs-reducersType';
import {IStore,ICommetn} from './user-reducersType';

export type Iitem = Ijob|IStore|ICommetn;

export default interface IgetByIdReducersState {
    item?:Ijob|IStore|ICommetn;
    isLoad: boolean,
}
