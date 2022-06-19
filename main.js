let page = 1;

const steps = document.querySelectorAll(".shipping-step");
const parts = document.querySelectorAll(".part");
const pageBefore = document.querySelector(".page-before");
const pageNext = document.querySelector(".page-next");

function nextPageChange(e) {
  e.preventDefault();
  if (page === 0) {
    steps[0].classList.add("active");
    parts[0].classList.remove("d-none");
    parts[1].classList.add("d-none");
    parts[2].classList.add("d-none");
    page++;
  } else if (page === 1) {
    steps[0].classList.remove("active");
    steps[0].classList.add("checked");
    steps[1].classList.add("active");
    parts[1].classList.remove("d-none");
    parts[0].classList.add("d-none");
    parts[2].classList.add("d-none");
    page++;
  } else if (page === 2) {
    steps[1].classList.remove("active");
    steps[1].classList.add("checked");
    steps[2].classList.add("active");
    parts[2].classList.remove("d-none");
    parts[0].classList.add("d-none");
    parts[1].classList.add("d-none");
  } else {
    return;
  }
  button();
}

function prePageChange(e) {
  e.preventDefault();
  if (page === 2) {
    steps[1].classList.remove("checked");
    steps[1].classList.add("active");
    steps[2].classList.remove("active");
    parts[0].classList.add("d-none");
    parts[1].classList.remove("d-none");
    parts[2].classList.add("d-none");
    page--;
  } else if (page === 1) {
    steps[0].classList.remove("checked");
    steps[0].classList.add("active");
    steps[1].classList.remove("active");
    parts[0].classList.remove("d-none");
    parts[1].classList.add("d-none");
    parts[2].classList.add("d-none");
    page--;
  } else if (page === 0) {
    steps[0].classList.add("active");
    parts[0].classList.remove("d-none");
    parts[1].classList.add("d-none");
    parts[2].classList.add("d-none");
  } else {
    return;
  }
  button();
}

function button() {}

pageNext.addEventListener("click", nextPageChange);
pageBefore.addEventListener("click", prePageChange);

// const productInfo = [
//   {
//     id: 1,
//     title: "破壞補丁修身牛仔褲",
//     price: 3999,
//   },
//   {
//     id: 2,
//     title: "刷色直筒牛仔褲",
//     price: 1299,
//   },
// ];

// let product1_amount = 0;
// let product2_amount = 0;

// const calculateAmounts = document.querySelectorAll(".product-calculate-panel");
// const numberButtons = document.querySelectorAll(".number-button");

// function addAndRemove(e) {
//   if (e.target.matches(".remove-num-btn")) {
//     console.log(123);
//   } else if (e.target.matches(".add-num-btn")) {
//     console.log(155);
//   }
// }

// function onCalculateAmount(e) {
//   console.log(e.target.dataset.constructor);
//   addAndRemove(e);
// }

// calculateAmounts.forEach((calculateAmount) => {
//   calculateAmount.addEventListener("click", onCalculateAmount);
// });
