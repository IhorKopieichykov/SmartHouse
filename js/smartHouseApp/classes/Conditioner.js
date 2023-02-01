import { Device } from "./Device.js";

export class Conditioner extends Device{
    constructor(name, temperature = 22, speed = 10){
        super(name, 'conditioner');
        this._temperature = temperature;
        this._speed = speed;
    }
    set temperature(temperature) {
        this._temperature = temperature;
    }
    get temperature() {
        return this._temperature;
    }
    set speed(speed) {
        this._speed = speed;
    }
    get speed() {
        return this._speed;
    }
}