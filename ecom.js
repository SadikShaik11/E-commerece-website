//opening cart

window.addEventListener('DOMContentLoaded', (event) => {
    //created a form in server js so here i added post
    axios.post('http://localhost:4000/product').then((result) => {

        const products = result.data.products
        console.log(products);
        const music = document.getElementById('music-content')

        const element = `
           <div id="${products.id}">
           <h3>${products.name}</h3>
           <div class="image-container">
               <img class="prod-images" src="${products.image}" alt="">
           </div>
           <div class="prod-details">
               <span>$<span>${products.price}</span></span>
         <button class="shop-item-button" type="button" id="Button1">ADD TO CART</button>
           `
        music.innerHTML += element

    }).catch((err) => {
        console.log(err);
    });
});



const Open_cart = document.getElementById("openCart");
Open_cart.addEventListener('click', opening_cart);
const ButtonBottom = document.getElementById('bottombutton');
ButtonBottom.addEventListener('click', opening_cart)

function opening_cart() {
    const cart_id = document.getElementById('cart');
    cart_id.style.display = 'block';
}

//cancelling cart

const cancel_cart = document.getElementById('cancel');
cancel_cart.addEventListener('click', closeCart);
function closeCart() {
    const cart_id = document.getElementById('cart');
    cart_id.style.display = 'none';
}

//adding item to cart 
const parentContainer = document.getElementById('allcontent');

parentContainer.addEventListener('click', (event) => {

    if (event.target.className == 'shop-item-button') {

        const id = event.target.parentNode.parentNode.id;
        const name = document.querySelector(`#${id} h3`).innerText;
        const image = document.querySelector(`#${id} img`).src;
        const price = event.target.parentNode.firstElementChild.firstElementChild.innerText;

        axios.post('http://localhost:4000/cart', {
            id: ` ${id}`,
            name: `${name}`,
            image: `${image}`,
            price: `${price}`
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
});
//adding to cart 
function AddTocart() {
    let name;
    let id;
    let price;
    let img;
    axios.get('http://localhost:4000/cart').then((result) => {
        id = result.products.id;
        name = result.products.name;
        image = result.products.image;
        price = result.products.price;
    }).catch((err) => {
        console.log(err);
    });
    const itemlist = document.getElementById('itemlist');
    const list = document.createElement('li');
    list.className = id;
    itemlist.appendChild(list)
    list.textContent = name

    const pricelist = document.getElementById('pricelist');
    const plist = document.createElement('li');
    plist.id = 'price'
    plist.className = id;
    pricelist.appendChild(plist);
    plist.textContent = price;

    const quatity = document.getElementById('quantity');
    const qun = document.createElement('li');
    qun.className = id;
    const cancel = document.createElement('button');
    cancel.appendChild(document.createTextNode('X'))
    cancel.id = 'remove'
    quatity.appendChild(qun);
    qun.textContent = '1  ';
    qun.appendChild(cancel)
    total(price)

    sendnotification(name)
}


function sendnotification(name) {
    const di = document.getElementById('di');
    const div = document.createElement('div');
    div.classList.add('msg');
    div.innerText = `your item ${name}was added to cart`
    di.appendChild(div);

    setTimeout(() => {
        div.remove();
    }, 4000)
}

// updating total
function total(price) {

    tval = document.getElementById('total-value').textContent;
    const total = document.getElementById('total-value')
    const sum = parseFloat(price) + parseFloat(tval);
    total.textContent = sum;
}

const cart = document.getElementById('cartitems');

cart.addEventListener('click', (event) => {

    if (event.target.id == 'remove') {
        const cname = event.target.parentNode.className;
        let price = 0;
        let elements = document.querySelectorAll(`.${cname}`)

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].id == 'price') {
                price = elements[i].textContent;
            }
        }
        removeFromCart(cname)
        subtraction(price);
    }
}
)

//removing from cart
function removeFromCart(cname) {
    const item = document.getElementById('itemlist')
    const quantity = document.getElementById('quantity');
    const prices = document.getElementById('pricelist')
    item.remove(cname);
    quantity.remove(cname);
    prices.remove(cname);

}
//updating total
function subtraction(price) {
    const total = document.getElementById('total-value');
    const tval = document.getElementById('total-value').textContent;
    const new_total = parseFloat(tval) - parseFloat(price);
    total.textContent = new_total;
}



