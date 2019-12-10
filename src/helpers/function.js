import { getElementById } from "../api/api";

export async function JsonComent (arr,path=[],end = false) {
  if (arr===undefined||!arr.length) {
    return
  }
  arr = arr.sort((a,b) => {return a-b});
  console.log( arr );
  let json = {};
  for (let t=0; t<arr.length; t++) {
    let infoArrItem = await getElementById (arr[t]);
    if (infoArrItem.deleted) {
      continue
    }
    if (infoArrItem.kids === undefined) {
    }
    let newPath = [...path,arr[t]];
    json[arr[t]] = {
      id: arr[t],
      name: infoArrItem.by,
      text: infoArrItem.text,
      comments: /*(end) ? infoArrItem.kids : */await JsonComent(infoArrItem.kids,newPath,true),
      commentsLeng: (infoArrItem.kids !== undefined) ? infoArrItem.kids.length : '',
      path: [...newPath],
    }
  }
  return json
}