import {loadRemoteFile} from "/xlsx-render/main.js"
window.addEventListener('load', (/*event*/) => {
  let url ="https://wiki-assets.aliceincradle.org/xlsx/zh-tw/item/item.xlsx";
  let elementId = "item_zh-tw";
  loadRemoteFile(url,elementId);
});