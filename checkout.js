// const taxRate = 0.18;
// const shippingPrice = 15;
// const shippingFreePrice = 300;

window.addEventListener("load", () => {
  allproduct();
  // localStorage.setItem("taxRate", taxRate);
  // localStorage.setItem("shippingPrice", shippingPrice);
  // localStorage.setItem("shippingFreePrice", shippingFreePrice);
});

const container = document.getElementById("container");

container.addEventListener("click", (e) => {
  if (e.target.className === "fas fa-minus") {
    if (e.target.closest(".adet").querySelector("span").innerText > 1) {
      e.target.closest(".adet").querySelector("span").innerText--;
      oneproduct(e.target);
    } else {
      if (
        confirm(
          ` Are you sure ? ${
            e.target.closest("section").querySelector("h2").innerText
          } will be removed `
        )
      ) {
        e.target.closest("section").remove();
      }
      // else{e.target.closest(".adet").querySelector("span").innerText = 1}
    }

    allproduct();
  } else if (e.target.className === "fas fa-plus") {
    e.target.closest(".adet").querySelector("span").innerText++;
    oneproduct(e.target);
    allproduct();
  }
  //   else if(e.target.closest("section").querySelector(".product .product-details .remove")){
  else if (e.target.classList.contains("remove")) {
    e.target.closest("section").remove();
  }
});
function oneproduct(target) {
  // let total=target.closest("section").querySelector(".total span").innerText
  let price = target.closest("section").querySelector("strong").innerText;
  let miktar = target.closest(".adet").querySelector("span").innerText;
  target.closest("section").querySelector(".total span").innerText =
    price * miktar;
}

// function allproduct() {
//   console.log(document.querySelector("#cart-total"));
// }

function allproduct() {
  const allprice = document.querySelectorAll(".total span");
  let subtotal = 0;

  allprice.forEach((div) => {
    subtotal += parseFloat(div.innerText);
  });
  const taxPrice = subtotal * localStorage.getItem("taxRate");

  const shippingPrice = parseFloat(
    subtotal > 0 && subtotal < localStorage.getItem("shippingFreePrice")
      ? localStorage.getItem("shippingPrice")
      : 0
  );

  const totalPrice = subtotal + taxPrice + shippingPrice;

  document.querySelector("#cart-subtotal").lastElementChild.innerText =
    subtotal.toFixed(2);

  document.getElementById("cart-tax").children[1].innerText =
    taxPrice.toFixed(2);

  document.querySelector("#cart-shipping p:nth-child(2)").innerText =
    shippingPrice.toFixed(2);

  document.querySelector("#cart-total p:last-child").innerText =
    totalPrice.toFixed(2);
}
