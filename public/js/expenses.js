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
    getAll() {
        return this.items;
    }
}
class Expenses {
    constructor(currency) {
        this.id = "id" + Math.random().toString(16).slice(2);
        this.finalCurrency = currency;
        this.expenses = new ArrayList();
    }
    add(item) {
        this.expenses.add(item);
        return true;
    }
    getItems() {
        return this.expenses.getAll();
    }
    get(index) {
        return this.expenses.get(index);
    }
    getTotal() {
        const total = this.getItems().reduce((acc, item) => (acc += this.convertCurrency(item, this.finalCurrency)), 0);
        return `${this.finalCurrency} $${total.toFixed(2).toString}`;
    }
    convertCurrency(item, currency) {
        switch (item.cost.currency) {
            case "USD":
                switch (currency) {
                    case "ARS":
                        return item.cost.number * 290;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            case 'ARS':
                switch (currency) {
                    case "USD":
                        return item.cost.number / 290;
                        break;
                    default:
                        return item.cost.number;
                }
                break;
            default:
                return 0;
        }
    }
    remove(id) {
        throw new Error("Method not implemented.");
    }
}
