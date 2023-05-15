import {loadRemoteFile} from "/xlsx-render/main.js"
// 在整个页面及所有依赖资源如样式表和图片都已完成加载时触发
window.addEventListener('load', (/*event*/) => {
  // 此处可将之替换成想用的url和渲染目标元素的Id
  let url ="https://wiki-assets.aliceincradle.org/xlsx/zh-hant/table_of_contents/chest_reels.xlsx";
  let elementId = "chest_reels_zh-hant";
  loadRemoteFile(url,elementId);
  // 用户上传的文件，元素id为input
  const inputElement = document.getElementById("input");
  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles() {
      const fileList = this.files; /* 现在你可以处理文件列表 */
      readWorkbookFromLocalFile(fileList[0],function (workbook){
          outputWorkbook(workbook)
      })
  }
});
