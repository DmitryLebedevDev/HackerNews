import * as axios from 'axios';

let axiosBase = axios.create({
  baseURL:'https://hacker-news.firebaseio.com/v0/'
  }
);

export const getTopStorys = () => axiosBase.get('/topstories.json').then(res => res.data);



export const getElementById = (id) => axiosBase.get(`/item/${id}.json`).then(res => res.data);

getElementById(21663263).then(res => console.log(res));