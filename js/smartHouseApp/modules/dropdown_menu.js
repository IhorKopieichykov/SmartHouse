import { renderOffDeviceModal } from "../renderers/renderOffDeviceModal.js";
import { renderEditItemModal } from "../renderers/renderEditItemModal.js";
import { renderDeleteItemModal } from "../renderers/renderDeleteItemModal.js";
import { showModal } from "./modal_window.js";

export function showDropDownMenu(page){
    page.dropDownMenu.classList.toggle('show');
}

export function addMenuListeners(app, page){
    const menuList = page.dropDownMenu.firstElementChild;
    for (let i = 0; i < menuList.children.length; i++) {
        const menuItem = menuList.children[i];
        if (menuItem.dataset) {
            const menuItemFunc = menuItem.dataset.menuItemFunc;
            switch (menuItemFunc) {
                case 'off':
                    menuItem.addEventListener('click', function () {
                        renderOffDeviceModal(app, page);
                        showModal(page.modal);
                    });
                    break;

                case 'edit':
                    menuItem.addEventListener('click', function () {
                        renderEditItemModal(app, page);
                        showModal(page.modal);
                    });
                    break;

                case 'delete':
                    menuItem.addEventListener('click', function(){
                        renderDeleteItemModal(app, page);
                        showModal(page.modal);
                    });
                    break;
            
                default:
                    break;
            }
        }
    }    
}


