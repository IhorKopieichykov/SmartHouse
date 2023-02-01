
function selectCurrentOption(app){
    const itemType = document.querySelector('#itemType');
    const currentItem = app.breadcrumbs.at(-1);
    for (let i = 0; i < itemType.children.length; i++) {
        const option = itemType.children[i];
        if (option.value === currentItem.type) {
            option.setAttribute('selected', 'true');
        }
    }
}

export function renderTypeSelection(app, page, block) {    
    const modalType = page.modal.dataset.modalType;
    let content = '';
    switch (modalType) {
        case 'add':
            switch (app.currentPage) {
                case 'rooms':
                    content = `
                        <option value="hall">Hall</option>
                        <option value="bedroom">Bedroom</option>  
                        <option value="living_room">Living room</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="bath">Bathroom</option>
                        <option value="other">Other</option>`;
                    block.insertAdjacentHTML('beforeend', content);
                    break;
        
                case 'devices':
                    content = `
                        <option value="lamp">Lamp</option>
                        <option value="conditioner">Conditioner</option>
                        <option value="humidifier">Humidifier</option>`;
                    block.insertAdjacentHTML('beforeend', content);
                    break;
        
                default:
                    break;
            }
            break;

        case 'edit':
            switch (app.currentPage) { 
                case 'devices':
                    content = `
                        <option value="hall">Hall</option>
                        <option value="bedroom">Bedroom</option>  
                        <option value="living_room">Living room</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="bath">Bathroom</option>
                        <option value="other">Other</option>`;
                    block.insertAdjacentHTML('beforeend', content);
                    break;
        
                default:
                    break;
            }
            selectCurrentOption(app);
            break;

        case 'delete':        
            break;
    
        default:
            break;
    }    
}
