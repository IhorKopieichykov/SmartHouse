import { Lamp } from "../classes/Lamp.js";
import { Conditioner } from "../classes/Conditioner.js";
import { Humidifier } from "../classes/Humidifier.js";


// GET
export function getCurrentItem(array, currentItemName) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name == currentItemName) {
            return array[i];
        }
    }
}

// CHECK
export function checkSuchItemExist(itemsArr, newItemName) {
    return itemsArr.find(item => item.name === newItemName);
}

// ADD NEW DEVICE
export function addNewDevice(app, itemType, newItemName){
    switch (itemType) {
        case 'lamp':
            app.breadcrumbs[app.breadcrumbs.length - 1].devices.push(new Lamp(newItemName));
            break;

        case 'conditioner':
            app.breadcrumbs[app.breadcrumbs.length - 1].devices.push(new Conditioner(newItemName));
            break;

        case 'humidifier':
            app.breadcrumbs[app.breadcrumbs.length - 1].devices.push(new Humidifier(newItemName));
            break;
    
        default:
            break;
    }
}

