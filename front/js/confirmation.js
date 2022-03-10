let url = new URL(window.location.href);
let orderId = url.searchParams.get("orderId");
console.log(url);
console.log(orderId);

let elt2 = document.getElementById("orderId");
elt2.innerHTML +=`<br>${orderId}`;