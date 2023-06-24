import Action from "./classes/Action.js";
import ActionsManager from "./classes/ActionsManager.js";

let userName;
let manager;
function restoreData() {
  // Retrieve the data from local storage
  const storedData = JSON.parse(localStorage.getItem('manager'));


  if (storedData && Array.isArray(storedData.managerArray) && typeof storedData.balance === 'number') {
    // Recreate the Action instances from the stored managerArray
    manager = new ActionsManager(
      storedData.managerArray.map((actionData) => new Action(
        actionData.type,
        actionData.description,
        actionData.amount
      )),
      storedData.balance , storedData.userName
    );

    console.log(manager);
    console.log(manager.balance);
    console.log(manager.managerArray);
    showActionsInTable();
  } else {
userName = prompt("Welcome to My Account! Please enter your name to continue.")
    console.log('No valid data found in local storage');
    manager = new ActionsManager([], 0,userName);
    manager.calcBalance()
  }
}
function filterSearch() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("actions");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', restoreData);
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById("myInput");
  input.addEventListener('keyup', filterSearch);
});




function showActionsInTable() {
localStorage.setItem("manager", JSON.stringify(manager));
document.getElementById("actions").innerHTML = "";
for (let action of manager.managerArray) {
    document.getElementById("actions").innerHTML += `<tr class=${
    action.type == "income" ? "text-success" : "text-danger"
    }> <td>${action.description} </td> <td>${action.amount} </td><td><i class="fa-regular fa-pen-to-square" onclick="updateAction(${action.id})"></i> </td> <td><i class="fa-regular fa-trash-can" onclick="deleteAction(${action.id})"></i> </td></tr>`;
}
}

window.addNewAction = () => {// take the form values
  let type = document.getElementById("type").value;
  let description = document.getElementById("description").value;
  let amount = +document.getElementById("amount").value;
  // create action object
  let newAction = new Action(type, description, amount);
  // add newAction to manager actions array
  manager.addAction(newAction);
  console.log(manager.managerArray);
  document.getElementById("type").value = "income";
  document.getElementById("description").value = "";
  document.getElementById("amount").value = "";
  showActionsInTable();};

window.updateAction = (id) => {
  //prompt
let newAmount = prompt("Enter new amount:");
if (newAmount == null || newAmount == "" || newAmount != +newAmount)
    alert("Sorry! something went wrong");
else {
    //update action
    manager.updateAction(id, +newAmount);
    // call showActionInTable()
    showActionsInTable();
}
};

window.deleteAction = (id) => {
  //prompt
if (confirm("Please confirm\nEither OK or Cancel.")) {
    //delete action
    manager.deleteAction(id);
    // call showActionInTable()
    showActionsInTable();
}
};



