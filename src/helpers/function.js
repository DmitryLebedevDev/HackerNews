import { getElementById } from "../api/api";

/*export async function JsonComent(arr, path = [], end = false) {
  if (arr === undefined || !arr.length) {
    return
  }
  arr = arr.sort((a, b) => { return a - b });
  console.log(arr);
  let json = {};
  for (let t = 0; t < arr.length; t++) {
    let infoArrItem = await getElementById(arr[t]);
    if (infoArrItem.deleted) {
      continue
    }
    if (infoArrItem.kids === undefined) {
    }
    let newPath = [...path, arr[t]];
    json[arr[t]] = {
      id: arr[t],
      name: infoArrItem.by,
      text: infoArrItem.text,
      comments: await JsonComent(infoArrItem.kids, newPath, true),
      commentsLeng: (infoArrItem.kids !== undefined) ? infoArrItem.kids.length : '',
      path: [...newPath],
    }
  }
  return json
}
*/

export function JsonComent(arr, path = [], commentsLen = 0) {
  console.log('я запустилась');
  if (arr === undefined || !arr.length) {
    return new Promise ((res,req) => res());
  }
  return new Promise((res, req) => {
    let json = {};
    let arrPromis = [];
    for (let t = 0; t < arr.length; t++) {
      let promis = getElementById(arr[t]).then(infoArrItem => {
        return new Promise((info, error) => {
          let newPath = [...path, arr[t]];
          if (infoArrItem.deleted) {
            info()
          }
          JsonComent(infoArrItem.kids, newPath).then(
            comments => {
              let valueComments = 0;
              if (comments) {
                console.log(comments)
                for (let key in comments) {
                  valueComments += +comments[key].commentsLeng;
                }
              }
              json[arr[t]] = {
                id: arr[t],
                name: infoArrItem.by,
                text: infoArrItem.text,
                comments: comments,
                commentsLeng: (infoArrItem.kids !== undefined) ? infoArrItem.kids.length + valueComments : '',
                path: [...newPath],
              }
              info();
            }   
          )
        })
      })
      arrPromis.push(promis);
    }
    Promise.all(arrPromis).then(result => {
      res(json);
    })
  })
}
