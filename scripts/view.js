'use strict'

/**
 *  * Find index from sessionStorage and parse the value into field accordingly
 */
let idx = sessionStorage.getItem("idx");

const arr = JSON.parse(localStorage.getItem("product_arr"));

document.getElementById("product_name").value = arr[idx].name;
document.getElementById("product_image").src = arr[idx].image;
document.getElementById("product_price").value = arr[idx].price;
document.getElementById("product_description").value = arr[idx].description;

