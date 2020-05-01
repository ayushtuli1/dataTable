let pageNum = 0;
let tableData = [];
let sort = false;
function getData() {
  axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
    window.localStorage.setItem("countryData", JSON.stringify(response.data));
    var length = document.getElementById("ddlViewBy").value;
    chunkArray(length);
  });
}
function changeLength() {
  var length = document.getElementById("ddlViewBy").value;
  chunkArray(length);
}

function chunkArray(chunk_size) {
  let data = JSON.parse(localStorage.getItem("countryData"));
  tableData = [];
  while (data.length) {
    tableData.push(data.splice(0, chunk_size));
  }
  updateTable();
}

function updateTable() {
  var table = document.getElementById("dataTable");
  for (var i = table.rows.length - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  let item = tableData[pageNum];
  if (item.length) {
    for (var i = 0; i < item.length; i++) {
      row = table.insertRow(-1);
      var cell1 = row.insertCell(-1);
      var cell2 = row.insertCell(-1);
      var cell3 = row.insertCell(-1);
      var cell4 = row.insertCell(-1);
      var cell5 = row.insertCell(-1);
      var cell6 = row.insertCell(-1);
      cell1.innerHTML = item[i].name;
      cell2.innerHTML = item[i].alpha2Code;
      cell3.innerHTML = item[i].subregion;
      cell4.innerHTML = item[i].capital;
      cell5.innerHTML = item[i].population;
      cell6.innerHTML = item[i].numericCode;
    }
  }
  const pageItems =
    parseInt(pageNum + 1) *
    parseInt(document.getElementById("ddlViewBy").value);
  document.getElementById("pagnumber").innerText =
    pageItems - parseInt(document.getElementById("ddlViewBy").value) + 1;
  document.getElementById("pageItems").innerText = pageItems;
  document.getElementById("totalItems").innerText = JSON.parse(
    localStorage.getItem("countryData")
  ).length;
}

function search(value) {
  if (value === "") {
    changeLength();
  } else {
    const nameCapitalized = value.charAt(0).toUpperCase() + value.slice(1);
    tableData[pageNum] = JSON.parse(localStorage.getItem("countryData")).filter(
      (item) => {
        if (item.name.includes(nameCapitalized)) {
          return item;
        } else if (item.alpha2Code.includes(nameCapitalized)) {
          return item;
        } else if (item.capital.includes(nameCapitalized)) {
          return item;
        } else if (item.population === parseInt(nameCapitalized)) {
          return item;
        }
      }
    );
  }
  updateTable();
}

function previous() {
  if (pageNum !== 0) {
    pageNum = pageNum - 1;
  }
  updateTable();
}
function next() {
  let data = JSON.parse(localStorage.getItem("countryData"));
  let limit = data.length / document.getElementById("ddlViewBy").value;
  if (pageNum + 1 !== limit) {
    pageNum = pageNum + 1;
    updateTable();
  }
}
function changePageNum(num) {
  pageNum = num - 1;
  updateTable();
}

function sortColumn(columnName) {
  sort = !sort;
  if (sort) {
    tableData[pageNum].sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
  } else {
    tableData[pageNum].sort((a, b) => (a[columnName] < b[columnName] ? 1 : -1));
  }
  updateTable();
}
