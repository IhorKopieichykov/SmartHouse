import { addCloseListeners, addOkModalBtnListener, addInputListener, showInputLength } from "../modules/modal_window.js";
import { renderTypeSelection } from "./renderTypeSelection.js";

export function renderEditItemModal(app, page) {
    let content = '';
    page.modal.innerHTML = content;
    page.modal.dataset.modalType = 'edit';
    switch (app.currentPage) {
        case 'rooms':
            content = `
                <div class="modal__window">
                    <div class="modal__content">
                        <div class="modal__header">
                            <div class="modal__title">Edit house</div>
                            <button class="modal__button-close close-modal">✖</button>
                        </div>
                        <div class="modal__body">
                            <form action="" onsubmit="return false;" id="modal__form" class="modal__form">                                
                                <label class="modal__label modal__label-name" for="modal_input">Enter name below</label>
                                <input class="modal__input" id="modal_input" value="${app.breadcrumbs[app.breadcrumbs.length - 1].name}" minlength="1" maxlength="20" title="Enter name here" type="text" placeholder="Example: House1">
                                <div class="modal__input_length"><span id="input_length_counter">0</span>/20</div>
                                <p class="modal__input-error"></p>
                                <div class="modal__buttons">
                                    <button class="modal__button modal__button_cancel close-modal" type="reset" form="modal__form">Cancel</button>
                                    <button class="modal__button modal__button_ok" form="modal__form">Save</button>
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
                            <div class="modal__title">Edit room</div>
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
                                <input class="modal__input" id="modal_input" value="${app.breadcrumbs[app.breadcrumbs.length - 1].name}" minlength="1" maxlength="20" title="Enter name here" type="text" placeholder="Example: Living room">
                                <div class="modal__input_length"><span id="input_length_counter">0</span>/20</div>
                                <p class="modal__input-error"></p>
                                <div class="modal__buttons">
                                    <button class="modal__button modal__button_cancel close-modal" type="reset" form="modal__form">Cancel</button>
                                    <button class="modal__button modal__button_ok" form="modal__form">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>`;
            break;

        case 'options':
            content = `
                <div class="modal__window">
                    <div class="modal__content">
                        <div class="modal__header">
                            <div class="modal__title">Edit device</div>
                            <button class="modal__button-close close-modal">✖</button>
                        </div>
                        <div class="modal__body">
                            <form action="" onsubmit="return false;" id="modal__form" class="modal__form">
                                
                                <label class="modal__label modal__label-name" for="modal_input">Enter name below</label>
                                <input class="modal__input" id="modal_input" value="${app.breadcrumbs[app.breadcrumbs.length - 1].name}" minlength="1" maxlength="20" title="Enter name here" type="text" placeholder="Example: Living room">
                                <div class="modal__input_length"><span id="input_length_counter">0</span>/20</div>
                                <p class="modal__input-error"></p>
                                <div class="modal__buttons">
                                    <button class="modal__button modal__button_cancel close-modal" type="reset" form="modal__form">Cancel</button>
                                    <button class="modal__button modal__button_ok" form="modal__form">Save</button>
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
    addCloseListeners(page);
    renderTypeSelection(app, page, document.querySelector('.modal__item-type'));
    
    const modalInputLength = document.querySelector('.modal__input_length');
    const modalInputCounter = document.querySelector('#input_length_counter');
    const modalInput = document.querySelector('.modal__input');
    showInputLength(modalInputLength, modalInputCounter, modalInput.value.length);  
    addOkModalBtnListener(app, page);
    addInputListener(app, page);
}