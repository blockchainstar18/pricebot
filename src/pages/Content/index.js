import { PureComponent } from 'react';
import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

var formarray = []
var actionArray = []

function addToCart() {
    if (formarray.length == 0)
        document.location.replace('https://www.cdkeys.com/checkout/cart/')
    fetch(actionArray.pop(), {
        method: 'POST',
        headers: {
            'x-requested-with': 'XMLHttpRequest'
        },
        body: formarray.pop()
    }).then(
        () => {
            addToCart()
        }
    )
}


function findProducts() {
    const products = document.getElementsByClassName('product-item')

    for (let i = 0; i < products.length; i++) {
        console.log(JSON.parse(products[i].getAttribute('data-impression')))
        const product = products[i].getElementsByClassName('actions-primary')[0]
        console.log(product)
        if (product) {
            var input = product.getElementsByTagName('input')
            var form = product.getElementsByTagName('form')
            var action = form[0].getAttribute('action')
            var id = input[0].getAttribute('value')
            var uenc = input[1].getAttribute('value')
            var form_key = input[2].getAttribute('value')
            console.log(action, id, uenc, form_key)

            const formdata = new FormData()
            formdata.append('product', id)
            formdata.append('uenc', uenc)
            formdata.append('form_key', form_key)
            formarray.push(formdata)
            actionArray.push(action)

        }

    }
    addToCart()

}

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message.message === 'start') {
        findProducts()
    }
});