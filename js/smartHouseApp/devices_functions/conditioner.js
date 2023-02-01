import {saveItemsInLocalStorage} from "../modules/local_storage.js";
import {listenSliderChanges} from "../modules/device_slider.js";

export function conditioner(app, page){
    const conditioner = app.breadcrumbs[app.breadcrumbs.length - 1]; 
    const picture = document.querySelector('.device__header_picture');
    const icon = document.querySelector('.de_fan');
    const state_switch = document.querySelector('.header_option__switch');  
    
    const colorPicker = new iro.ColorPicker('#color_picker', {
        borderWidth: 2,
        color: "rgb(255, 255, 255)",
        layout: [
            { 
              component: iro.ui.Slider,
              options: {
                // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                sliderType: 'kelvin',
                minTemperature: 2000,
                maxTemperature: 11600,
                colors: [
                    'rgb(100%, 0, 0)', // pure red
                    'rgb(0, 0, 100%)', // pure blue
                ]
              }
            },
          ]
    });    

    function turnOnConditioner(){
        const fan = document.querySelector('.rotating');
        if (conditioner.speed) {
            fan.style.animationDuration = 30 / conditioner.speed + "s";
        } else {
            fan.style.animationDuration = 0 + "s";
        }
        colorPicker.color.kelvin = 11600 - (conditioner.temperature - 16) * 600;
        icon.style.color = colorPicker.color.rgbString;
    }

    if(conditioner.state){
        state_switch.classList.remove('off');
        state_switch.classList.add('on');
        icon.classList.add('rotating');
        turnOnConditioner();
    } else {
        state_switch.classList.remove('on');
        state_switch.classList.add('off');
        icon.classList.remove('rotating');
    }    
  
    state_switch.addEventListener('click', function(){
        if (state_switch.classList.contains('on')) {
            conditioner.state = false;
            state_switch.classList.remove('on');
            state_switch.classList.add('off');
            icon.classList.remove('rotating'); 
            icon.style.color = "#000";         
        } else {
            conditioner.state = true;
            state_switch.classList.remove('off');
            state_switch.classList.add('on');
            icon.classList.add('rotating');
            turnOnConditioner();
        }
    })

    const sliders = document.querySelectorAll('.slider');    
    sliders.forEach(slider => listenSliderChanges(conditioner, slider));

    function slidersMutationCallback(mutationList, observer){
        const lastTarget = mutationList[mutationList.length -1].target;
        const fan = document.querySelector('.rotating');
        switch (lastTarget.dataset.option) {
            case "temperature":
                if (state_switch.classList.contains('on')) {
                    colorPicker.color.kelvin = 11600 - (lastTarget.dataset.sliderValue - lastTarget.dataset.minvalue) * 600;
                    icon.style.color = colorPicker.color.rgbString;
                }                
                break;

            case "speed":
                if (fan) {
                    if (lastTarget.dataset.sliderValue > 0) {
                        fan.style.animationDuration = 30 / lastTarget.dataset.sliderValue + "s";
                    } else {
                        fan.style.animationDuration = 0 + "s";
                    }                    
                }
                break;
        
            default:
                break;
        }
        saveItemsInLocalStorage(app);
    }

    const observer = new MutationObserver(slidersMutationCallback);
    const observerOptions = {attributes: true};
    sliders.forEach(slider => observer.observe(slider, observerOptions));
}
