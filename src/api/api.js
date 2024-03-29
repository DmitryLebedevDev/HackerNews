import * as axios from 'axios';

let axiosBase = axios.create({
  baseURL:'https://hacker-news.firebaseio.com/v0'
  }
);

export const getTopStorys = () => axiosBase.get('/topstories.json').then(res => res.data);
export const getTopJobs = () => axiosBase.get('/jobstories.json').then(res => res.data);
export const getAsk = () => axiosBase.get('/askstories.json').then(res => res.data);
export const maxItems = () => axiosBase.get('/maxitem.json').then(res => res.data);

export const getElementById = (id) => axiosBase.get(`/item/${id}.json`).then(res => res.data);
export const getElementByUserId = (id) => axiosBase.get(`/user/${id}.json`).then(res => res.data);
