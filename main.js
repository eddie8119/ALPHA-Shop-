//更換步驟
const pageBtns = document.querySelectorAll(".page-btn");
const parts = document.querySelectorAll(".part");
const shippingSteps = document.querySelectorAll(".shipping-step");
const pageBeforeBtn = document.querySelector(".page-before");
const pageNextBtn = document.querySelector(".page-next");
let step = 0;

function onPageBtn(e) {
  e.preventDefault();

  if (e.target.matches(".page-next")) {
    if (step === 2) {
      return;
    }
    shippingSteps[step].classList.remove("active");
    shippingSteps[step].classList.add("checked");
    shippingSteps[step + 1].classList.add("active");
    parts[step].classList.toggle("d-none");
    parts[step + 1].classList.toggle("d-none");
    step++;
  } else if (e.target.matches(".page-before")) {
    if (step === 0) {
      return;
    }
    shippingSteps[step].classList.remove("active");
    shippingSteps[step].classList.remove("checked");
    shippingSteps[step - 1].classList.remove("checked");
    shippingSteps[step - 1].classList.add("active");
    parts[step].classList.toggle("d-none");
    parts[step - 1].classList.toggle("d-none");
    step--;
  }
  setBtn();
}
function setBtn() {
  if (step === 0) {
    pageBeforeBtn.classList.add("d-none");
    pageNextBtn.classList.add("w-100");
  } else {
    pageBeforeBtn.classList.remove("d-none");
    pageNextBtn.classList.remove("w-100");
    pageNextBtn.classList.add("w-50");
  }

  if (step === 2) {
    pageNextBtn.innerHTML = "確認下單";
  } else {
    pageNextBtn.innerHTML = `下一步&rarr;`;
  }
}
pageBtns.forEach((pageBtn) => {
  pageBtn.addEventListener("click", onPageBtn);
});

//商品計算
const productsList = document.querySelector(".products-list");
const shipmentChoiceContainers = document.querySelectorAll(
  ".shipment-choice-container"
);
const shippingFreeDom = document.querySelector(".shipping-free");
const totalFeeDom = document.querySelector(".total-fee");
const productData = [
  {
    id: 1,
    title: "破壞補丁修身牛仔褲",
    price: 3999,
    imgurl: "https://upload.cc/i1/2022/03/25/n5MSYs.png",
  },
  {
    id: 2,
    title: "刷色直筒牛仔褲",
    price: 1299,
    imgurl: "https://upload.cc/i1/2022/03/25/tV6EMq.png",
  },
];
let shipmentCost = 0;
let totalFee = 0;

productData.forEach((product) => {
  productsList.innerHTML += `
   <div class="product-item-container">
    <img
      class="product-img"
      src=${product.imgurl}
      alt=""
    />
    <div class="product-calculate-panel" >
      <span class="product-item-title">${product.title}</span>
      <div class="calculate-container" >
        <button class="number-button remove-num-btn" data-id=${product.id}>-</button>
        <span class="product_amount_total">0</span>
        <button class="number-button add-num-btn" data-id=${product.id}>+</button>
      </div>
      <span class="product-item-price">0</span>
    </div>
  </div>
   `;
});
function onShipmentChoice(e) {
  if (e.target.parentElement.matches(".normalShipping")) {
    if (shipmentCost >= 500) {
      shipmentCost = 0;
      totalFee -= 500;
      getTotalFee(totalFee);
    }
    shippingFreeDom.innerHTML = "免費";
  } else if (e.target.parentElement.matches(".DHLShipping")) {
    if (shipmentCost >= 500) {
      return;
    }
    shipmentCost = 500;
    shippingFreeDom.innerHTML = shipmentCost;
    totalFee += shipmentCost;
    getTotalFee(totalFee);
  }
}
function onProductsList(e) {
  const productNum = e.target.parentElement.children[1]; //商品的數量顯示dom
  let productInitalNumValue = Number(productNum.innerText); //商品的數量顯示的值
  const productItemPriceTotalDom = e.target.parentElement.nextElementSibling; //該商品計算的總價dom
  let productItemPriceTotal = productItemPriceTotalDom.innerText;

  const id = e.target.dataset.id - 1;
  if (e.target.matches(".add-num-btn")) {
    productInitalNumValue++;
    totalFee += productData[id].price;
  } else if (e.target.matches(".remove-num-btn")) {
    if (productInitalNumValue === 0) {
      return;
    }
    productInitalNumValue--;
    totalFee -= productData[id].price;
  }
  productItemPriceTotal = productInitalNumValue * productData[id].price;
  productNum.innerHTML = productInitalNumValue;
  productItemPriceTotalDom.innerHTML = productItemPriceTotal;

  getTotalFee(totalFee);
}
function getTotalFee(totalFeeNum) {
  totalFeeDom.innerHTML = totalFeeNum;
}

//監聽
shipmentChoiceContainers.forEach((shipmentChoiceContainer) => {
  shipmentChoiceContainer.addEventListener("click", onShipmentChoice);
});
productsList.addEventListener("click", onProductsList);
