import IgetByIdReducersState, { Iitem } from './getByid-reducersType';
import { getElementById, maxItems } from '../api/api';
import { clearInterval } from 'timers';
import { JsonComent } from '../helpers/function';
import { ICommetn } from './user-reducersType';


const SET_ITEM = 'SET_ITEM';
const START_LOAD = 'START_LOAD';
const STOP_LOAD = 'STOP_LOAD';
const START_TIMER = 'START_TIMER';
const STOP_TIMER = 'STOP_TIMER';
const SET_MAX_ITEM = 'SET_MAX_ITEM';
const REQUERS_IN_ITEM_START = 'REQUERS_IN_ITEM_START';
const REQUERS_IN_ITEM_STOP = 'REQUERS_IN_ITEM_STOP';
const SET_COMMENT_IN_ITEM = 'SET_COMMENT_IN_ITEM';

const setCommentInItem = (comment: ICommetn) => {
    return {
        type: SET_COMMENT_IN_ITEM,
        comment,
    }
}

const requesInItemStart = () => {
    return {
        type: REQUERS_IN_ITEM_START
    }
}
const requesInItemStop = () => {
    return {
        type: REQUERS_IN_ITEM_STOP
    }
}
export const setMaxItem = (index: number) => {
    return {
        type: SET_MAX_ITEM,
        index,
    }
}
export const stopTimer = () => {
    return {
        type: STOP_TIMER
    }
}
export const startTimer = (timer: NodeJS.Timeout) => {
    return {
        type: START_TIMER,
        timer,
    }
}
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
export const setCommentInItemThunk = (id:number) => async (dispatch: any) => {
    dispatch(requesInItemStart());
    let comments = await JsonComent([id]);
    debugger
    comments = comments[id].comments;
    dispatch(setCommentInItem(comments));
    dispatch(requesInItemStop());
}
export const CheckMaxItemThunk = () => async (dispatch: any) => {
    dispatch(setMaxItem(await maxItems()));
}
export const startCheckMaxItem = () => (dispatch: any) => {
    dispatch(startTimer(setInterval(() => {
        console.log('tic');
        dispatch(CheckMaxItemThunk());
    },1000)))
}
export const setItemThunk = (id:number) => async (dispatch: any) => {
    dispatch(statLoad());
    let item = await getElementById(id);
    if(item.type === 'comment') {
        item.name = item.by;
        item.isLoad = false;
        //let info = await JsonComent([item.id]);
        //item.comments = info;
        //console.log(info,'\\\\\\\\\\\\\\\\\\\\//////////////////')
        delete item.by
    }
    dispatch(setItem(item));
    dispatch(stopLoad());
}
let initState: IgetByIdReducersState = {
    isLoad:false,
    isLoadInItem: false,
};

export default function getByIdReducers (state = initState,action: any):IgetByIdReducersState {
    switch (action.type) {
        case SET_COMMENT_IN_ITEM: {
            let item
            if (state.item && state.item.type === 'comment') {
                item = {...state.item};
                item.comments = action.comment;
            }
            return {
                ...state,
                item,
            }
        }
        case REQUERS_IN_ITEM_STOP: {
            return {
                ...state,
                isLoadInItem: false
            }
        }
        case REQUERS_IN_ITEM_START: {
            return {
                ...state,
                isLoadInItem: true
            }
        } 
        case SET_MAX_ITEM: {
            if (state.maxItem === action.index) {
                return state
            }
            return {
                ...state,
                maxItem: action.index,
            }
        }
        case STOP_TIMER: {
            if (state.timer) {
                clearInterval(state.timer);
            }
            return {
                ...state,
                timer: null,
            }
        }
        case START_TIMER: {
            return {
                ...state,
                timer: action.timer,
            }
        }
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