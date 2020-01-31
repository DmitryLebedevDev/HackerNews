import IgetByIdReducersState, { Iitem } from './getByid-reducersType';
import { getElementById, maxItems } from '../api/api';
import { JsonComent } from '../helpers/function';
import { ICommetn } from './user-reducersType';
import IStore from './storeType';


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

// set comment in item (item - story)
export const addCommentToStory = (comments: any) => {
    return {
        type: ADD_COMMENT_TO_STORY,
        comments,
    }
} 

export const resetItem = () => {
    return {
        type: RESET_ITEM
    }
}
// set comment in item (item - comment)
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
export const addCommentToStoryItemThunk = () => (dispatch: any, getState: () => IStore) => {
    let item = getState().getByItem.item;
    if (item && item.type === 'story') {
        dispatch(requesInItemStart());
        let promiss:Promise<any>[] = [];
        let kids = item.commentsId;
        kids.forEach((id) => {
            promiss.push(JsonComent([id]).then((comments: any) => {
                debugger
                dispatch(addCommentToStory(comments))
            }))
        })
        Promise.all(promiss).then(()=> {
            dispatch(requesInItemStop());
        })
    }
}
// item -> comment
export const setCommentInItemThunk = (id:number) => async (dispatch: any) => {
    dispatch(requesInItemStart());
    // func JsonComment res comments[id] > comments [id] -> comment,comment,comment
    let comments = await JsonComent([id]);
    comments = comments[id].comments;
    dispatch(setCommentInItem(comments));
    dispatch(requesInItemStop());
}
export const CheckMaxItemThunk = () => async (dispatch: any) => {
    let maxNum = await maxItems();
    dispatch(setMaxItem(maxNum));
}
export const startCheckMaxItem = () => (dispatch: any) => {
    dispatch(startTimer(setInterval(() => {
        dispatch(CheckMaxItemThunk());
    },10000)))
}
export const setItemThunkStart = (id: number) => async (dispatch: any) => {
    dispatch(statLoad());
    let item = await getElementById(id);
    if(item.type === 'comment') {
        item.name = item.by;
        item.isLoad = false;
        delete item.by
    }
    if (item.type === 'story') {
        debugger
        item = {
            id: item.id,
            url: item.url,
            fullLenComments:(item.descendants === -1) ? null : item.descendants,
            header:item.title,
            author:item.by,
            score:item.score,
            time:item.time,
            comments:[],
            commentsId: ( typeof (item.kids) === 'object') ? [...item.kids] : [],
            type: 'story',
        }
    }
    return item;
}
export const setItemThunkEnd = (item: any) => async (dispatch: any) => {
    dispatch(setItem(item));
    dispatch(stopLoad());
}

let initState: IgetByIdReducersState = {
    isLoad:false,
    isLoadInItem: false,
};

export default function getByIdReducers (state = initState,action: any):IgetByIdReducersState {
    switch (action.type) {
        case ADD_COMMENT_TO_STORY: {
            debugger
            let item = state.item;
            if (item && item.type === 'story') {
                item = {...item};
                let comments = [];
                for (let key in action.comments) {
                    comments.push(action.comments[key])
                }
                debugger
                item.comments = [...item.comments,...comments];
            }
            return {
                ...state,
                item: item
            }
        }
        case STOP_CHECK_MAX_ITEM: {
            return {
                ...state,

            }
        }
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
            // that no reload if max Item Index = check index
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
        case RESET_ITEM: {
            return {
                ...state,
                item: undefined,
                isLoad: false,
            }
        }
        default: return state;
    }
}