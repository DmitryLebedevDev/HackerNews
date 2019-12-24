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
export function UserItems (arr) {
  return new Promise ((res,req) => {
    let arrPromise = [];
    let resultObj = {
      styry: [],
      comments: [],
    };
    for (let t=0; t<arr.length; t++) {
      arrPromise.push(getElementById(arr[t]).then((res) => {
        if (res.type === 'story') {
          resultObj.styry.push(res);
        }
        if (res.type === 'comment') {
          resultObj.comments.push(res);
        }
      }));
    }
    Promise.all(arrPromise).then(info => {
      res(resultObj);
    })
  })
}

export function UnDate (currentSeconts) {
  // eslint-disable-next-line no-extend-native
  Date.prototype.getUnixTime = function() { return this.getTime()/1000|0 };
  if(!Date.now) Date.now = function() { return new Date(); }
  Date.time = function() { return Date.now().getUnixTime(); }
  let someDate = new Date();
  let theUnixTime = someDate.getUnixTime();
  let diffrent = theUnixTime-currentSeconts
  return diffrent;
}
export function ObjOfUnDate (coutTime) {
  console.log(UnDate(coutTime),'unixDate');
  let date1 = new Date(+new Date() + new Date().getTimezoneOffset()*60*1000);
  //? разница между настоящим и прошлым
  let date2 = UnDate(coutTime);
  let currentDiff = (+date1/1000) - (+date2);
  let diffrent = new Date(currentDiff*1000);
  return diffrent
}
export function ObjOfUnDateToString (coutTime) {
  let objDate = ObjOfUnDate(coutTime);
  let diffrent = UnDate(coutTime);
  //if (diffrent < )
  console.log(objDate.getMonth(),objDate.getDate());
  let date = new Intl.DateTimeFormat("en-Us",{
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(objDate);
  return date
}

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
              if (infoArrItem.deleted) {
                info()
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
