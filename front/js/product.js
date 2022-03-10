let url =window.location.href.toString();
let id=url.slice(-32);

fetch("http://localhost:3000/api/products")
    .then((reponse) => reponse.json())
    .then((reponse) => {
        for(produit of reponse){
            if(produit["_id"]==id){
                let img=produit["imageUrl"];
                let imgProduct = document.getElementById("imageProduit");
                imgProduct.innerHTML +=`<img src="${img}" alt="Photographie d'un canapé"></img>`;

                let nom=produit["name"];
                let nameProduct =document.getElementById("title");
                nameProduct.innerHTML +=`${nom}`;

                let prix=produit["price"];
                let priceProduct =document.getElementById("price");
                priceProduct.innerHTML +=`${prix}`;

                let desc=produit["description"];
                let descProduct =document.getElementById("description");
                descProduct.innerHTML +=`${desc}`;

                let couleurs=produit["colors"];
                let colorsProduct =document.getElementById("colors");
                for(each of couleurs){
                    colorsProduct.innerHTML +=`<option value="${each}">${each}</option>`;
                }
            }
        }
    });




let newElt5 = document.getElementById("addToCart");
newElt5.addEventListener('click', function() {
    if(!localStorage["cart"]){
        localStorage.setItem("cart",JSON.stringify([]));
    }

    let itemQuantity = parseInt(document.getElementById("quantity").value);
    let itemColor = document.getElementById("colors").value;
    let imageUrl;
    let altTxt;
    let name;
    let price;
    if(itemQuantity!=0 && itemColor!=''){
        fetch(`http://localhost:3000/api/products/${id}`)
        .then((reponse) => reponse.json())
        .then((reponse) => {
            imageUrl = reponse["imageUrl"];
            altTxt = reponse["altTxt"];
            name = reponse['name'];
            price = reponse['price'];
            console.log(price);
            let itemToAdd = {"idItem":id,"quantityItem":itemQuantity,"colorItem":itemColor,"imageUrl":imageUrl, "altTxt":altTxt,"name":name,"price":price};
            let cart = JSON.parse(localStorage.getItem("cart"));
            let res=true;
            cart.forEach(item => {
                if(res){
                    if(itemToAdd["idItem"]==item["idItem"] && itemToAdd["colorItem"]==item["colorItem"]){
                        res=false;
                        item["quantityItem"]=parseInt(itemToAdd["quantityItem"],10)+parseInt(item["quantityItem"],10);
                        localStorage.setItem("cart",JSON.stringify(cart));
                    }
                }
            });
                if(res){
                    cart.push(itemToAdd);
                    localStorage.setItem("cart",JSON.stringify(cart));
                }
                console.log(cart);
                });
    
    }else{
        console.log("attributs non renseigné");
    }

});

