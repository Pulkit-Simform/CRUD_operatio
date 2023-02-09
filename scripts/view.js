'use strict'

let idx = sessionStorage.getItem("idx");

const arr = JSON.parse(localStorage.getItem("product_arr"));
const obj = arr[idx];

document.getElementById("product_name").value = arr[idx].name;
document.getElementById("product_image").value = arr[idx].image;
document.getElementById("product_price").value = arr[idx].price;
document.getElementById("product_description").value = arr[idx].description;

