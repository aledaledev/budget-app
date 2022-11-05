type Currency = "USD" | "ARS";

interface Price {
  number: number;
  currency: Currency;
}

interface ExpenseItem {
  id: number;
  title: string;
  cost: Price;
}

interface IExpenses {
    //no se implementa convertCurrency por que este ultimo es mas especifico
  expenses: ArrayList<ExpenseItem>;
  finalCurrency: Currency;
  add(item: ExpenseItem): boolean;
  get(index: number): ExpenseItem | null;
  getTotal(): string;
  remove(id: number): boolean;
}

class ArrayList<T> {
  //recibira elemento generico(se definira descpues)
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
  getAll(): T[] {
    return this.items;
  }
}

class Expenses implements IExpenses {
  expenses: ArrayList<ExpenseItem>;
  finalCurrency: Currency;

  private id: string = "id" + Math.random().toString(16).slice(2);

  constructor(currency: Currency) {
    this.finalCurrency = currency;
    this.expenses = new ArrayList<ExpenseItem>();
  }
  add(item: ExpenseItem): boolean {
    this.expenses.add(item);
    return true;
  }
  getItems(): ExpenseItem[] {
    return this.expenses.getAll();
  }
  get(index: number): ExpenseItem | null {
    return this.expenses.get(index);
  }
  getTotal(): string {
    const total = this.expenses.getAll().reduce(
        (acc, item) => (acc += this.convertCurrency(item, this.finalCurrency))
      ,0);
    return `${this.finalCurrency} $${total.toFixed(2).toString}`;
  }
  private convertCurrency(item: ExpenseItem, currency: Currency) {
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
        return 0
    }
  }
  remove(id: number): boolean {
    throw new Error("Method not implemented.");
  }
}
