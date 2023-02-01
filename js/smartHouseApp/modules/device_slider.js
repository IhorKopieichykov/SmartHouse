export function listenSliderChanges(currentItem, slider){
    const slider_bar = slider.children[1];
    const slider_fill = slider_bar.firstElementChild;
    
    const slider_bar_style = getComputedStyle(slider_bar);
    const slider_bar_height = Number(slider_bar_style.getPropertyValue("height").slice(0, -2));
    const slider_bar_borderWidth = Number(slider_bar_style.getPropertyValue("border-width").slice(0, -2));
    const slider_fill_style = getComputedStyle(slider_fill);
    const slider_fill_minHeight = Number(slider_fill_style.getPropertyValue("min-height").slice(0, -2));
    const slider_fill_maxHeight = slider_bar_height - slider_bar_borderWidth * 2;


    const MAX_FILL_HEIGHT = slider_fill_maxHeight;
    const MIN_FILL_HEIGHT = slider_fill_minHeight;
    const RANGE_FILL_HEIGHT = MAX_FILL_HEIGHT - MIN_FILL_HEIGHT;
    const PERCENT_FILL_HEIGHT = RANGE_FILL_HEIGHT / 100;
    const MIN_VALUE = Number(slider.dataset.minvalue) || 0;
    const MAX_VALUE = Number(slider.dataset.maxvalue) || 100;
    const VALUE_CHAR = slider.dataset.char || "%";
    const CURRENT_PERCENT = (currentItem[slider.dataset.option]-MIN_VALUE)/(MAX_VALUE - MIN_VALUE)*100;

    renderSlider(slider, CURRENT_PERCENT, MIN_VALUE, MAX_VALUE, VALUE_CHAR);
    let mouseover = false;
    let mousedown = false;
    let startYPosition = 0;
    let change = 0;
    let percentMove = 0;
    let slider_fill_percent = 0;    

    slider_bar.onmouseover = () => mouseover = true;
    slider_bar.onmouseout = () => mouseover = false;
    slider_bar.onmouseup = () => mousedown = false;
    window.addEventListener('mouseup', (e) => {
        mousedown = false;        
    });
    slider_bar.onmousedown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        mousedown = true;
        startYPosition = e.pageY; 
        change = 0;
        const slider_fill_style = getComputedStyle(slider_fill);
        const slider_fill_height = Number(slider_fill_style.getPropertyValue("height").slice(0, -2));
        slider_fill_percent = slider_fill_height / PERCENT_FILL_HEIGHT;   
    };    
    slider_bar.addEventListener('mousemove', (e) => {
        if (mouseover && mousedown) {            
            change = (startYPosition - e.pageY);           
            percentMove = change / PERCENT_FILL_HEIGHT;            
            const result_percent = slider_fill_percent + percentMove;
            if (result_percent >= 0 && result_percent <= 100.99) {
                renderSlider(slider, result_percent, MIN_VALUE, MAX_VALUE, VALUE_CHAR);
                const FINISH_SLIDER_VALUE = Math.round(MIN_VALUE + result_percent * (MAX_VALUE-MIN_VALUE)/100);            
                currentItem[slider.dataset.option] = FINISH_SLIDER_VALUE;
            }               
        }
    });

    // TOUCH EVENTS    
    slider_bar.addEventListener('touchend', () => {
        mousedown = false;
        mouseover = false;
    });
    slider_bar.addEventListener('touchcancel', () => {
        mousedown = false;
        mouseover = false;
    });
    slider_bar.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        mouseover = true;
        mousedown = true;
        startYPosition = e.touches[0].pageY; 
        change = 0;
        const slider_fill_style = getComputedStyle(slider_fill);
        const slider_fill_height = Number(slider_fill_style.getPropertyValue("height").slice(0, -2));
        slider_fill_percent = slider_fill_height / PERCENT_FILL_HEIGHT; 
    });
    slider_bar.addEventListener('touchmove', (e) => {
        if (mouseover && mousedown) {            
            change = (startYPosition - e.touches[0].pageY);           
            percentMove = change / PERCENT_FILL_HEIGHT;            
            const result_percent = slider_fill_percent + percentMove;
            if (result_percent >= 0 && result_percent <= 100.99) {
                renderSlider(slider, result_percent, MIN_VALUE, MAX_VALUE, VALUE_CHAR);
                const FINISH_SLIDER_VALUE = Math.round(MIN_VALUE + result_percent * (MAX_VALUE-MIN_VALUE)/100);            
                currentItem[slider.dataset.option] = FINISH_SLIDER_VALUE;
            }               
        }
    });    
}

export function renderSlider(slider, percent, min = 0, max = 100, char = "%"){
    if (percent > 100 || percent < 0) {
        return;
    }
    const slider_bar = slider.children[1];
    const slider_fill = slider_bar.firstElementChild;
    const slider_value = slider_bar.lastElementChild;

    const slider_bar_style = getComputedStyle(slider_bar);
    const slider_bar_height = Number(slider_bar_style.getPropertyValue("height").slice(0, -2));
    // const slider_bar_borderWidth = Number(slider_bar_style.getPropertyValue("border-width").slice(0, -2));
    const slider_fill_style = getComputedStyle(slider_fill);
    const slider_fill_minHeight = Number(slider_fill_style.getPropertyValue("min-height").slice(0, -2));
    const slider_fill_maxHeight = slider_bar_height;


    const MAX_FILL_HEIGHT = slider_fill_maxHeight;
    const MIN_FILL_HEIGHT = slider_fill_minHeight;
    const RANGE_FILL_HEIGHT = MAX_FILL_HEIGHT - MIN_FILL_HEIGHT;
    const PERCENT_FILL_HEIGHT = RANGE_FILL_HEIGHT / 100;
    const FINISH_FILL_HEIGHT = MIN_FILL_HEIGHT + PERCENT_FILL_HEIGHT * percent;
    
    if (FINISH_FILL_HEIGHT <= MAX_FILL_HEIGHT && FINISH_FILL_HEIGHT >= MIN_FILL_HEIGHT) {
        slider_fill.style.height = FINISH_FILL_HEIGHT + "px";
        const FINISH_SLIDER_VALUE = Math.round(min + percent * (max-min)/100);
        slider_value.textContent = `${FINISH_SLIDER_VALUE} ` + char;
        slider.dataset.sliderValue = FINISH_SLIDER_VALUE;
    }
}