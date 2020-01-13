import {Ijob} from './jobs-reducersType';
import {IStore,ICommetn} from './user-reducersType';

export type Iitem = Ijob|IStore|ICommetn;


export default interface IgetByIdReducers {
    item?:Ijob|IStore|ICommetn;
    isLoad: boolean,
    timer?: NodeJS.Timeout | null,
    maxItem?: number,
    isLoadInItem: boolean,
}
