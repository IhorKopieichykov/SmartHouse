export class Device{
    constructor(name, type){
        this._name = name;
        this._state = false;
        this._type = type;
    }
    set name(name){
        this._name = name;
    }
    get name(){
        return this._name;        
    }
    get state(){
        return this._state;        
    }
    set state(state){
        this._state = state;
    }
    get type(){
        return this._type;        
    }
    set type(type){
        this._type = type;
    }
    on(){
        this._state = true;
    }
    off(){
        this._state = false;
    }
}
