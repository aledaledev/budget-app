type Currency = "USD" | "ARS";

interface Price {
  number: number;
  currency: Currency;
}

interface ExpenseItem {
  id?: string;
  title: string;
  price: Price;
}

interface IExpenses {
  //no se implementa convertCurrency por que este ultimo es mas especifico
  expenses: ArrayList<ExpenseItem>;
  finalCurrency: Currency;
  add(item: ExpenseItem): boolean;
  get(index: number): ExpenseItem | null;
  getTotal(): string;
  remove(id: string): boolean;
}

class ArrayList<T extends { id?: string }>  {
  //recibira elemento generico(se definira despues)
  private items: T[];
  constructor() {
    this.items = [];
  }
  //ts infiere que es un void
  add(item: T) {
    this.items.push(item);
  }
  get(index: number): T | null {
    const item: T[] = this.items.filter((x, y) => y === index);
    if (item.length === 0) return null;
    return item[0];
  }
  createFrom(value: T[]) {
    this.items = [...value];
  }
  /*remove(id:string){
    this.items = this.items.filter(elem => elem.id!==id)
  }*/
  getAll(): T[] {
    return this.items;
  }
  existById(id:string):boolean{
    return this.items.some(elem => elem.id===id)
  }
}

class Expenses implements IExpenses {
  expenses: ArrayList<ExpenseItem>;
  finalCurrency: Currency;

  constructor(currency: Currency) {
    this.finalCurrency = currency;
    //contiene al array y sus propios metodos para modificarlo
    this.expenses = new ArrayList<ExpenseItem>();
  }
  add(item: ExpenseItem): boolean {
    this.expenses.add({...item,id: "id" + Math.random().toString(16).slice(2)});
    return true;
  }
  getItems(): ExpenseItem[] {
    return this.expenses.getAll();
  }
  get(index: number): ExpenseItem | null {
    return this.expenses.get(index);
  }
  getCurrency():string{
    return `${this.finalCurrency}`
  }
  changeCurrency(){
    if(this.finalCurrency==='USD') {
      this.finalCurrency='ARS'
    } else {
      this.finalCurrency='USD'      
    }
  }
  getTotal(): string {
    const total = this.getItems().reduce(
        (acc, item) => (acc += this.convertCurrency(item, this.finalCurrency))
      ,0);
    return ` $${total.toFixed(2).toString()}`;
  }
  private convertCurrency(item: ExpenseItem, currency: Currency) {
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
        return 0
    }
  }
  remove(id: string): boolean {
    //this.expenses.remove(id) 
    const items = this.getItems().filter(item => item.id!==id)
    this.expenses.createFrom(items)
    return true
  }
}
