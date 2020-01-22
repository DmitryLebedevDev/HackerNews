import reducerStore from './store-reducers';
import {addStory} from './store-reducers';

let initStore = {
  storys: [],
  lenStory: 0,
  lenIsMax: false,
  storysIsLoad: false,
};

it('add story', () => {
  let action = addStory([{info:'story 1'}]);
  let state = reducerStore(initStore,action);
  expect(state.storys.length).toBe(1);
});
it('add current story', () => {
  
})