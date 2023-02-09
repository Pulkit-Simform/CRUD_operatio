'use strict'

const product_arr = [];
const addProductIntoTable = document.getElementById("add_product_table");


// // for initial testing
// // Removed once its finished
// localStorage.setItem("product_arr",[
//     {
//         name:"Shope1",
//         image:"https://c8.alamy.com/comp/2C6F7T5/imaghe-shows-a-selection-of-spanners-used-in-the-engineering-industry-2C6F7T5.jpg",
//         price:1200,
//         description:"Rasdasdadjl"
//     },
//     {
//         name:"Shope2",
//         image:"https://c8.alamy.com/comp/2C6F7T5/imaghe-shows-a-selection-of-spanners-used-in-the-engineering-industry-2C6F7T5.jpg",
//         price:120000,
//         description:"Rasdasdadjasdaldsjajl"
//     }
// ])

function addProduct(name,image,price,description){
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
}


const addProductsIntoTables = (name,image,price,description) => {

    const tableStr = (idx,name,image,price,description) => {
        const trClass = ["bg-white","border-b"];
        const createTrElement = document.createElement("tr");
        createTrElement.classList.add(...trClass);

        const tdStr = `          
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${idx}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${name}
                </td>
                <td class="text-sm text-gray-900 font-light px-3 py-4 whitespace-nowrap">
                    <img src="${image}" class="h-24 w-24 m-auto"/>
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${price}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    ${description}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" id="btn-view-${idx}">
                        View
                    </button>
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" id="btn-edit-${idx}">
                        Edit
                    </button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" id="btn-delete-${idx}">
                        Delete
                    </button>
                </td>          
        `;

        createTrElement.innerHTML = tdStr;        
        return createTrElement;
    };

    const productInfo = JSON.parse(localStorage.getItem("product_arr")).slice(-1)[0];
    // const temp_arr = 
    // product_arr.forEach((e,idx) => {

    // })
    
    addProductIntoTable?.appendChild(
        tableStr(
            product_arr.length,
            productInfo.name,
            productInfo.image,
            productInfo.price,
            productInfo.description
        )
    );
    
    name.value = "";
    image.value = "";
    price.value = 0;
    description.value = "";

    
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
        product_arr.push(product);
        // after then add data into tables;
        localStorage.setItem("product_arr",JSON.stringify(product_arr));
        addProductsIntoTables(name,image,price,description);
    }

})

document.body.addEventListener("click", e => {    
    if (e.target.matches("[data-link]")) {        
        e.preventDefault();
        
        const property = ["name","price","description"];
        let assignProperty = "";
        
        property.forEach(el => {
            if(e.target.id === "asc-"+el) assignProperty = "asc-"+el;                
            if(e.target.id === "desc-"+el) assignProperty = "desc-"+el;            
        });

        const props = assignProperty.split("-")[1];
        console.log(props," -> ",product_arr[0][props]);

        product_arr.sort((a,b) => a[props].localeCompare(b[props]))
        console.log(product_arr);
        
        // objs.sort((a, b) => a.last_nom.localeCompare(b.last_nom));


        
    }
});


