
let tovars = [
    {
        id: 0,
        image: 'https://www.tokyo-city.ru/images/interesno/Pitctca_-_natcionalnoe_italyanskoe_blyudo.jpg',
        name: 'Пепперони',
        price: 350
    },
    {
        id: 1,
        image: 'https://2b84737e-ff1f-4b4a-aa4b-896f3e6211c9.selcdn.net/product/65383536-6339-4132-b234-633965313232_1320_648',
        name: 'С ветчиной и грибами',
        price: 400
    },
    {
        id: 2,
        image: 'https://lamajo-pizza.ru/images/virtuemart/product/%D0%9C%D0%B0%D1%80%D0%B3%D0%B0%D1%80%D0%B8%D1%82%D0%B0%2001.jpg',
        name: 'Маргарита',
        price: 250
    },
    {
        id: 3,
        image: 'https://alanca.ru/wp-content/uploads/2020/04/osetinskiye-pirogi-s-myasom-fyddzhin-3.jpg',
        name: 'Фыдчин',
        price: 500
    },
    {
        id: 4,
        image: 'https://vilkin.pro/wp-content/uploads/2019/11/picca-chetire-sira-770x513.jpg',
        name: '4 сыра',
        price: 370
    }
]

let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

// Get HTML elements using their IDs
const tovars__html = document.getElementById('tovars__html'); // Container for products
const cart__html = document.querySelector('.cart');    // The cart div itself
const cart__items = document.getElementById('cart-items'); // Container for cart items
const clean__cart__button = document.getElementById('clean__cart__button'); // Button to clear cart
const CountCart = document.getElementById('count-cart'); // Element to show cart count
const cart__button = document.getElementById('cart__button'); // cart toggle button

print_tovars(tovars); // Initial display of products
update_cart(cart);    // Initial display of cart
countTovar();         // Initial count of items in cart

// IMPORTANT: Add event listeners only after the elements exist in the DOM!
document.addEventListener('DOMContentLoaded', function() {
  
    cart__button.onclick = function () {
      cart__html.classList.toggle('active');
     };
  
    clean__cart__button.onclick = function () {
        cart = [];
        update_cart(cart);
    };
});

function print_tovars(tovars) {
    tovars__html.innerHTML = ''; // Clear previous content
    tovars.forEach(tovar => {
        tovars__html.innerHTML +=
            `
        <div class="tovar">
                <img src="${tovar.image}" alt="${tovar.name}">
                <div class="tovar__info">
                    <h2>${tovar.name}</h2>
                    <p>Цена товара - ${tovar.price}, руб.</p>
                    <button onclick="add_tovar_in_cart(${tovar.id})" data-id-tovar="${tovar.id}" >В корзину</button>
                </div>
        </div>
        `;
    });
}

function add_tovar_in_cart(id) {
    let tovar = tovars.find(t => t.id === id);
    if (tovar) {
        let existingTovar = cart.find(t => t.id === id);
        if (existingTovar) {
            existingTovar.count++;
        } else {
            tovar.count = 1;
            cart.push(tovar);
        }
        update_cart(cart);
    }
}

function update_cart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
    cart__items.innerHTML = '';
    cart.forEach(tovar => {
        cart__items.innerHTML +=
            `
        <div class="cart__item">
            <img src="${tovar.image}" alt="${tovar.name}">
            <div class="cart__info">
                <h2>${tovar.name}</h2>
                <button class="cart__operation" onclick='minus_count_tovar(${tovar.id})' >-</button>
                <p class="cart__counter">${tovar.count}</p>
                <button class="cart__operation" onclick='add_count_tovar(${tovar.id})' >+</button>
                <button onclick='delete_from_tovar_cart(${tovar.id})' class="cart__operation red">Удалить</button>
            </div>
        </div>
        `;
    });
    countTovar(); // Update cart count after changes
}


function countTovar() {
   CountCart.innerText = cart.length;
}

function add_count_tovar(id) {
    let tovar = cart.find(item => item.id === id);
    if (tovar && tovar.count < 10) {
        tovar.count++;
    }
    update_cart(cart);
}

function minus_count_tovar(id) {
    let tovar = cart.find(item => item.id === id);
      if (tovar && tovar.count > 0) {
        tovar.count--;
          if (tovar.count === 0){
          cart = cart.filter(item => item.id !== id);
        }
    }
    update_cart(cart);
}


function delete_from_tovar_cart(id) {
    cart = cart.filter(tovar => tovar.id !== id);
    update_cart(cart);
}