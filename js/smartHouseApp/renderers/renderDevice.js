import {lamp} from "../devices_functions/lamp.js";
import {conditioner} from "../devices_functions/conditioner.js"
import {humidifier} from "../devices_functions/humidifier.js";

export function renderDevice(app, page){
    let content = '';
    page.deviceBlock.innerHTML = content;
    const currentDevice = app.breadcrumbs[app.breadcrumbs.length - 1];
    switch (currentDevice.type) {
        case 'lamp':
            content = `
                <div class="device__header">
                    <div class="device__header_picture">
                        <de class="de_lamp device__header_img"></de> 
                    </div>
                    <div class="device__header_options">
                        <div class="device__header_option header_option state-option">
                            <div class="header_option__label">On/Off</div>
                            <div class="header_option__value">
                                <div class="header_option__switch">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="device__options">                    
                    <div class="device__options_option option">
                        <div class="option__title">Color</div>
                        <div class="option__value">
                            <div class="option__color_picker" id="color_picker"></div>
                        </div>
                    </div>
                </div>`;   
                page.deviceBlock.insertAdjacentHTML('beforeend', content);
                lamp(app, page);   
            break;

        case 'conditioner':
            content = `
                <div class="device__header">
                    <div class="device__header_picture">
                        <de class="de_fan device__header_img"></de> 
                    </div>
                    <div class="device__header_options">
                        <div class="device__header_option header_option state-option">
                            <div class="header_option__label">On/Off</div>
                            <div class="header_option__value">
                                <div class="header_option__switch">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="device__options">
                    <div class="device__options_sliders sliders">
                        <div class="sliders__slider slider" data-option="temperature" data-minvalue="16" data-maxvalue="32" data-char="°C">
                            <div class="slider__title">Temperature</div>
                            <div class="slider__bar">
                                <div class="slider__bar_fill"></div>
                                <div class="slider__bar_value">100%</div>                               
                            </div>                                
                        </div>
                        <div class="sliders__slider slider" data-option="speed" data-minvalue="0" data-maxvalue="100" data-char="%">
                            <div class="slider__title">Speed</div>
                            <div class="slider__bar">
                                <div class="slider__bar_fill"></div> 
                                <div class="slider__bar_value">100%</div>                                     
                            </div>                                
                        </div>
                    </div> 
                    <div style="display: none;" id="color_picker"></div>                                     
                </div>`;   
                page.deviceBlock.insertAdjacentHTML('beforeend', content);
                conditioner(app, page);   
            break;

        case 'humidifier':
            content = `
                <div class="device__header">
                    <div class="device__header_picture">
                        <de class="de_humidifier_off device__header_img"></de> 
                        <div class="device__header_humid_animation">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div class="device__header_options">
                        <div class="device__header_option header_option state-option">
                            <div class="header_option__label">On/Off</div>
                            <div class="header_option__value">
                                <div class="header_option__switch">
                                    <div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="device__options">
                    <div class="device__options_sliders sliders">
                        <div class="sliders__slider slider" id="water_slider" data-option="water" data-minvalue="0" data-maxvalue="100" data-char="%">
                            <div class="slider__title">Water level</div>
                            <div class="slider__bar">
                                <div class="slider__bar_fill"></div>
                                <div class="slider__bar_value">100%</div>                               
                            </div>                                
                        </div>
                        <div class="sliders__slider slider" data-option="humidity" data-minvalue="30" data-maxvalue="70" data-char="%">
                            <div class="slider__title">Humidity</div>
                            <div class="slider__bar">
                                <div class="slider__bar_fill"></div> 
                                <div class="slider__bar_value">100%</div>                                     
                            </div>                                
                        </div>
                    </div>  
                    <div class="device__options_option option">
                        <button class="option__button" id="add_water">Add water 🌢</button>
                    </div>                                  
                </div>`;   
                page.deviceBlock.insertAdjacentHTML('beforeend', content);
                humidifier(app, page);   
            break;
    
        default:
            break;
    }
    
}