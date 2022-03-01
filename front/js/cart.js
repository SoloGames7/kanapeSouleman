let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);



for(produit of cart){
    console.log(produit);
    let productId = produit["idItem"];
    let productColor = produit["colorItem"];
    let quantity = produit['quantityItem'];
    let idd=produit["idItem"];
    quantity = parseInt(quantity,10);
    fetch(`http://localhost:3000/api/products/${idd}`)
    .then((reponse) => reponse.json())
    .then((reponse) => {
                let elt2 = document.getElementById("cart__items");
                elt2.innerHTML +=`
                <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${reponse['imageUrl']}" alt="${reponse['altTxt']}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${reponse['name']}</h2>
                    <p>${productColor}</p>
                    <p>${reponse['price']}</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté ${quantity}: </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;
            });
}






let container = document.querySelector('#cart__items');
let buttons = document.getElementsByClassName('deleteItem');

console.log(buttons);
console.log(buttons.length);
console.log(Array.from(buttons));


for (let i = 0; i < buttons.length; i++) {
  const e = buttons[i];
  console.log("set");
  e.addEventListener('click', function() {
    let productToRemove = e.closest("article.cart__item");

    // Remove from DOM
    container.removeChild(productToRemove);

    // Remove from localStorage
    const checkParams = (element) => element['productId'] === productToRemove.getAttribute('data-id') && element['productColor'] === productToRemove.getAttribute('data-color');
    let oldProductIndex = cart.findIndex(checkParams);

    cart.splice(oldProductIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    location.reload();
    console.log("cliqué");
  });
}