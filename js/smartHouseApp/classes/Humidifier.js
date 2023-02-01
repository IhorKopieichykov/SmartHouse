import { Device } from "./Device.js";

export class Humidifier extends Device{
    constructor(name, humidity = 45, water = 80){
        super(name, 'humidifier');
        this._humidity = humidity;
        this._water = water;
    }
    set humidity(humidity) {
        this._humidity = humidity;
    }
    get humidity() {
        return this._humidity;
    }
    set water(water) {
        this._water = water;
    }
    get water() {
        return this._water;
    }
}