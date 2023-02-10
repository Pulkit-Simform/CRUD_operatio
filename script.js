/**
 * @Author : Pulkit Sharma
 */

'use strict'

/**
 * * Global Product Array
 */
let product_arr = [];


/**
 * * global state of add_product_table 
 * * its for listening and rendering the data
 */
const addProductIntoTable = document.getElementById("add_product_table");

/**
 * * Product form that listen for submit event
 */
const productForm = document.getElementById("product_form")

/**
 * 
 * @param {*} name 
 * @param {*} image 
 * @param {*} price 
 * @param {*} description 
 */
function addProduct(name,image,price,description){
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
}

/**
 * * For rendering data into tables
 * @param {*} arr | default: global product_arr | or to be passed
 * @param {*} filter_inp | default: null or passed value as integer
 */
const renderTable = (arr=product_arr,filter_inp=null) => {
    // * First clear the table 
    addProductIntoTable.innerHTML = '';

    // * Then it will add data one by one
    arr.forEach((el,idx) => {
        addProductIntoTable?.appendChild(
            addProductsIntoTables(
                el.name,
                el.image,
                el.price,
                el.description,
                true,
                filter_inp!==null?filter_inp:idx+1,
            )
        );
    });
}



/**
 * 
 * @param {*} name 
 * @param {*} image 
 * @param {*} price 
 * @param {*} description 
 * @param {*} flag 
 * @param {*} idx 
 * @returns void
 */
const addProductsIntoTables = (name,image,price,description,flag=false,idx=null) => {

    /**
     * * get the initial data and return the tr element to insert into table
     * @param {*} idx 
     * @param {*} name 
     * @param {*} image 
     * @param {*} price 
     * @param {*} description 
     * @returns <tr> element
     */
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
                    <a class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" id="btn-view-${idx}" data-button href="./pages/view.html">
                        View
                    </a>
                    <a class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2" id="btn-edit-${idx}" data-button href="./pages/edit.html">
                        Edit
                    </a>
                    <a class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2" id="btn-delete-${idx}" data-button href="#">
                        Delete
                    </a>
                </td>          
        `;

        createTrElement.innerHTML = tdStr;        
        return createTrElement;
    };

    if(flag){
        return tableStr(idx,name,image,price,description);
    }

    const productInfo = JSON.parse(localStorage.getItem("product_arr")).slice(-1)[0];
    
    /**
     * * Adding data inside tables by appendChild
     */
    addProductIntoTable?.appendChild(
        tableStr(
            product_arr.length,
            productInfo.name,
            productInfo.image,
            productInfo.price,
            productInfo.description
        )
    );
    
    /**
     * * Clear the input after inserted into tables
     */
    name.value = "";
    image.value = "";
    price.value = 0;
    description.value = "";
    
}

/**
 * ! Checking for errors on runtime
 * ! if anyfield is empty or null or undefined then it will throw an error
 * @param {*} name 
 * @param {*} image 
 * @param {*} price 
 * @param {*} description 
 * @returns 
 */
const productError = (name,image,price,description) => {
    const nameDiv = document.getElementById("div_name");
    const imageDiv = document.getElementById("div_image");
    const priceDiv = document.getElementById("div_price");
    const descriptionDiv = document.getElementById("div_description");
    let flag = false;

    /**
     * ! adding error on runtime 
     * ! adding after input box
     * @param {*} err * for error string 
     * @param {*} divEl * for divElement that will append after
     */
    const errorStr = (err,divEl) => {
        const pElement = document.createElement("p")        
        const pStyle = ["mt-2","text-sm","text-red-600","dark:text-red-500"];
        pElement.classList.add(...pStyle);

        const errStr = `                
            <span class="font-medium">${err}</span>
        `
        pElement.innerHTML = errStr;         
        divEl.appendChild(pElement);
        
        /**
         * * Error will remove after 2 seconds
         */
        setTimeout(() => {
            divEl.removeChild(pElement);
        },2000)

        flag=true;
    }

    /**
     * * Error logic
     */
    if(name.value.length === 0) errorStr("Please Enter Proper Product name",nameDiv);
    if(image.value.length === 0) errorStr("Please Upload Image",imageDiv);
    if(parseFloat(price?.value) <= 0) errorStr("Please Enter Proper Price",priceDiv);
    if(description.value.length === 0) errorStr("Please Enter Valid description",descriptionDiv);

    return flag;

}



/**
 * * Submit Event of Product Form
 */
productForm?.addEventListener("submit",(e) => {
    e.preventDefault();
    const name = document.getElementById("product_name");
    const image = document.getElementById("product_image");
    const price = document.getElementById("product_price");
    const description = document.getElementById("product_description");
    

    // ! for showing error
    // ! check weather any error is there or not
    const checkError = productError(name,image,price,description);

    // ! If error detected then simply not put data into tables;
    if(!checkError){        
        // * for adding the data
        let product = new addProduct(name.value,image.value,price.value,description.value);
        product_arr.push(product);
        // * after then add data inserted tables;
        localStorage.setItem("product_arr",JSON.stringify(product_arr));
        addProductsIntoTables(name,image,price,description);
    }

})


/**
 * * Listening for Sorting
 * * And for View,Delete, and Show
 */
document.body.addEventListener("click", e => {    

    // * For Sorting
    if (e.target.matches("[data-link]")) {        
        e.preventDefault();
        
        const property = ["name","price","description"];
        let assignProperty = "";
        
        property.forEach(el => {
            if(e.target.id === "asc-"+el) assignProperty = "asc-"+el;                
            if(e.target.id === "desc-"+el) assignProperty = "desc-"+el;            
        });

        const props = assignProperty.split("-")[1];
        
        if(assignProperty.split("-")[0] === "asc") {
            if(props==="price") product_arr.sort((a,b) => a[props].localeCompare(b[props],'en', {numeric: true} ))
            else product_arr.sort((a,b) => a[props].localeCompare(b[props]))
        }
        if(assignProperty.split("-")[0] === "desc"){            
            if(props==="price") product_arr.sort((a,b) => - a[props].localeCompare(b[props],'en', {numeric: true} ))
            else product_arr.sort((a,b) => -a[props].localeCompare(b[props]))        
        }
        
        
        localStorage.clear();
        localStorage.setItem("product_arr",JSON.stringify(product_arr));

        renderTable();

    }

    // * For View, Delete and short

    if(e.target.matches("[data-button]")){               
        if(e.target.id.split("-")[1] ==="delete"){            
            e.preventDefault();
            const id = (e.target.id.split("-")[2])-1
            
            
            product_arr.splice(id,1);
            
            localStorage.setItem("product_arr",JSON.stringify(product_arr));
            const arr = JSON.parse(localStorage.getItem("product_arr"));
            renderTable(arr);
            
        }else{
            sessionStorage.setItem("idx", (e.target.id.split("-")[2])-1);
        }
    }
});

/**
 * * Loading Item on initial
 * ! if and only if localStorage has item
 */
window.addEventListener("load", (event) => {
    
    if(localStorage.getItem("product_arr").length > 0){
        product_arr = JSON.parse(localStorage.getItem("product_arr"))
        renderTable(product_arr);       
    }
});


// * global filter id 
const filterId = document.getElementById("filter-input");

/**
 * * For Filtering by Id when key press
*/
document.getElementById("filter-input").addEventListener("keyup",(e) => {
    let val = e.key;
    var reg = /^\d+$/;    
    if(reg.test(val) && parseInt(val)>0){
        try{
            const f = [product_arr.at(parseInt(filterId.value)-1)];
            renderTable(f,Math.abs(filterId.value));
        }catch(err){
            /**
             * ! for catching error on runtime if no records found
             */

            // ! alert string that inserted on runtime
            const alertStr = `        
                <div class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:bg-red-800 dark:text-red-400 lineUp" role="alert">
                    <span class="font-medium">No Record Found!</span>                                 
                </div>
            `

            document.getElementById("alert-box").innerHTML = alertStr;

            // ! will automatically remove error after 2 seconds
            setTimeout(() => {
                document.getElementById("alert-box").innerHTML = "";
            },2000);
        }        
    }

    if(e.key === "Backspace"){
        // * The whole table parse if backspace key event happens
        renderTable();
    }
});
