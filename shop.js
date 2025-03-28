const carticon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
carticon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click",event =>{
        const productbox = event.target.closest(".product-box");
        addTocart(productbox);
    });
});

const cartcontent = document.querySelector(".cart-content");
const addTocart = productbox => {
    const productimgsrc = productbox.querySelector("img").src;
    const producttitle = productbox.querySelector(".product-title").textContent;
    const productprice = productbox.querySelector(".price").textContent;

    const cartitems = cartcontent.querySelectorAll(".cart-product-title");
    for (let item of cartitems) {
        if (item.textContent === producttitle) {
            alert("this item is already in the cart.");
            return;
        }
    }

    const cartbox = document.createElement("div");
    cartbox.classList.add("cart-box");

    cartbox.innerHTML=`
    <img src="${productimgsrc}" class="cart-img">
    <div class="cart-detail">
    <h2 class="cart-product-title">${producttitle}</h2>
    <span class="cart-price">${productprice}</span>
    <div class="cart-quantity">
    <button id="decrement">-</button>
    <span class="number">1</span>
    <button id="increment">+</button>
    </div>
    </div>
    <i class='bx bx-trash cart-remove'></i>
    `;
    cartcontent.appendChild(cartbox);

    cartbox.querySelector(".cart-remove").addEventListener("click",() =>{
        cartbox.remove();

        updatecartcount(-1);

        updatetotalprice();
    });
    cartbox.querySelector(".cart-quantity").addEventListener("click", event =>{
        const numberelement = cartbox.querySelector(".number");
        const decrementbutton = cartbox.querySelector("#decrement");
        let quantity = numberelement.textContent;

        if(event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementbutton.style.color = "#999";
            }
        } else if(event.target.id === "increment") {
            quantity++;
            decrementbutton.style.color = "#333";
        }

        numberelement.textContent=quantity;

        updatetotalprice();
    });

    updatecartcount(1);

    updatetotalprice();
};

const updatetotalprice = () => {
    const totalpriceelement = document.querySelector(".total-price");
    const cartboxes = cartcontent.querySelectorAll(".cart-box");
    let total = 0;
    cartboxes.forEach(cartbox => {
        const priceelement = cartbox.querySelector(".cart-price");
        const quantityelement = cartbox.querySelector(".number");
        const price = priceelement.textContent.replace("$", "");
        const quantity = quantityelement.textContent;
        total += price * quantity;
    });
    totalpriceelement.textContent = `$${total}`;
};

let cartitemcount=0;
const updatecartcount = change => {
    const cartitemcountbadge = document.querySelector(".cart-item-count");
    cartitemcount += change;
    if (cartitemcount > 0){
        cartitemcountbadge.style.visibility = "visible";
        cartitemcountbadge.textContent = cartitemcount;
    }else{
        cartitemcountbadge.style.visibility = "hidden";
        cartitemcountbadge.textContent = "";
    }
};

const buynowbutton =document.querySelector(".btn-buy");
buynowbutton.addEventListener("click",() =>{
    const cartboxes = cartcontent.querySelectorAll(".cart-box");
    if (cartboxes.length === 0){
        alert("your cart is empty.please add items to your cart before buying.");
        return;
    }

    cartboxes.forEach(cartbox => cartbox.remove());

    cartitemcount=0;
    updatecartcount(0);

    updatetotalprice();

    alert("thank you for your purchase!");
}); 