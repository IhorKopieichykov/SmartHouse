export function renderStart(container, app){
    let content = '';
    container.innerHTML = content;
    content = `
        <div class="smartphone__screen-statebar statebar">
            <div class="statebar__left">
                <div class="statebar__time">21:48</div>
            </div>
            <div class="statebar__right">
                <div class="statebar__network">
                    <p></p>
                    <p></p>
                    <p></p>
                    <p></p>
                </div>
                <div class="statebar__wifi"><st class="st_wifi"></st></div>
                <div class="statebar__battery">
                    <div class="statebar__battery_fill"></div>
                    <div class="statebar__battery_value">54</div>
                    <p></p>                           
                </div>
            </div>
        </div>
        <div class="smartphone__screen-touchscreen touchscreen">  
            <div class="touchscreen__smarthouse_app sh_app">
                <div class="sh_app__header preview">
                    <img class="sh_app__logo" src="./images/smartHouseApp/houses/house-512.png" alt="logo">
                    <div class="sh_app__title">Smart House</div>
                </div>
                <div class="sh_app__body">
                    <div class="sh_app__body-header">
                        <nav class="sh_app__nav nav">
                            <button class="nav__back"><div></div></button>
                        </nav>
                        <div class="sh_app__pagename" id="pagename"></div>
                        <div class="sh_app__dropdown dropdown">
                            <button class="dropdown__btn">...</button>
                            <menu class="dropdown__menu">
                                <ul class="dropdown__list">                                                 
                                </ul>
                            </menu>                                       
                        </div>
                    </div>
                    
                    <div class="sh_app__items">
                    </div>  
                    <div class="sh_app__device device">
                        
                    </div>

                    <div class="sh_app__additem show"></div>
                    <div class="sh_app__scrollup"><me class="me_arrow-up"></me></div>
                </div>            
            
                <div class="sh_app__modal modal"></div>
            </div>                                               
        </div>`;
    container.insertAdjacentHTML('beforeend', content);    
}
