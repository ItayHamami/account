export default class ActionsManager {
    constructor(tasks = [], balance = 0,userName) {

    this.managerArray = tasks;
    this.balance = balance;
    this.userName = userName;
    }
    get(propName) {
    return this[propName];
    }

    set(propName, value) {
    this[propName] = value;
    }
    addAction(action) {
    this.managerArray.push(action);
    this.calcBalance()
    
    }

    deleteAction(id) {
    let indexToDelete = this.managerArray.findIndex((action) => action.id == id);
    this.managerArray.splice(indexToDelete, 1);
    this.calcBalance();
    }

    updateAction(id, newAmount) {
    let indexToUpdate = this.managerArray.findIndex((action) => action.id == id);
    this.managerArray[indexToUpdate].amount = this.managerArray[indexToUpdate].type == "expense" ? -newAmount : newAmount;

    this.calcBalance()
}
calcBalance(){
    this.balance = this.managerArray.reduce((total,action)=> total + action.amount , 0);
    document.getElementById("balance").innerText = `Hello ${this.userName}, Current balance: ${this.balance}`;
    
}
}