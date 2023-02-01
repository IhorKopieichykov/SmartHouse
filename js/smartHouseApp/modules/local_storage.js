import {SmartHouse} from "../classes/SmartHouse.js";
import {Room} from "../classes/Room.js";
import {Device} from "../classes/Device.js";
import {Lamp} from "../classes/Lamp.js";
import { Conditioner } from "../classes/Conditioner.js";
import { Humidifier } from "../classes/Humidifier.js";


export function copyItemsFromLocalStorage(app) {
    if (localStorage.getItem('smartHouses')) {
        let newArr = JSON.parse(localStorage.getItem('smartHouses'));
        let rooms = [];
        let devices = [];
        for (let i = 0; i < newArr.length; i++) {
            const smartHouse = newArr[i];
            const LSrooms = newArr[i]._rooms;
            for (let r = 0; r < LSrooms.length; r++) {
                const room = LSrooms[r];
                const LSdevices = room._devices;
                for (let d = 0; d < LSdevices.length; d++) {
                    const device = LSdevices[d];
                    switch (device._type) {
                        case 'lamp':
                            devices.push(new Lamp(device._name, device._color));
                            break;

                        case 'conditioner':
                            devices.push(new Conditioner(device._name, device._temperature, device._speed));
                            break;

                        case 'humidifier':
                            devices.push(new Humidifier(device._name, device.__humidity, device._water));
                            break;

                        default:
                            break;
                    }
                }
                rooms.push(new Room(room._name, room._type, devices));                
                devices = [];
            }
            app.smartHouses.push(new SmartHouse(smartHouse._name, rooms));
            rooms = [];
        }
    }
}

export function saveItemsInLocalStorage(app) {
    try {
        localStorage.clear();
        localStorage.setItem('smartHouses', JSON.stringify(app.smartHouses));
    } catch (error) {
        console.log(error.toString());
    }
}