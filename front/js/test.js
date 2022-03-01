if(element["_id"]==produit["idItem"]){
  let imageUrl=element["imageUrl"];
  let altTxt=element["altTxt"];
  let name=element["name"];
  let price=element["price"];
  console.log(element['imageUrl']);

  let elt2 = document.getElementById("cart__items");
  elt2.innerHTML +=`
  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
  <div class="cart__item__img">
    <img src="${imageUrl}" alt="${altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${name}</h2>
      <p>${productColor}</p>
      <p>${price}</p>
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