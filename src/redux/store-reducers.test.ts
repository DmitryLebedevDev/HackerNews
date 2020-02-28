import reducerStore from './storys-reducers';
import {addStory} from './storys-reducers';
import { Istory } from './storys-reducersType';

let initStore = {
  storys: [],
  lenStory: 0,
  lenIsMax: false,
  storysIsLoad: false,
};

it('add story', () => {
  let testStory: Istory = {
    author: 'valera',
    comments: [],
    commentsId: [],
    commentsIsLoad: false,
    fullLenComments: 0,
    header: 'header',
    id: 238942396234,
    score: 1273612,
    time: 937589467345,
    url: 'sdhfkjhasd',
    type: "story",
  }
  let action = addStory([testStory]);
  let state = reducerStore(initStore,action);
  expect(state.storys.length).toBe(1);
});
it('add current story', () => {
  
})