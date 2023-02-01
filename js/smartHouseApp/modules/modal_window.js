import {SmartHouse} from "../classes/SmartHouse.js";
import {Room} from "../classes/Room.js";

import {renderItems} from "../renderers/renderItems.js";
import {renderPage} from "../renderers/renderPage.js";
import {saveItemsInLocalStorage} from "./local_storage.js";
import {checkSuchItemExist, addNewDevice} from "./helpers.js";

// helpers Modal window
export function showModal(elem) {    
    elem.classList.add('open');
    const modalInput = document.querySelector('.modal__input');
    if (modalInput) {
        setTimeout(() => {
            modalInput.focus();
        }, 100);
        modalInput.selectionStart = modalInput.value.length;
    }
}
export function hideModal(elem) {
    document.getElementById('modal__form').reset();
    elem.classList.remove('open');    
}
export function showInputError(modalInput, inputError, message) {
    inputError.style.display = 'block';
    inputError.textContent = message;
    modalInput.style.border = '2px solid red';
}
export function hideInputError(modalInput, inputError) {
    inputError.style.display = 'none';
    modalInput.style.border = '3px solid grey';
}
export function showInputLength(inpLength, inpCounter, count){
    inpLength.style.display = 'block';
    inpCounter.textContent = count;
}
export function hideInputLength(inpLength){
    inpLength.style.display = 'none';
}

export function addCloseListeners(page){
    const closeModals = document.querySelectorAll('.close-modal');
    const modalInput = document.querySelector('.modal__input');
    const inputError = document.querySelector('.modal__input-error');
    if (closeModals.length > 0) {
        for (let i = 0; i < closeModals.length; i++) {
            let closeModal = closeModals[i];
            closeModal.addEventListener('click', function (e) {
                hideModal(page.modal);
                if (inputError) {
                    hideInputError(modalInput, inputError);
                }                
            });
        }
    }
    document.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal') && e.target.classList.contains('open')) {
            hideModal(page.modal);
            hideInputError(modalInput, inputError);
        }
    });
}

function validateInput(app, array){
    const modalType = document.querySelector('.modal').dataset.modalType;
    const modalInput = document.querySelector('.modal__input');
    const inputError = document.querySelector('.modal__input-error');
    const modalInputLength = document.querySelector('.modal__input_length');
    const modalInputCounter = document.querySelector('#input_length_counter');
    showInputLength(modalInputLength, modalInputCounter, modalInput.value.length);
    const newItemName = modalInput.value.trim();
    let validityState = modalInput.validity;
    if (validityState.valueMissing || newItemName.length == 0) {
        hideInputLength(modalInputLength);
        showInputError(modalInput, inputError, 'Name cannot be empty!');
        return false;
    } 
    if (modalType === 'edit'){        
        if (app.breadcrumbs[app.breadcrumbs.length - 1].name === newItemName){
            return newItemName;
        }
    }
    if (checkSuchItemExist(array, newItemName)) {
        hideInputLength(modalInputLength);
        showInputError(modalInput, inputError, 'This name already exists!');
        return false;
    }    
    hideInputError(modalInput, inputError);
    showInputLength(modalInputLength, modalInputCounter, modalInput.value.length);  
    return newItemName;
}


export function addOkModalBtnListener(app, page){
    const modalType = page.modal.dataset.modalType;
    const okModalButton = document.querySelector('.modal__button_ok');
    let callbackFunc;
    switch(modalType){
        case 'add':            
            switch(app.currentPage){
                case 'houses':
                    callbackFunc = function(){
                        const newItemName = validateInput(app, app.smartHouses);
                        if (!newItemName) {
                            return;
                        }
                        app.smartHouses.push(new SmartHouse(newItemName));
                        renderItems(page.itemsBlock, app.smartHouses, app.currentPage);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;
        
                case 'rooms':
                    callbackFunc = function(){
                        const itemType = document.querySelector('#itemType').value;
                        const newItemName = validateInput(app, app.breadcrumbs[app.breadcrumbs.length - 1].rooms);
                        if (!newItemName) {
                            return;
                        }
                        app.breadcrumbs[app.breadcrumbs.length - 1].rooms.push(new Room(newItemName, itemType));
                        renderItems(page.itemsBlock, app.breadcrumbs[app.breadcrumbs.length - 1].rooms, app.currentPage);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;
        
                case 'devices':
                    callbackFunc = function(){
                        const itemType = document.querySelector('#itemType').value;
                        const newItemName = validateInput(app, app.breadcrumbs[app.breadcrumbs.length - 1].devices);
                        if (!newItemName) {
                            return;
                        }
                        addNewDevice(app, itemType, newItemName);
                        renderItems(page.itemsBlock, app.breadcrumbs[app.breadcrumbs.length - 1].devices, app.currentPage);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;                    
                
                default:
                    break;
            }            
            break;

        case 'off':
            switch(app.currentPage){
                case 'houses':
                    callbackFunc = function(){
                        app.smartHouses.forEach(house => {
                            house.rooms.forEach(room => {
                                room.devices.forEach(device => device.state = false);
                            });
                        });
                        renderItems(page.itemsBlock, app.smartHouses, app.currentPage);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;
                        
                case 'rooms':
                    callbackFunc = function(){
                        app.breadcrumbs[app.breadcrumbs.length - 1].rooms.forEach(room => {
                            room.devices.forEach(device => device.state = false);
                        });
                        renderPage(app, page);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;
        
                case 'devices':
                    callbackFunc = function(){
                        app.breadcrumbs[app.breadcrumbs.length - 1].devices.forEach(device => device.state = false);
                        renderPage(app, page);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;  
                
                default:
                    break;
            }
            break;

        case 'edit':
            switch(app.currentPage){
                case 'rooms':
                    callbackFunc = function(){
                        const newItemName = validateInput(app, app.smartHouses);
                        if (!newItemName) {
                            return;
                        }
                        app.breadcrumbs[app.breadcrumbs.length - 1].name = newItemName;
                        renderPage(app, page);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;
        
                case 'devices':
                    callbackFunc = function(){
                        const itemType = document.querySelector('#itemType').value;
                        const newItemName = validateInput(app, app.breadcrumbs[app.breadcrumbs.length - 2].rooms);
                        if (!newItemName) {
                            return;
                        }
                        app.breadcrumbs[app.breadcrumbs.length - 1].name = newItemName;
                        app.breadcrumbs[app.breadcrumbs.length - 1].type = itemType;
                        renderPage(app, page);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;
        
                case 'options':
                    callbackFunc = function(){
                        const newItemName = validateInput(app, app.breadcrumbs[app.breadcrumbs.length - 2].devices);
                        if (!newItemName) {
                            return;
                        }
                        app.breadcrumbs[app.breadcrumbs.length - 1].name = newItemName;
                        renderPage(app, page);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;
                
                default:
                    break;
            }
            break;

        case 'delete':
            switch (app.currentPage) {
                case 'houses':
                    callbackFunc = function(){
                        app.smartHouses = [];
                        renderItems(page.itemsBlock, app.smartHouses, app.currentPage);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;
    
                case 'rooms':
                    callbackFunc = function(){
                        const itemIndex = app.smartHouses.indexOf(app.breadcrumbs[app.breadcrumbs.length - 1]); 
                        app.smartHouses.splice(itemIndex, 1);
                        app.currentPage = 'houses';
                        app.breadcrumbs.pop();
                        renderPage(app, page);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;
                
                case 'devices':
                    callbackFunc = function(){
                        const itemIndex = app.breadcrumbs[app.breadcrumbs.length - 2].rooms.indexOf(app.breadcrumbs[app.breadcrumbs.length - 1]); 
                        app.breadcrumbs[app.breadcrumbs.length - 2].rooms.splice(itemIndex, 1);
                        app.currentPage = 'rooms';
                        app.breadcrumbs.pop();
                        renderPage(app, page);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;

                case 'options':
                    callbackFunc = function(){
                        const itemIndex = app.breadcrumbs[app.breadcrumbs.length - 2].devices.indexOf(app.breadcrumbs[app.breadcrumbs.length - 1]); 
                        app.breadcrumbs[app.breadcrumbs.length - 2].devices.splice(itemIndex, 1);
                        app.currentPage = 'devices';
                        app.breadcrumbs.pop();
                        renderPage(app, page);
                        saveItemsInLocalStorage(app);
                        hideModal(page.modal);
                    };
                    break;
    
                default:
                    break;
            }        
            break;
        
        default:
            break;
    }
    okModalButton.addEventListener('click', callbackFunc);    
}

export function addInputListener(app, page){
    const modalType = page.modal.dataset.modalType;
    const modalInput = document.querySelector('.modal__input');
    let callbackFunc;
    switch(modalType){
        case 'add':            
            switch(app.currentPage){
                case 'houses':
                    callbackFunc = function(){
                        validateInput(app, app.smartHouses);
                    };
                    break;
        
                case 'rooms':
                    callbackFunc = function(){
                        validateInput(app, app.breadcrumbs[app.breadcrumbs.length - 1].rooms);
                    };
                    break;
        
                case 'devices':
                    callbackFunc = function(){
                        validateInput(app, app.breadcrumbs[app.breadcrumbs.length - 1].devices);
                    };
                    break;                    
                
                default:
                    break;
            }
            
            break;

        case 'edit':
            switch(app.currentPage){
                case 'rooms':
                    callbackFunc = function(){
                        validateInput(app, app.smartHouses);
                    };
                    break;
        
                case 'devices':
                    callbackFunc = function(){
                        validateInput(app, app.breadcrumbs[app.breadcrumbs.length - 2].rooms);
                    };
                    break;
        
                case 'options':
                    callbackFunc = function(){
                        validateInput(app, app.breadcrumbs[app.breadcrumbs.length - 2].devices);
                    };
                    break;
                
                default:
                    break;
            }
            break;

        default:
            break;
    }
    modalInput.addEventListener('input', callbackFunc);
}