import { addCloseListeners, addOkModalBtnListener, addInputListener } from "../modules/modal_window.js";
import { renderTypeSelection } from "./renderTypeSelection.js";

export function renderNewItemModal(app, page) {
    page.modal.dataset.modalType = 'add';  
    page.modal.innerHTML = '';
    let content = '';
    switch (app.currentPage) {
        case 'houses':            
            content = `
                <div class="modal__window">
                    <div class="modal__content">
                        <div class="modal__header">
                            <div class="modal__title">Add house</div>
                            <button class="modal__button-close close-modal">✖</button>
                        </div>
                        <div class="modal__body">
                            <form action="" onsubmit="return false;" id="modal__form" class="modal__form">
                                <label class="modal__label modal__label-name" for="modal_input">Enter name below</label>
                                <input class="modal__input" id="modal_input" value="" minlength="1" maxlength="20" title="Enter name here" type="text" placeholder="Example: House1">
                                <div class="modal__input_length"><span id="input_length_counter">0</span>/20</div>
                                <p class="modal__input-error"></p>
                                <div class="modal__buttons">
                                    <button class="modal__button modal__button_cancel close-modal" type="reset" form="modal__form">Cancel</button>
                                    <button class="modal__button modal__button_ok" form="modal__form">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;
            break;

        case 'rooms':
            content = `
                <div class="modal__window">
                    <div class="modal__content">
                        <div class="modal__header">
                            <div class="modal__title">Add room</div>
                            <button class="modal__button-close close-modal">✖</button>
                        </div>
                        <div class="modal__body">
                            <form action="" onsubmit="return false;" id="modal__form" class="modal__form">
                                <div class="modal__type-selection">
                                    <label class="modal__label modal__label-select" for="itemType">Select type</label>
                                    <select name="itemType" id="itemType" class="modal__item-type" form="modal__form">
                                    </select>
                                </div>
                                <label class="modal__label modal__label-name" for="modal_input">Enter name below</label>
                                <input class="modal__input" id="modal_input" value="" minlength="1" maxlength="20" title="Enter name here" type="text" placeholder="Example: Living room">
                                <div class="modal__input_length"><span id="input_length_counter">0</span>/20</div>
                                <p class="modal__input-error"></p>
                                <div class="modal__buttons">
                                    <button class="modal__button modal__button_cancel close-modal" type="reset" form="modal__form">Cancel</button>
                                    <button class="modal__button modal__button_ok" form="modal__form">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;
            break;

        case 'devices':
            content = `
                <div class="modal__window">
                    <div class="modal__content">
                        <div class="modal__header">
                            <div class="modal__title">Add room</div>
                            <button class="modal__button-close close-modal">✖</button>
                        </div>
                        <div class="modal__body">
                            <form action="" onsubmit="return false;" id="modal__form" class="modal__form">
                                <div class="modal__type-selection">
                                    <label class="modal__label modal__label-select" for="itemType">Select type</label>
                                    <select name="itemType" id="itemType" class="modal__item-type" form="modal__form">
                                    </select>
                                </div>
                                <label class="modal__label modal__label-name" for="modal_input">Enter name below</label>
                                <input class="modal__input" id="modal_input" value="" minlength="1" maxlength="20" title="Enter name here" type="text" placeholder="Example: Living room">
                                <div class="modal__input_length"><span id="input_length_counter">0</span>/20</div>
                                <p class="modal__input-error"></p>
                                <div class="modal__buttons">
                                    <button class="modal__button modal__button_cancel close-modal" type="reset" form="modal__form">Cancel</button>
                                    <button class="modal__button modal__button_ok" form="modal__form">Add</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;
            break;
 
        default:
            break;
    }
    page.modal.insertAdjacentHTML('beforeend', content);    
    renderTypeSelection(app, page, document.querySelector('.modal__item-type'));
    addCloseListeners(page);
    addOkModalBtnListener(app, page);
    addInputListener(app, page);
}