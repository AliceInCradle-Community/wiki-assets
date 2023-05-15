// 从网络上读取某个excel文件，url必须同域，否则报错
function readworkbook03FromRemoteFile(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("get", url, true);
  xhr.responseType = "arraybuffer";
  xhr.onload = function (e) {
    if (xhr.status == 200) {
      var data = new Uint8Array(xhr.response);
      var workbook03 = XLSX.read(data, { type: "array" });
      if (callback) callback(workbook03);
    }
  };
  xhr.send();
}

// 读取 excel文件
function outputworkbook03(workbook03) {
  var sheetNames = workbook03.SheetNames; // 工作表名称集合
  sheetNames.forEach((name) => {
    var worksheet = workbook03.Sheets[name]; // 只能通过工作表名称来获取指定工作表
    for (var key in worksheet) {
      // v是读取单元格的原始值
      console.log(key, key[0] === "!" ? worksheet[key] : worksheet[key].v);
    }
  });
}

function readworkbook03(workbook03) {
  var sheetNames = workbook03.SheetNames; // 工作表名称集合
  var worksheet = workbook03.Sheets[sheetNames[0]]; // 这里我们只读取第一张sheet
  var csv = XLSX.utils.sheet_to_csv(worksheet);
  document.getElementById("result03").innerHTML = csv2table(csv);

  // 合并单元格
  mergeTable(workbook03, true);
}

// 将csv转换成表格
function csv2table(csv) {
  var html = "<table class=excel>";
  var rows = csv.split("\n");
  rows.pop(); // 最后一行没用的
  rows.forEach(function (row, idx) {
    var columns = row.split(",");
    html += "<tr>";
    columns.forEach(function (column) {
      html += "<td>" + column + "</td>";
    });
    html += "</tr>";
  });
  html += "</table>";
  return html;
}

// 合并单元格
function mergeTable(workbook03) {
  let SheetNames = workbook03.SheetNames[0];
  let mergeInfo = workbook03.Sheets[SheetNames]["!merges"];
  let result = document.getElementById("result03");

  mergeInfo.forEach((item03) => {
    let start_r = item03.s.r;
    let end_r = item03.e.r;

    let start_c = item03.s.c;
    let end_c = item03.e.c;

    for (let i = start_r; i <= end_r; i++) {
      let row = document.querySelectorAll("#result03 tr")[i];
      for (let child = start_c; child <= end_c; child++) {
        if (child === start_c && i === start_r) {
          // 循环到就是第一个单元格，以这个单元格为开始进行合并
          row.children[child].classList.add("will_span");
          row.children[child].setAttribute("row", end_r - start_r + 1);
          row.children[child].setAttribute("col", end_c - start_c + 1);
          row.children[child].setAttribute("align", "center");
        } else {
          // 只做标记，不在这里删除
          row.children[child].classList.add("remove");
        }
      }
    }
  });

  // 移除对应的td
  document.querySelectorAll(".remove").forEach((item03) => {
    item03.parentNode.removeChild(item03);
  });

  // 为大的td设置跨单元格合并
  document.querySelectorAll(".will_span").forEach((item03) => {
    item03.classList.remove("will_span");
    item03.rowSpan = item03.getAttribute("row");
    item03.colSpan = item03.getAttribute("col");
  });
}

function loadRemoteFile(url) {
  readworkbook03FromRemoteFile(url, function (workbook03) {
    readworkbook03(workbook03);
  });
}