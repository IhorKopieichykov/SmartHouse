export class Room{
    constructor(name, type, devices = []){
        this._name = name;
        this._type = type;
        this._devices = devices;
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
    set type(type){        
        this._type = type;        
    }
    get type(){        
        return this._type;       
    }
    get devices(){
        return this._devices;
    }    
    addDevice(device){
        this._devices.push(device);
    }    
    // getDeviceByName:  function(name){
    //     if (this._devices.length) {
    //         for (var i = 0; i < this._devices.length; i++) {
    //             if (this._devices[i].name() === name) {
    //                 return this._devices[i];
    //             }               
    //         }
    //     }        
    // },
    // getDeviceById: function(index){
    //     if (this._devices[index]) {
    //         return this._devices[index];
    //     }
    // }, 
    // deleteDevice(value){
    //     if (typeof value === 'string') {
    //         for (var i = 0; i < this._devices.length; i++) {
    //             if (this._devices[i].name() === value) {
    //                 this._devices.splice(i, 1);
    //             }
    //         }
    //     } else if (typeof value === 'number'){
    //         this._devices.splice(value, 1);
    //     }        
    // },
    // deleteAllDevices: function(){
    //     this._devices.length = 0;
    // },
    // onDevice: function(value){
    //     if (typeof value === 'string') {
    //         for (var i = 0; i < this._devices.length; i++) {
    //             if (device.name() === value) {
    //                 this._devices[i].on();
    //             }
    //         }
    //     } else if (typeof value === 'number'){
    //         if(value >=0 && value < this._devices.length){
    //             this._devices[value].on();
    //         }
    //     } 
    // },
    // offDevice: function(value){
    //     if (typeof value === 'string') {
    //         for (var i = 0; i < this._devices.length; i++) {
    //             if (device.name() === value) {
    //                 this._devices[i].off();
    //             }
    //         }
    //     } else if (typeof value === 'number'){
    //         if(value >=0 && value < this._devices.length){
    //             this._devices[value].off();
    //         }
    //     } 
    // },
    // offAllDevices: function(){
    //     for (var i = 0; i < this._devices.length; i++) {           
    //         this._devices[i].off();          
    //     }
    // },
    // onAllDevices: function(){
    //     for (var i = 0; i < this._devices.length; i++) {           
    //         this._devices[i].on();          
    //     }
    // },
    // timeoutOffAll: function(time){
    //     setTimeout(offAllDevices, time);
    // },
    // intervalOffAll: function(time){
    //     var index = 0;
    //     var timer = setInterval(() => {            
    //         this.offDevice(index);
    //         index++;
    //         if (index === this._devices.length) {
    //             clearInterval(timer);
    //         }
    //     }, time);
    // },
}
