import { Istory } from './storys-reducersType';

export default interface InewStoryReducers {
  story: Istory[];
  isLoad: boolean;
  currentIndexStory?: number;
  isInit: boolean;
}
