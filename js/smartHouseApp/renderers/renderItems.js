const room_img_urls = {
    'hall': './images/smartHouseApp/rooms/hall.png',
    'bedroom': './images/smartHouseApp/rooms/bedroom.png',
    'living_room': './images/smartHouseApp/rooms/living_room.png',
    'kitchen': './images/smartHouseApp/rooms/kitchen.png',
    'bath': './images/smartHouseApp/rooms/bath.png',
    'other': './images/smartHouseApp/rooms/other.png',
};

export function renderItems(block, itemsArray, currentPage) {
    block.innerHTML = '';
    let content = '';    
    switch (currentPage) {
        case 'houses':
            block.dataset.itemsType = 'houses';
            for (let i = 0; i < itemsArray.length; i++) {                               
                content = `
                <div class="sh_app__item item" data-item-name="${itemsArray[i].name}" data-item-type="house">
                    <img src="./images/smartHouseApp/houses/house-256.png" alt="house_icon" class="item__logo">
                    <div class="item__title">${itemsArray[i].name}</div>
                </div>  
                `;                
                block.insertAdjacentHTML('beforeend', content);
            }
            break;

        case 'rooms':
            block.dataset.itemsType = 'rooms';
            for (let i = 0; i < itemsArray.length; i++) {
                content = `
                <div class="sh_app__item item" data-item-name="${itemsArray[i].name}" data-item-type="room">
                    <img src="${room_img_urls[itemsArray[i].type]}" alt="room_icon" class="item__logo">
                    <div class="item__title">${itemsArray[i].name}</div>
                </div>  
                `;
                block.insertAdjacentHTML('beforeend', content);
            }
            break;

        case 'devices':
            block.dataset.itemsType = 'devices';
            for (let i = 0; i < itemsArray.length; i++) {
                content = `
                <div class="sh_app__item item" data-item-name="${itemsArray[i].name}" data-item-type="device">
                    <de class="${"de_off_on " + (itemsArray[i].state ? "on" : "off")}"></de>
                    <de class="${"item_icon " + "de_" + itemsArray[i].type + (itemsArray[i].state ? "_on" : "_off")}"></de>
                    <div class="item__title">${itemsArray[i].name}</div>
                </div>  
                `;
                block.insertAdjacentHTML('beforeend', content);
            }
            break;       

        default:
            break;
    }

}
