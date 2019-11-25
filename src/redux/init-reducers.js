const INIT = "INIT";

export const init = () => {
  return {
    type:INIT,
  }
}

const start = {
  init: false
}

function initReducer (state=start,action) {
  if (action.INIT) {
    return {
      ...state,
      init:true,
    }
  }
  return state;
}

export default initReducer