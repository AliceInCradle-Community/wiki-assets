import {loadRemoteFile} from "/xlsx-render/main.js"
window.addEventListener('load', (/*event*/) => {
  let url ="https://wiki-assets.aliceincradle.org/xlsx/zh-tw/item/recipes_expand_capacity.xlsx";
  let elementId = "recipes_expand_capacity_zh-tw";
  loadRemoteFile(url,elementId);
});