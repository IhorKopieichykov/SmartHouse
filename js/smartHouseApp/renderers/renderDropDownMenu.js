import { addMenuListeners } from "../modules/dropdown_menu.js";


export function renderDropDownMenu(app, page) {
    const menuList = page.dropDownMenu.firstElementChild;
    let content = '';
    menuList.innerHTML = content;
    switch (app.currentPage) {
        case 'houses':
            content = `
            <li class="dropdown__item" id="off" data-menu-item-func="off"><me class="me_off_on"></me> Turn off all devices</li>
            <li class="dropdown__item" id="delete" data-menu-item-func="delete"><me class="me_delete"></me> Delete all houses</li>`;            
            break;

        case 'rooms':
            content = `
            <li class="dropdown__item" id="off" data-menu-item-func="off"><me class="me_off_on"></me> Turn off all devices in the house</li>
            <li class="dropdown__item" id="edit" data-menu-item-func="edit"><me class="me_edit"></me> Edit the house</li>
            <li class="dropdown__item" id="delete" data-menu-item-func="delete"><me class="me_delete"></me> Delete the house</li>`;
            break;

        case 'devices':
            content = `
            <li class="dropdown__item" id="off" data-menu-item-func="off"><me class="me_off_on"></me> Turn off all devices in the room</li>
            <li class="dropdown__item" id="edit" data-menu-item-func="edit"><me class="me_edit"></me> Edit the room</li>
            <li class="dropdown__item" id="delete" data-menu-item-func="delete"><me class="me_delete"></me> Delete the room</li>`;
            break;

        case 'options':
            content = `
            <li class="dropdown__item" id="edit" data-menu-item-func="edit"><me class="me_edit"></me> Edit the device</li>
            <li class="dropdown__item" id="delete" data-menu-item-func="delete"><me class="me_delete"></me> Delete the device</li>`;
            break;

        default:
            break;
    }
    menuList.insertAdjacentHTML('beforeend', content);
    addMenuListeners(app, page);
}

