let button = document.querySelector(".add-to-cart__background_in-cart_button");
if(!sessionStorage.getItem('sec_item')){
    sessionStorage.setItem('sec_item', '<div class="items"></div>');
}
if(!sessionStorage.getItem('orderTotal_items')){
    sessionStorage.setItem('orderTotal_items', '<div class="orderItems"></div>');
}
// sessionStorage.setItem('orderTotal_items', '<div class="orderItems"></div>');
if(sessionStorage.getItem('sec_item') == '<div class="items"></div>'){
    sessionStorage.setItem('countItems', 0);
}
// console.log(sessionStorage.getItem('sec_item'));
function makeRequestAndUpdateElement(imgSrc, title, size, color, price, count) {
    let divAdd = `<div class="item">
                    <div class="product_wrapper">
                        <div class="item-legend">
                            <h4>Товар</h4>
                            <hr>
                        </div>
                        <div class="product">
                            <button class="removeCartBtn">
                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 1L13 13M13 1L1 13" stroke="black"/>
                                </svg>
                            </button>
                            <figure>
                                <img src="${imgSrc}" alt="${title}" width="125" height="179">
                                <figcaption class="shopping-cart_figcaption">${title} - ${size}, ${color}</figcaption>
                            </figure>
                            <p>${title} - ${size}, ${color}</p>
                        </div>
                    </div>
                    <div class="price_wrapper">
                        <div class="item-legend">
                            <h4>Цена</h4>
                            <hr>
                        </div>
                        <p class="oneItemPrice">${price}</p>
                    </div>
                    <div class="count_item">
                        <div class="item-legend">
                            <h4>Количество</h4>
                            <hr>
                        </div>
                        <div class="click-count">
                            <button class="plus">+</button>
                            <span class="count">${count}</span>
                            <button class="minus">-</button>
                        </div>
                    </div>
                    <div class="total_item">
                        <div class="click-count">
                            <button class="plus">+</button>
                            <span class="count">${count}</span>
                            <button class="minus">-</button>
                        </div>
                        <div class="item-legend">
                            <h4>Всего</h4>
                            <hr>
                        </div>
                        <p class="totalItemPrice">$${Number(price.slice(1)) * Number(count)}</p>
                    </div>
                </div>`
    let items = sessionStorage.getItem('sec_item');
    let orderWrapper = sessionStorage.getItem('orderTotal_items');
    const parser = new DOMParser();
    // orderingInf
    const htmlOrder = parser.parseFromString(orderWrapper, 'text/html');
    let divOrderWrap = htmlOrder.querySelector(".orderItems");
    let newElem = document.createElement("div");
    newElem.className = "orderItem";
    let newName = document.createElement("span");
    newName.innerText = `${title} - ${size}, ${color}, ${count}`;
    let newPrice = document.createElement("span");
    let priceText = `$${Number(price.slice(1))*Number(count)}`
    newPrice.innerText = priceText;
    countinue = true;
    if(divOrderWrap.children.length > 0){
        Array.from(divOrderWrap.children).forEach(element => {
            if(element.children[0].innerText.includes(`${title} - ${size}, ${color}`)){
                countinue = false;
                split = element.children[0].innerText.split(", ");
                newCount = Number(split[split.length-1])+Number(count);
                split[split.length-1] = newCount;
                element.children[0].innerText = split.join(", ");
                // цена
                element.children[1].innerText = `$${Number(price.slice(1))*newCount}`
                sessionStorage.setItem("orderTotal_items", divOrderWrap.outerHTML);
            }
        });
    } 
    if(countinue){
        newElem.append(newName);
        newElem.append(newPrice);
        divOrderWrap.append(newElem);
        sessionStorage.setItem('orderTotal_items', divOrderWrap.outerHTML);
    }

    // cart
    const htmlDoc = parser.parseFromString(items, 'text/html');
    let divWrap = htmlDoc.querySelector(".items");
    const add = parser.parseFromString(divAdd, 'text/html');
    let divChild = add.querySelector(".item");
    let access = true;
    if(divWrap.children.length > 0){
        let wrapper = Array.prototype.slice.call(divWrap.children, 0, divWrap.children.length);
        wrapper.forEach(element => {
            let children = element.querySelector(".product").children;
            let newPrice = element.querySelector(".totalItemPrice");
            let lastChildren = children[children.length - 1];
            if(lastChildren.innerText == `${title} - ${size}, ${color}`){
                access = false;
                let newCount = Array.from(element.querySelectorAll(".count"));
                newCount.forEach(element => {
                    element.innerText = Number(element.innerText) + Number(count);
                    newPrice.innerText = `$${Number(price.slice(1)) * Number(element.innerText)}`
                    sessionStorage.setItem('sec_item', divWrap.outerHTML);
                });
            }
        });
    }
    if(access){
        divWrap.appendChild(divChild);
        sessionStorage.setItem('sec_item', divWrap.outerHTML);
    }
}

if(document.contains(button)){
    button.addEventListener('click', function(e){
        e.preventDefault;
        const errorElements = document.querySelectorAll('.errorSpanItem');
        errorElements.forEach((element) => {
        element.remove();
        });
        let button = e.target;
        if(button.tagName != "BUTTON"){
            button = e.target.parentNode;
        }
        const sizeButtons = document.getElementsByName("size");
        const colorButtons = document.getElementsByName("color");
        let selectedSize;
        let selectedColor;
        for (let i = 0; i < sizeButtons.length; i++) {
            if (sizeButtons[i].checked) {
                selectedSize = sizeButtons[i].getAttribute("myattr");
                break;
            }
        }
        for (let i = 0; i < colorButtons.length; i++) {
            if (colorButtons[i].checked) {
                selectedColor = colorButtons[i].getAttribute("myattr");
                break;
            }
        }
        if (selectedSize && selectedColor) {
            let imgSrc = document.querySelector(".item_img").getAttribute("src");
            let title = document.querySelector('.item_title').innerText;
            let size = selectedSize;
            let color = selectedColor;
            let price = document.querySelector(".price").children[0].innerText;
            let count = document.querySelector('.count').innerText;
            makeRequestAndUpdateElement(imgSrc, title, size, color, price, count);
        } else {
            if (!selectedSize){
                let errorSize = document.createElement('span');
                errorSize.className = "errorSpanItem";
                errorSize.innerText = "Поле обязательно для выбора";
                sizeButtons[1].parentNode.parentNode.parentNode.append(errorSize);
            }
            if (!selectedColor){
                let errorColor = document.createElement('span');
                errorColor.className = "errorSpanItem";
                errorColor.innerText = "Поле обязательно для выбора";
                colorButtons[1].parentNode.parentNode.parentNode.append(errorColor);
            }
        }
    });
}





// fetch('http://127.0.0.1:5500/shopping-cart.html')
    // .then(response => response.text())
    // .then(data => {
    //     const parser = new DOMParser();
    //     const htmlDoc = parser.parseFromString(data, 'text/html');
    //     const elementToChange = htmlDoc.querySelector('.sec_item-cart');
    //     let errorSize = document.createElement('span');
    //     errorSize.innerText = "Поле обязательно для выбора";
    //     elementToChange.append(errorSize);
    //     // console.log(elementToChange);
    //     // localStorage.setItem('sec_item', elementToChange);
    // });






