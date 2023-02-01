import {renderItems} from './renderItems.js';
import {renderDevice} from './renderDevice.js';



export function renderPage(app, page) {
    switch (app.currentPage) {
        case 'houses':
            page.navBlock.style.visibility = 'hidden';
            page.pageName.textContent = 'My houses';
            page.itemsBlock.style.display = 'flex';
            page.deviceBlock.style.display = 'none'; 
            page.addItemButton.classList.add('show');
            renderItems(page.itemsBlock, app.smartHouses, app.currentPage);
            page.addItemButton.textContent = '+ Add house';            
            break;

        case 'rooms':
            page.navBlock.style.visibility = 'visible';
            page.pageName.textContent = `${app.breadcrumbs[app.breadcrumbs.length - 1].name}`;
            page.itemsBlock.style.display = 'flex';
            page.deviceBlock.style.display = 'none'; 
            page.addItemButton.classList.add('show');
            renderItems(page.itemsBlock, app.breadcrumbs[app.breadcrumbs.length - 1].rooms, app.currentPage);
            page.addItemButton.textContent = '+ Add room';            
            break;

        case 'devices':
            page.navBlock.style.visibility = 'visible';
            page.pageName.textContent = `${app.breadcrumbs[app.breadcrumbs.length - 1].name}`;
            page.itemsBlock.style.display = 'flex';
            page.deviceBlock.style.display = 'none'; 
            page.addItemButton.classList.add('show');
            renderItems(page.itemsBlock, app.breadcrumbs[app.breadcrumbs.length - 1].devices, app.currentPage);
            page.addItemButton.textContent = '+ Add device';
            break;

        case 'options':
            page.navBlock.style.visibility = 'visible';
            page.pageName.textContent = `${app.breadcrumbs[app.breadcrumbs.length - 1].name}`;
            page.itemsBlock.style.display = 'none';            
            page.addItemButton.classList.remove('show');
            page.deviceBlock.style.display = 'flex'; 
            renderDevice(app, page);
            break;

        default:
            break;
    }
}
