import { SHApp } from './classes/SHApp.js';
import { getCurrentTime } from './modules/statebar.js';
import { renderPage } from "./renderers/renderPage.js";
import { renderNewItemModal } from "./renderers/renderNewItemModal.js";
import { showModal } from "./modules/modal_window.js"
import { renderDropDownMenu } from './renderers/renderDropDownMenu.js';
import { showDropDownMenu } from './modules/dropdown_menu.js';
import { copyItemsFromLocalStorage } from './modules/local_storage.js';
import { getCurrentItem } from './modules/helpers.js';
import { renderStart } from './renderers/renderStart.js';

export function smartHouseApp() {
    const app = new SHApp();

    const screen = document.querySelector('.smartphone__screen');
    renderStart(screen, app);

    const shHeader = document.querySelector('.sh_app__header');
    const shAppBody = document.querySelector('.sh_app__body');
    const pageName = document.querySelector('.sh_app__pagename');
    const navBlock = document.querySelector('.nav');
    const backBtn = document.querySelector('.nav__back');
    const itemsBlock = document.querySelector('.sh_app__items');
    const deviceBlock = document.querySelector('.sh_app__device');
    const addItemButton = document.querySelector('.sh_app__additem');
    const modal = document.querySelector('.modal');
    const dropDownBtn = document.querySelector('.dropdown__btn');
    const dropDownMenu = document.querySelector('.dropdown__menu');
    const scrollUpBtn = document.querySelector('.sh_app__scrollup');

    const page = {
        'shHeader': shHeader,
        'shAppBody': shAppBody,
        'pageName': pageName,
        'navBlock': navBlock,
        'backBtn': backBtn,
        'itemsBlock': itemsBlock,
        'deviceBlock': deviceBlock,
        'addItemButton': addItemButton,
        'modal': modal,
        'dropDownBtn': dropDownBtn,
        'dropDownMenu': dropDownMenu,
        'scrollUpBtn': scrollUpBtn,
    };

    copyItemsFromLocalStorage(app);

    renderPage(app, page);

    //STATEBAR
    const statebar_time = document.querySelector('.statebar__time');
    statebar_time.textContent = getCurrentTime();
    setInterval(() => {
        statebar_time.textContent = getCurrentTime();
    }, 100);    

    // RETURN TO HOMEPAGE
    setTimeout(() => {        
        shHeader.firstElementChild.onmouseover = () => {
            shHeader.firstElementChild.style.cursor = 'pointer';
            shHeader.firstElementChild.style.transform = 'scale(1.2)';
        };
        shHeader.firstElementChild.onmouseleave = () => {
            shHeader.firstElementChild.style.transform = 'scale(1)';
        };
        shHeader.firstElementChild.addEventListener('click', function(){
            app.breadcrumbs = [];
            app.currentPage = 'houses';
            renderPage(app, page);
        });
    }, 2700);
    

    // NAV BACK
    page.backBtn.addEventListener('click', function () {
        switch (app.currentPage) {
            case 'houses':
                break;

            case 'rooms':
                app.currentPage = 'houses';
                app.breadcrumbs.pop();
                console.log(app.breadcrumbs);
                renderPage(app, page);
                break;

            case 'devices':
                app.currentPage = 'rooms';
                app.breadcrumbs.pop();
                console.log(app.breadcrumbs);
                renderPage(app, page);
                break;

            case 'options':
                app.currentPage = 'devices';
                app.breadcrumbs.pop();
                console.log(app.breadcrumbs);
                renderPage(app, page);
                break;

            default:
                break;
        }
    });

    // DROPDOWN MENU
    page.dropDownBtn.addEventListener('click', function () {
        renderDropDownMenu(app, page);
        showDropDownMenu(page);
    });
    window.addEventListener('click', function (e) {
        if (!e.target.classList.contains('dropdown__btn') && !e.target.classList.contains('dropdown__menu') && !e.target.classList.contains('dropdown__list')) {
            if (page.dropDownMenu.classList.contains('show')) {
                page.dropDownMenu.classList.remove('show');
            }
        }
    });


    // ITEMS BLOCK
    page.itemsBlock.addEventListener('click', function (e) {
        let currentItemName = '';
        switch (page.itemsBlock.dataset.itemsType) {
            case 'houses':
                if (e.target.hasAttribute('data-item-name')) {
                    currentItemName = e.target.dataset.itemName;
                } else {
                    currentItemName = e.target.parentElement.dataset.itemName;
                }
                if (currentItemName) {
                    app.currentPage = 'rooms';
                    app.breadcrumbs.push(getCurrentItem(app.smartHouses, currentItemName));
                    console.log(app.breadcrumbs);
                    renderPage(app, page);
                }
                break;

            case 'rooms':
                if (e.target.hasAttribute('data-item-name')) {
                    currentItemName = e.target.dataset.itemName;
                } else {
                    currentItemName = e.target.parentElement.dataset.itemName;
                }
                if (currentItemName) {
                    app.currentPage = 'devices';
                    app.breadcrumbs.push(getCurrentItem(app.breadcrumbs[app.breadcrumbs.length - 1].rooms, currentItemName));
                    console.log(app.breadcrumbs);
                    renderPage(app, page);
                }
                break;

            case 'devices':
                if (e.target.hasAttribute('data-item-name')) {
                    currentItemName = e.target.dataset.itemName;
                } else {
                    currentItemName = e.target.parentElement.dataset.itemName;
                }
                if (currentItemName) {
                    app.currentPage = 'options';
                    app.breadcrumbs.push(getCurrentItem(app.breadcrumbs[app.breadcrumbs.length - 1].devices, currentItemName));
                    console.log(app.breadcrumbs);
                    renderPage(app, page);
                }
                break;

            default:
                break;
        }
    });


    // ADD NEW ITEM
    page.addItemButton.addEventListener('click', function () {
        renderNewItemModal(app, page);
        showModal(page.modal);
    });

    // SCROLL UP
    page.scrollUpBtn.addEventListener('click', function(){
        page.pageName.scrollIntoView({block: "center", behavior: "smooth"});
    });
    page.shAppBody.addEventListener('scroll', function() { 
        let scroll = page.shAppBody.scrollTop;
        page.shHeader.classList.remove('preview');
        if (scroll > 40) {
            page.addItemButton.classList.remove('show');
            page.scrollUpBtn.classList.remove('hide');
            page.scrollUpBtn.classList.add('show');
            page.shHeader.classList.remove('long');
            page.shHeader.classList.add('short');
            page.shAppBody.classList.remove('long');
            page.shAppBody.classList.add('short');
        } else {
            if (app.currentPage != 'options') {
                page.addItemButton.classList.add('show');
            }            
            if (page.scrollUpBtn.classList.contains('show')) {
                page.scrollUpBtn.classList.remove('show');
                page.scrollUpBtn.classList.add('hide');
            }   
            if (page.shHeader.classList.contains('short')) {
                page.shHeader.classList.remove('short');
                page.shHeader.classList.add('long');
            }
            if (page.shAppBody.classList.contains('short')) {
                page.shAppBody.classList.remove('short');
                page.shAppBody.classList.add('long');
            }
        }        
    });

}