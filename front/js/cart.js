let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);


function printCart(cart){
  for(produit of cart){
      console.log(produit);
      let productId = produit["idItem"];
      let productColor = produit["colorItem"];
      let quantity = produit['quantityItem'];
      let idd=produit["idItem"];
      quantity = parseInt(quantity,10);

      let elt2 = document.getElementById("cart__items");
      elt2.innerHTML +=`
        <article class="cart__item" data-id=${idd} data-color=${productColor}>
          <div class="cart__item__img">
            <img src="${produit['imageUrl']}" alt="${produit['altTxt']}">
              </div>
              <div class="cart__item__content">
                <div class="cart__item__content__description">
                  <h2>${produit['name']}</h2>
                  <p>${productColor}</p>
                  <p>${produit['price']}</p>
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
  }
}

async function print(cart){
  return res = await printCart(cart);
}
print(cart);


let container = document.querySelector('#cart__items');
let buttons = document.getElementsByClassName('deleteItem');
let quantityModification = document.getElementsByClassName('itemQuantity');
console.log(buttons);

for (let i = 0; i < buttons.length; i++) {
  var button = buttons[i];
  // console.log(`del button ${i} set`);
  button.addEventListener('click', function(e) {
    let productToRemove = e.target.closest("article.cart__item");
    console.log(productToRemove);
    // Remove from DOM
    container.removeChild(productToRemove);

    // Remove from localStorage
    const checkParams = (element) => element['productId'] === productToRemove.getAttribute('data-id') && element['productColor'] === productToRemove.getAttribute('data-color');
    let oldProductIndex = cart.findIndex(checkParams);

    cart.splice(oldProductIndex, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log("cliqué");
  });
}

for (let i=0; i< quantityModification.length; i++){
  const elt= quantityModification[i];
  console.log(`event Quant selector ${i} set`);
  elt.addEventListener('change', function(){
    console.log("cliqué");
    console.log(elt.value);
    let cart = JSON.parse(localStorage.getItem("cart"));
    let getItem = elt.closest("article.cart__item");
    let idQ=getItem.getAttribute("data-id");
    let colorQ=getItem.getAttribute("data-color");
    for(produit of cart){
      if(produit["idItem"]==idQ && produit['colorItem']==colorQ){
        produit["quantityItem"]=parseInt(elt.value);
      }
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    console.log(JSON.parse(localStorage.getItem("cart")));
  })
}


function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(document.getElementById("email").value)){
      return (true);
    }
      return (false)
}


let commander = document.getElementById("order");
commander.addEventListener('click',function(){
  console.log("cliqué");
  if(!ValidateEmail(document.getElementById("email").value)){ 
    let mailError = document.getElementById("emailErrorMsg");
    mailError.innerHTML +="email non valide";
  }else{
    let contact={"firstName":document.getElementById("firstName").value,
                 "lastName":document.getElementById("lastName").value,
                 "address":document.getElementById("address").value,
                 "city":document.getElementById("city").value,
                 "email":document.getElementById("email").value,
                };
    let products=[];
    for(produit of cart){
      products.push(produit.idItem);
    }
    console.log(products);
    console.log(contact);

    let order = {
      products: products,
      contact: contact
    }
    
    fetch("http://localhost:3000/api/products/order", { 
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
    .then((res) => {
      return res.json();
    })
    .then((confirm) => {
      console.log(confirm.orderId);
      window.location.replace(`../html/confirmation.html?orderId=${confirm.orderId}`);
    })
    .catch((error) => {
      console.log('Erreur',error);
    });
}
});


