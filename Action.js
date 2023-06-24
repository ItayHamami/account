export default class action{ 
    constructor(type , description , amount){
        this.id = Math.floor(Math.random()*1001);
        this.type = type; 
        this.description = description; 
        this.amount= type == "expense" ? -amount : amount; 
    }
    get(propName){
        return this[propName];
    }
    set(propName,value){
        this[propName] = value;
    }
}