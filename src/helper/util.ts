import xmljs from "xml-js";

let arr:any[] = [];
export const parseXmlToJSON = (xmlString:string) => {
  arr = [];
  const options = {compact: true, ignoreComment: true};
  const result = xmljs.xml2js(xmlString, options);
  traverse(result);

  arr.map(item => {
    if (item.data.state) return
    if (arr.findIndex(e => e.parent === item.parent && e.data.state) > -1 )
      item.data.state = 'On'
  })

  console.log('arr', arr)
  return arr;
};

const traverse = (obj:any, parent = 0) => {
  for (const key in obj) {
    const v = obj[key];
    if (typeof v === 'object' && Object.keys(v).filter((k) => !k.includes("_")).length) {
      if (key !== "_attributes") {
        const id:number = arr.length + 1;
        arr.push({
            "id": id,
            "parent": parent,
            "droppable": true,
            "text": "text" + id,
            "data": {
              "tag": key
            }
        });
        traverse(v, id);
      }
    } else {
      if (key !== "_attributes") {
        arr.push({
            "id": arr.length + 1,
            "parent": parent,
            "droppable": true,
            "text": "text" + arr.length + 1,
            "data": {
              "tag": key,
              "state": v._attributes?.state
            }
        });
      }
    }
  }
}