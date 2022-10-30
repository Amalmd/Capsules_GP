// https://capsules7.herokuapp.com/api/user/:id

// https://capsules7.herokuapp.com/api/group/:number (edited)

/* const state = {
  headers: [Id, FirstName, LastName, Capsule, Age, City, Gender, Hobby, ""],
}; */
async function fillTable(table) {
  const tableHead = table.querySelector("thead");
  const tableBody = table.querySelector("tbody");
  const response = await fetch("https://capsules7.herokuapp.com/api/group/two");
  const data = await response.json();
  // console.log(Object.values(Object.values(dataPay[0])[0]));
  // clear table
  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  // putting headers
  for (const headerText in data[0]) {
    const headerElement = document.createElement("th");
    headerElement.textContent =
      headerText.charAt(0).toUpperCase() + headerText.slice(1);
    tableHead.querySelector("tr").appendChild(headerElement);
  }

  // adding contents
  for (let i = 0; i < data.length; i++) {
    const obj = Object.values(data[i]);
    const rowElement = document.createElement("tr");
    for (const cellText of obj) {
      const cellElement = document.createElement("td");
      cellElement.textContent = cellText;
      rowElement.appendChild(cellElement);
    }
    tableBody.appendChild(rowElement);
  }
  for (const headerText in data[0][0]) {
    const headerElement = document.createElement("th");
    headerElement.textContent =
      headerText.charAt(0).toUpperCase() + headerText.slice(1);
    tableHead.querySelector("tr").appendChild(headerElement);
  }
}

const searchFun = () => {
  let filter = document.querySelector("#myInput").value.toUpperCase();
  let myTable = document.querySelector("table");
  let tr = myTable.getElementsByTagName("tr");

  for (let i = 0; i < tr.length; i++) {
    let td = tr[i].getElementsByTagName("td")[1];

    if (td) {
      let textVal = td.textContent || td.innerHTML;
      if (textVal.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
};

async function getAllUsers() {
  try {
    let groupOne = await fillTable(
      "https://capsules7.herokuapp.com/api/group/one"
    );
    let groupTwo = await fillTable(
      "https://capsules7.herokuapp.com/api/group/two"
    );
    const mergedArray = groupOne.concat(groupTwo);
    mergedArray.sort((a, b) => a.id - b.id);
    let users = [];
    for (let i = 0; i < mergedArray.length; i++) {
      const person = fillTable(
        `https://capsules7.herokuapp.com/api/user/${mergedArray[i].id}`
      );
      users.push(person);
    }
    const data = await Promise.all(users);
    app.appData = [...data];

    return data;
  } catch {
    console.log("Error 404");
  }
}
fillTable(document.querySelector("table"));

/* fillTable(
  `https://capsules7.herokuapp.com/api/group/two`,
  document.querySelector("table")
); */
