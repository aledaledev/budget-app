"use strict";
class ArrayList {
    constructor() {
        this.items = [];
    }
    //ts infiere que es un void
    add(item) {
        this.items.push(item);
    }
    get(index) {
        const item = this.items.filter((x, y) => y === index);
        if (item.length === 0)
            return null;
        return item[0];
    }
    createFrom(value) {
        this.items = [...value];
    }
    /*remove(id:string){
      this.items = this.items.filter(elem => elem.id!==id)
    }*/
    getAll() {
        return this.items;
    }
    existById(id) {
        return this.items.some(elem => elem.id === id);
    }
}
class Expenses {
    constructor(currency) {
        this.finalCurrency = currency;
        //contiene al array y sus propios metodos para modificarlo
        this.expenses = new ArrayList();
    }
    add(item) {
        this.expenses.add(Object.assign(Object.assign({}, item), { id: "id" + Math.random().toString(16).slice(2) }));
        return true;
    }
    getItems() {
        return this.expenses.getAll();
    }
    get(index) {
        return this.expenses.get(index);
    }
    getCurrency() {
        return `${this.finalCurrency}`;
    }
    changeCurrency() {
        if (this.finalCurrency === 'USD') {
            this.finalCurrency = 'ARS';
        }
        else {
            this.finalCurrency = 'USD';
        }
    }
    getTotal() {
        const total = this.getItems().reduce((acc, item) => (acc += this.convertCurrency(item, this.finalCurrency)), 0);
        return ` $${total.toFixed(2).toString()}`;
    }
    convertCurrency(item, currency) {
        switch (item.price.currency) {
            case "USD":
                switch (currency) {
                    case "ARS":
                        return item.price.number * 290;
                        break;
                    default:
                        return item.price.number;
                }
                break;
            case 'ARS':
                switch (currency) {
                    case "USD":
                        return item.price.number / 290;
                        break;
                    default:
                        return item.price.number;
                }
                break;
            default:
                return 0;
        }
    }
    remove(id) {
        //this.expenses.remove(id) 
        const items = this.getItems().filter(item => item.id !== id);
        this.expenses.createFrom(items);
        return true;
    }
}
