import { addCloseListeners, addOkModalBtnListener } from "../modules/modal_window.js";

export function renderOffDeviceModal(app, page) {
    page.modal.dataset.modalType = 'off';
    let content = '';
    page.modal.textContent = content;
    switch (app.currentPage) {
        case 'houses':
            content = `
                <div class="modal__window">
                    <div class="modal__content">
                        <div class="modal__header">
                            <div class="modal__title">Turn off all devices</div>
                            <button class="modal__button-close close-modal">✖</button>
                        </div>
                        <div class="modal__body">
                            <form action="" onsubmit="return false;" id="modal__form" class="modal__form">  
                                <p class="modal__message">Are you sure you want to <span id="red">turn off</span> all devices?</p>
                                <div class="modal__buttons">
                                    <button class="modal__button modal__button_cancel close-modal" type="reset" form="modal__form">Cancel</button>
                                    <button class="modal__button modal__button_ok" form="modal__form">Yes, sure</button>
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
                            <div class="modal__title">Turn off all devices</div>
                            <button class="modal__button-close close-modal">✖</button>
                        </div>
                        <div class="modal__body">
                            <form action="" onsubmit="return false;" id="modal__form" class="modal__form">                                
                                <p class="modal__message">Are you sure you want to <span id="red">turn off</span> all devices in the <span id="purple">${app.breadcrumbs[app.breadcrumbs.length - 1].name}</span> house?</p>
                                <div class="modal__buttons">
                                    <button class="modal__button modal__button_cancel close-modal" type="reset" form="modal__form">Cancel</button>
                                    <button class="modal__button modal__button_ok" form="modal__form">Yes, sure</button>
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
                            <div class="modal__title">Turn off all devices</div>
                            <button class="modal__button-close close-modal">✖</button>
                        </div>
                        <div class="modal__body">
                            <form action="" onsubmit="return false;" id="modal__form" class="modal__form">                                
                                <p class="modal__message">Are you sure you want to <span id="red">turn off</span> all devices in the <span id="purple">${app.breadcrumbs[app.breadcrumbs.length - 1].name}</span> room?</p>
                                <div class="modal__buttons">
                                    <button class="modal__button modal__button_cancel close-modal" type="reset" form="modal__form">Cancel</button>
                                    <button class="modal__button modal__button_ok" form="modal__form">Yes, sure</button>
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
    addOkModalBtnListener(app, page);
}