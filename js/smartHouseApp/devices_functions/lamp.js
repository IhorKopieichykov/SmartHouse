import { saveItemsInLocalStorage } from "../modules/local_storage.js";

export function lamp(app, page){
    const lamp = app.breadcrumbs[app.breadcrumbs.length - 1]; 
    const picture = document.querySelector('.device__header_picture');
    const icon = document.querySelector('.de_lamp');
    const state_switch = document.querySelector('.header_option__switch');  

    const colorPicker = new iro.ColorPicker('#color_picker', {
        borderWidth: 2,
        color: lamp.color,
        layout: [
            { 
              component: iro.ui.Wheel,
              options: {
                borderColor: '#B700FF',
                width: 170,
              }
            },
            { 
              component: iro.ui.Slider,
              options: {
                // can also be 'saturation', 'value', 'red', 'green', 'blue', 'alpha' or 'kelvin'
                sliderType: 'value',
                borderColor: '#B700FF',
                width: 170,
              }
            },
          ]
    });    
    document.querySelector('.IroSlider').insertAdjacentHTML('beforebegin', `<div class="option__title">Brightness</div>`)
    
    function turnOnLamp(color){
		lamp.color = color.rgbaString;
		lamp.state = true;
		icon.style.color = color.rgbaString;
		icon.style.textShadow = `0px 0px 20px ${color.rgbaString}`;
		picture.style.boxShadow = `inset 0px 0px 5px ${color.rgbaString}`;
		if (color.value < 50) {
			icon.style.textShadow = `none`;
			picture.style.boxShadow = `none`;
		}
    }

    function turnOffLamp(){
		lamp.state = false;
		icon.style.color = "#000";
		icon.style.textShadow = `none`;
		picture.style.boxShadow = `none`;
    }

    function colorListener(color){      
		turnOnLamp(color);
		saveItemsInLocalStorage(app);
    }

    if(lamp.state){
		state_switch.classList.remove('off');
        state_switch.classList.add('on');
		colorPicker.on(['color:init', 'color:change'], colorListener);
		colorPicker.color.value = 100;
    } else {
		state_switch.classList.remove('on');
        state_switch.classList.add('off');
		colorPicker.off(['color:init', 'color:change'], colorListener);      
		colorPicker.color.value = 0;
    }

    state_switch.addEventListener('click', function(){
		if (state_switch.classList.contains('on')) {
			lamp.state = false;        
			state_switch.classList.remove('on');
			state_switch.classList.add('off');
			turnOffLamp();
			colorPicker.off(['color:init', 'color:change'], colorListener);
			colorPicker.color.value = 0;
		} else if (state_switch.classList.contains('off')){
			state_switch.classList.remove('off');
			state_switch.classList.add('on');
			turnOnLamp(colorPicker.color)
			colorPicker.on(['color:init', 'color:change'], colorListener);
			colorPicker.color.value = 100;
		}
    })
}