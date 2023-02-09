let idx = sessionStorage.getItem("idx");

const product_arr = JSON.parse(localStorage.getItem("product_arr"));
console.log(product_arr);

window.addEventListener("load",() => {
    document.getElementById("product_name").value = product_arr[idx].name;
    document.getElementById("product_image").value = product_arr[idx].image;
    document.getElementById("product_price").value = product_arr[idx].price;
    document.getElementById("product_description").value = product_arr[idx].description;
})

function addProduct(name,image,price,description){
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
}



const productError = (name,image,price,description) => {
    const nameDiv = document.getElementById("div_name");
    const imageDiv = document.getElementById("div_image");
    const priceDiv = document.getElementById("div_price");
    const descriptionDiv = document.getElementById("div_description");
    let flag = false;

    const errorStr = (err,divEl) => {
        const pElement = document.createElement("p")        
        const pStyle = ["mt-2","text-sm","text-red-600","dark:text-red-500"];
        pElement.classList.add(...pStyle);

        const errStr = `                
            <span class="font-medium">${err}</span>
        `
        pElement.innerHTML = errStr;         
        divEl.appendChild(pElement);
        

        setTimeout(() => {
            divEl.removeChild(pElement);
        },2000)

        flag=true;
    }


    if(name.value.length === 0) errorStr("Please Enter Proper Product name",nameDiv);
    if(image.value.length === 0) errorStr("Please Upload Image",imageDiv);
    if(parseFloat(price?.value) <= 0) errorStr("Please Enter Proper Price",priceDiv);
    if(description.value.length === 0) errorStr("Please Enter Valid description",descriptionDiv);

    return flag;

}


const productForm = document.getElementById("product_form")



productForm?.addEventListener("submit",(e) => {
    e.preventDefault();
    const name = document.getElementById("product_name");
    const image = document.getElementById("product_image");
    const price = document.getElementById("product_price");
    const description = document.getElementById("product_description");
    

    // for showing error
    // check weather any error is there or not
    const checkError = productError(name,image,price,description);

    // If error detected then simply not put data into tables;
    if(!checkError){        
        // for adding the data
        let product = new addProduct(name.value,image.value,price.value,description.value);
        
        product_arr.splice(idx,1,product);
        // after then add data into tables;
        localStorage.setItem("product_arr",JSON.stringify(product_arr));
     
    }

})
