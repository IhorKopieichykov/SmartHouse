export class SmartHouse {
    constructor(name, rooms = []){
        this._name = name;
        this._rooms = rooms;
    }
    set name(name){        
        this._name = name;        
    }
    get name(){        
        return this._name;       
    }
    getName(){
        return this._name;
    }
    get rooms(){
        return this._rooms;
    }
    getRooms(){
        return this._rooms;
    }
    addRoom(room){
        this._rooms.push(room);
    }
    deleteRoom(value){
        if (typeof value === 'string') {
            var index = 0;
            for (var i = 0; i < this._rooms; i++) {
                if (this._rooms.name() === value) {
                    this._rooms.splice(i, 1);
                }
                index++;
            }
        } else if (typeof value === 'number'){
            if (value >= 0 && value < this._rooms.length) {
                this._rooms.splice(value, 1);
            }            
        }        
    }
    deleteAllRooms(){
        this._rooms.length = 0;
    }
    getRoomByName(name){
        for (var i = 0; i < this._rooms.length; i++) {                
            if (this._rooms[i].name() === name) {
                return this._rooms[i];
            }                
        }  
    }
    getRoomById(index){        
        if (index >= 0 && index < this._rooms.length) {
            return this._rooms[index];
        }
    }
    getNumberOfRooms(){
        return this._rooms.length;
    }
    getDevicesInRoom(value){
        if (typeof value === 'string') {
            return getRoomByName(value).getDevices();
        } else if(typeof value === 'number'){
            return getRoomById(value).getDevices();
        }
    }
    offAllDevices(){
        for (var room in this._rooms) {
            room.offAllDevices();
        }
    }
    timeoutOffAll(time){
        setTimeout(offAllDevices, time);
    }
    intervalOffAll(time){
        var index = 0;
        var timer = setInterval(() => {            
            this._rooms(index).offAllDevices();
            index++;
            if (index === this._rooms.length) {
                clearInterval(timer);
            }
        }, time);
    }
}





