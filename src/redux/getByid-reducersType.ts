import {Ijob} from './jobs-reducersType';
import {IStore,ICommetn} from './user-reducersType';
import { Istory } from './storys-reducersType';

export type Iitem = Ijob|IStore|ICommetn|IUserLopped;

export type IUserLopped = {
    id?: string,
    created?: number,
    type: 'user',
    errorCode: number,
    ErrorMessage?: string,
}

export default interface IgetByIdReducers {
    item?:Ijob|Istory|ICommetn|IUserLopped,
    isLoad: boolean,
    timer?: NodeJS.Timeout | null,
    maxItem?: number,
    isLoadInItem: boolean,
}
