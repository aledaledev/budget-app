"use strict";
//casteamos elementos para transformarlos
const addButton = document.getElementById("button-add");
const inputTitle = document.getElementById("input-title");
const inputPrice = document.getElementById("input-price");
const inputCurrency = document.getElementById("input-select");
const changeCurrencyButton = document.getElementById("button-currency");
const expenses = new Expenses("ARS");
$('display-currency').innerHTML = expenses.getCurrency();
$("display-total").textContent = expenses.getTotal();
changeCurrencyButton.addEventListener('click', e => {
    expenses.changeCurrency();
    $('display-currency').innerHTML = expenses.getCurrency();
    $("display-total").textContent = expenses.getTotal();
});
//ya no manejamos valores estaticos, ts no esta seguro de los nombres que manejamos
//!.-> estamos seguros de que existe
addButton.addEventListener("click", (e) => {
    if (inputTitle.value !== "" &&
        inputPrice.value !== "" &&
        !isNaN(parseFloat(inputPrice.value))) {
        const title = inputTitle.value;
        const price = parseFloat(inputPrice.value);
        const currency = inputCurrency.value;
        expenses.add({
            title: title,
            price: {
                number: price,
                currency: currency,
            },
        });
        render();
    }
    else {
        alert("Complete form");
    }
});
function render() {
    let html = "";
    expenses.getItems().forEach((item) => {
        const { id, title, price } = item;
        const { number, currency } = price;
        html += `
        <tr>
          <th class="align-middle" scope="row">${title}</th>
          <td class="align-middle">${currency} ${number}</td>
          <td class="text-end"><button type="button" class="delete btn btn-danger" data-id="${id}"><i class="bi bi-trash"></i></button></td>
        </tr>`;
    });
    $("items").innerHTML = html;
    $("display-total").textContent = expenses.getTotal();
    $$(".delete").forEach((button) => {
        button.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            expenses.remove(id); //parseInt(id!)
            render();
        });
    });
    inputTitle.value = "";
    inputPrice.value = "";
}
function $(selector) {
    return document.getElementById(selector);
}
function $$(selector) {
    return document.querySelectorAll(selector);
}
