import {loadRemoteFile} from "/xlsx-render/main.js"
// 在整个页面及所有依赖资源如样式表和图片都已完成加载时触发
window.addEventListener('load', (/*event*/) => {
  // 此处可将之替换成想用的url和渲染目标元素的Id
  let url ="https://wiki-assets.aliceincradle.org/xlsx/en/table_of_contents/chest_reels.xlsx";
  let elementId = "chest_reels_en";
  loadRemoteFile(url,elementId);
});
