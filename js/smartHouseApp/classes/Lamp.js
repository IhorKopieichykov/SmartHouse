import { Device } from "./Device.js";

export class Lamp extends Device{
    constructor(name, color = "rgba(255, 255, 160, 1)") {
        super(name, 'lamp');        
        this._color = color;
    }
    set color(color) {
        this._color = color;
    }
    get color() {
        return this._color;
    }
}
