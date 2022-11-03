type Currency = 'USD'|'ARS'|'SOL' 

interface Price{
    number:number,
    currency:Currency
}

interface ExpenseItem{
    id:number,
    title:string,
    cost:Price
}

class Expenses{

}