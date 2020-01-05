/*import reducerStore from './jobs-reducers';
import {addJobs} from './jobs-reducers'; 
let initStore = {
    jobs: [],
    loadJobsNum: 0,
    jobsIndexArr: []
  }
it('add story', () => {
  let action = addStory([{info:'story 1'}]);
  let state = reducerStore(initStore,action);
  expect(state.storys.length).toBe(1);
});
it('add current story', () => {
  /*
  id,
    author: story.by,
    time: story.time,
    fullLenComments: story.descendants,
    comments: [],
    commentsId: story.kids,
    score: story.score,
    header: story.title,
    url: story.url,
    commentsIsLoad: false,
  */
  //let action = 
//})