import {getElementById} from "../api/api";


export function getItemsArrayLoad (arr = []) {
  return new Promise((res,req) => {
    let promiseArr = [];
    let items = [];
    for(let t=0; t<arr.length; t++) {
      promiseArr.push(getElementById(arr[t]).then(result => {
        items.push(result);
      }))
    }
    Promise.all(promiseArr).then(info => {
      res(items);
    })
  })
}
export async function getItemsLoadS (indexMaxItem,count) {
  let storysArr = [];
  while (storysArr.length < count) {
    if (indexMaxItem === 0) {
      break;
    }
    let indexsLoading = [];
    for (let t=0; t<count && count-t>=1; t++) {
      indexsLoading.push(indexMaxItem-t);
    }
    indexMaxItem-=count;
    let storys = await getItems(indexsLoading);
    if (storys && storys.story) {
      storysArr.push(...storys.story)
    }
  }
  return {
    story: storysArr,
    index: indexMaxItem
  };
}
export function getItems (arr) {
  return new Promise ((res,req) => {
    let arrPromise = [];
    let resultObj = {
      story: [],
      comments: [],
    };
    for (let t=0; t<arr.length; t++) {
      arrPromise.push(getElementById(arr[t]).then((res) => {
        if (res && res.type === 'story') {
          if (res.url !== undefined) {
            resultObj.story.push({
              id:res.id,
              author: res.by,
              time: res.time,
              fullLenComments: res.descendants,
              comments: [],
              commentsId: res.kids,
              score: res.score,
              header: res.title,
              url: res.url,
              commentsIsLoad: false,
            }); 
          }
        }
        if (res && res.type === 'comment') {
          if (!res.deleted) {
            resultObj.comments.push({
              id: res.id,
              name: res.by,
              text: res.text,
              //comments
              //commentsLeng(pin):1
              commentsIdArr: res.kids,
            });
          }
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
  let date1 = new Date(+new Date() + new Date().getTimezoneOffset()*60*1000);
  //? разница между настоящим и прошлым
  let date2 = UnDate(coutTime);
  let currentDiff = (+date1/1000) - (+date2);
  let diffrent = new Date(currentDiff*1000);
  return diffrent
}
export function ObjOfUnDateToString (coutTime) {
  let objDate = ObjOfUnDate(coutTime);
  let date = new Intl.DateTimeFormat("en-Us",{
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(objDate);
  return date
}
export function egoDateToString (unDate) {
  let time = ObjOfUnDate(unDate);
  let diffrent = (new Date() - time)/1000;
  if (diffrent < 60) {
    return `${diffrent} seconds ego`;
  }
  if (diffrent < 3600) {
    return `${Math.ceil(diffrent/60)} menutes ego`;
  }
  if (diffrent < 86400) {
    return `${Math.ceil(diffrent/3600)} hours ego`;
  }
  if (diffrent < 2678400) {
    return `${Math.ceil(diffrent/604800)} weeks ego`;
  }
  return ObjOfUnDateToString(unDate);
}

// func requesq tree comments
export function JsonComent(arr, path = [], commentsLen = 0) {
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
