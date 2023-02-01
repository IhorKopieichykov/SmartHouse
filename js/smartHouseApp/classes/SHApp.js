export class SHApp {
    constructor(smartHouses = [], currentPage = 'houses', breadcrumbs = []) {
        this._smartHouses = smartHouses;
        this._currentPage = currentPage;
        this._breadcrumbs = breadcrumbs;
    }
    set smartHouses(array) {
        this._smartHouses = [];
        for (let i = 0; i < array.length; i++) {
            this._smartHouses[i] = array[i];
        }
    }
    get smartHouses() {
        return this._smartHouses;
    }
    set currentPage(currentPage) {
        this._currentPage = currentPage;
    }
    get currentPage() {
        return this._currentPage;
    }
    set breadcrumbs(breadcrumbs) {
        this._breadcrumbs = [];
        for (let i = 0; i < breadcrumbs.length; i++) {
            this._breadcrumbs[i] = breadcrumbs[i];
        }
    }
    get breadcrumbs() {
        return this._breadcrumbs;
    }
}