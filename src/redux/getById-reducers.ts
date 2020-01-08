import IgetByIdReducersState, { Iitem } from './getByid-reducersType';
import { getElementById } from '../api/api';


const SET_ITEM = 'SET_ITEM';
const START_LOAD = 'START_LOAD';
const STOP_LOAD = 'STOP_LOAD';

export const statLoad = () => {
    return {
        type: START_LOAD
    }

}
export const stopLoad = () => {
    return {
        type: STOP_LOAD
    }
}

export const setItem = (item: Iitem) => {
    return {
        type: SET_ITEM,
        item,
    }
}
export const setItemThunk = (id:number) => async (dispatch: any) => {
    dispatch(statLoad());
    let item = await getElementById(id);
    dispatch(setItem(item));
    dispatch(stopLoad());
}
let initState: IgetByIdReducersState = {
    isLoad:false,
};

export default function getByIdReducers (state = initState,action: any):IgetByIdReducersState {
    switch (action.type) {
        case START_LOAD: {
            return {
                ...state,
                isLoad: true
            }
        }
        case STOP_LOAD: {
            return {
                ...state,
                isLoad: false
            }
        }
        case SET_ITEM: {
            return {
                ...state,
                item: action.item
            }
        }

        default: return state;
    }
}