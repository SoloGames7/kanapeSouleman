//api 
fetch("http://localhost:3000/api/products")
    .then((reponse) => reponse.json())
    .then((reponse) => {
        console.log(reponse);
        for(produit of reponse){
            let img=produit["imageUrl"];
            let alt=produit["altTxt"];
            let name=produit["name"];
            let desc=produit["description"];
            let elt2 = document.getElementById("items");
            let id=produit["_id"];
    elt2.innerHTML +=`<a href="./product.html?id=${id}">
                        <article>
                            <img src="${img}" alt="${alt}">
                            <h3 class="productName">${name}</h3>
                            <p class="productDescription">${desc}</p>
                        </article>
                    </a>`;
        }
    });