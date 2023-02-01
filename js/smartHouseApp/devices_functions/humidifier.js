import {saveItemsInLocalStorage} from "../modules/local_storage.js";
import {listenSliderChanges, renderSlider} from "../modules/device_slider.js";

export function humidifier(app, page){
    const humidifier = app.breadcrumbs[app.breadcrumbs.length - 1]; 
    const state_switch = document.querySelector('.header_option__switch'); 
    const picture = document.querySelector('.device__header_picture');
    const icon = document.querySelector('.de_humidifier_off.device__header_img');
    const waterSlider = document.querySelector('#water_slider');
    
    function decreasingLevelOfwater(){
        renderSlider(waterSlider, humidifier.water);
        if(humidifier.state && humidifier.water > 0){            
            humidifier.water -= 1;
        }
    }
    let decreasingWaterLevelInterval = setInterval(decreasingLevelOfwater, 1000);

    function turnOnAnimation(humidity) {
        let duration = 0.4 /(humidity / 100);
        const animationBlock = document.querySelector('.device__header_humid_animation');
        animationBlock.style.display = 'flex';
        animationBlock.style.animation = `humid_animation ${duration}s ease-out infinite`;
        clearInterval(decreasingWaterLevelInterval);
        decreasingWaterLevelInterval = setInterval(decreasingLevelOfwater, duration * 1000 * 2);
    }
    function turnOffAnimation() {
        const animationBlock = document.querySelector('.device__header_humid_animation');
        animationBlock.style.display = 'none';
        animationBlock.style.animation = 'none';
    }

    if(humidifier.state){
        state_switch.classList.remove('off');
        state_switch.classList.add('on');
        if (humidifier.water > 0) {
            turnOnAnimation(humidifier.humidity);
        } else {
            turnOffAnimation();
        }
    } else {
        state_switch.classList.remove('on');
        state_switch.classList.add('off');
        turnOffAnimation();
    }

    state_switch.addEventListener('click', function(){        
        if (state_switch.classList.contains('on')) {
            humidifier.state = false;
            state_switch.classList.remove('on');
            state_switch.classList.add('off'); 
            icon.style.color = "#000";       
            turnOffAnimation();
        } else {
            humidifier.state = true;   
            state_switch.classList.remove('off');
            state_switch.classList.add('on');
            icon.style.color = "#FFF"; 
            if (humidifier.water > 0) {
                turnOnAnimation(humidifier.humidity);
            } else {
                turnOffAnimation();
            }
        }
    });  

    const sliders = document.querySelectorAll('.slider');    
    sliders.forEach((slider) => {
        switch (slider.dataset.option) {
            case "water":
                slider.children[1].classList.add('unactive');
                renderSlider(slider, humidifier.water);  
                break;

            case "humidity":
                listenSliderChanges(humidifier, slider);
                break;
        
            default:
                break;
        }
    });

    function slidersMutationCallback(mutationList, observer){
        const lastTarget = mutationList[mutationList.length -1].target;
        switch (lastTarget.dataset.option) {
            case "water":
                break;

            case "humidity":
                if (humidifier.state && humidifier.water > 0) {
                    turnOnAnimation(humidifier.humidity);
                } else {
                    turnOffAnimation();
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

    function addWater() {
        let water = humidifier.water;
        water += 25;
        if (water > 100) {
            water = 100;
        }
        humidifier.water = water;
        renderSlider(waterSlider, humidifier.water);
    }
    document.querySelector('#add_water').addEventListener('click', addWater);
}
