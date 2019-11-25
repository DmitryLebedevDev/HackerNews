
import { getTopStorys } from './../api/api';


const ADD_STORY = 'ADD_TOP_STORY';



const addStory = (arrayStorys) => {
  return {
    type: ADD_STORY,
    storys: arrayStorys,
  }
}
export const addTopStoryThunk = () => async (dispatch) => {
  let indexArrayStorys = await getTopStorys();
  let arrayStorys = [];
  console.log(indexArrayStorys);
  //indexArrayStorys.map(item => {}) // add arrayStorys
  dispatch(addStory(arrayStorys));
}

const start = {
  storys: [],
}
function storeReducers (state = start, action) {
  switch (action.type) {
    case ADD_STORY: {
      return {
        ...state,
        storys: [...state.storys,...action.storys],
      }
    }
    default: {
      return state
    }
  }
}

export default storeReducers;