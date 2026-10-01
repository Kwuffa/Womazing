let countItemsCart = Array.from(document.querySelectorAll('.countItemsCart'));
if(sessionStorage.getItem("countItems") < 0){
    sessionStorage.setItem('countItems', 0);
}

function addNumberCart(num=0){
    let counter = 0;
    counter += num;
    countItemsCart.forEach(element => {
        if(Number(element.innerText) + counter > -1){
            element.innerText = Number(element.innerText) + counter;
        }
    });
    sessionStorage.setItem('countItems', Number(countItemsCart[0].innerText));
    if(countItemsCart[0].innerText > 0){
        countItemsCart.forEach(element => {
            element.classList.add("active");
        });
    }
    else{
        countItemsCart.forEach(element => {
            element.style.opacity = "0";
            setTimeout(()=>{element.classList.remove("active")}, 500);
        });
    }
}

countItemsCart.forEach(element => {
    element.innerText = sessionStorage.getItem('countItems') || 0;
});

if(countItemsCart[0].innerText > 0){
    countItemsCart.forEach(element => {
        element.classList.add("active");
    });
}
else{
    countItemsCart.forEach(element => {
        element.classList.remove("active");
    });
}

let addToCartBtn = document.querySelector(".add-to-cart__background_in-cart_button");
let item = document.querySelector(".item");
let checkIfCartPage = document.querySelector(".sec_item-cart");

if(checkIfCartPage){
    function checkIFCartEmpty(){
        let items = document.querySelector('.item');
        let emptyMessage = document.querySelector('.emptyCartMessage');
        let couponAndTotal = document.querySelector(".couponAndTotalSection");
        if(!items){
            emptyMessage.classList.add("active");
            couponAndTotal.classList.add("inactive");
        }else{
            emptyMessage.classList.remove("active");
            couponAndTotal.classList.remove("inactive");
        };
    }
    setTimeout(()=>checkIFCartEmpty(), 10);
}

if(addToCartBtn){
    addToCartBtn.addEventListener('click', function(){
        setTimeout(function(){
            let errorSpanItem = document.querySelector(".errorSpanItem");
            if(!document.contains(errorSpanItem)){
                const countCurrentItem = Number(addToCartBtn.parentNode.querySelector('.count').value);
                addNumberCart(countCurrentItem);
            }
        }, 10)
    });
}

if(item){
    let itemsAll = Array.from(document.querySelectorAll(".item"));
    itemsAll.forEach(item => {
        let pluses = Array.from(item.querySelectorAll(".plus"));
        pluses.forEach(element => {
            element.addEventListener('click', function(e){
                let currentInput = e.target.parentNode.querySelector(".count");
                // Если кто-то начал вводить текст руками, фиксируем это
                let typedVal = Number(currentInput.value) || 1;
                let savedVal = Number(currentInput.getAttribute("value") || 1);
                
                // Исправляем рассинхрон ДО клика по плюсу
                if (typedVal !== savedVal) {
                    addNumberCart(typedVal - savedVal);
                    currentInput.setAttribute("value", typedVal);
                }

                if (typedVal >= 999) return; 

                // Высчитываем новое значение (уже +1)
                let newCount = typedVal + 1;

                if(e.target.parentNode.parentNode.className == 'count_item'){
                    let secondCounter = e.target.closest('.item').querySelector(".total_item").querySelector(".count");
                    secondCounter.value = newCount;
                    let wrapDiv = document.createElement("div");
                    wrapDiv.innerHTML = `<input type="text" class="count" name="count" value=${newCount}>`;
                    let insertDiv = wrapDiv.children[0];
                    secondCounter.after(insertDiv);
                    secondCounter.remove();
                } else{
                    let secondCounter = e.target.closest('.item').querySelector(".count_item").querySelector(".count");
                    secondCounter.value = newCount;
                    let wrapDiv = document.createElement("div");
                    wrapDiv.innerHTML = `<input type="text" class="count" name="count" value=${newCount}>`;
                    let insertDiv = wrapDiv.children[0];
                    secondCounter.after(insertDiv);
                    secondCounter.remove();
                }
                
                addNumberCart(1);
                let oneItemPrice = e.target.closest('.item').querySelector(".oneItemPrice").innerText.slice(1);
                let newPriceTotal = newCount * oneItemPrice;
                e.target.closest('.item').querySelector(".totalItemPrice").innerText = `$${newPriceTotal}`;
                allItmsPricesTotal();
                sessionStorage.setItem('sec_item', document.querySelector(".items").outerHTML);
                
                let currentElem = e.target.closest(".item").querySelector(".product").querySelector("p").innerText;
                let orderhtml = sessionStorage.getItem("orderTotal_items");
                let divElement = document.createElement('div');
                divElement.innerHTML = orderhtml;
                let wrapperItems = Array.from(divElement.querySelectorAll(".orderItem"));
                wrapperItems.forEach(element => {
                    if(element.children[0].innerText.includes(currentElem)){
                        let split = element.children[0].innerText.split(", ");
                        split[split.length-1] = newCount;
                        element.children[0].innerText = split.join(", ");
                        element.children[1].innerText = `$${newPriceTotal}`;
                        sessionStorage.setItem("orderTotal_items", divElement.querySelector(".orderItems").outerHTML);
                    };
                });
            });
        });
        
        let minuses = Array.from(item.querySelectorAll(".minus"));
        minuses.forEach(element => {
            element.addEventListener('click', function(e){
                let currentInput = e.target.parentNode.querySelector(".count");
                let typedVal = Number(currentInput.value) || 1;
                let savedVal = Number(currentInput.getAttribute("value") || 1);
                
                if (typedVal !== savedVal) {
                    addNumberCart(typedVal - savedVal);
                    currentInput.setAttribute("value", typedVal);
                }

                if(typedVal > 1){
                    let newCount = typedVal - 1;

                    if(e.target.parentNode.parentNode.className == 'count_item'){
                        let secondCounter = e.target.closest('.item').querySelector(".total_item").querySelector(".count");
                        secondCounter.value = newCount;
                        let wrapDiv = document.createElement("div");
                        wrapDiv.innerHTML = `<input type="text" class="count" name="count" value=${newCount}>`;
                        let insertDiv = wrapDiv.children[0];
                        secondCounter.after(insertDiv);
                        secondCounter.remove();
                    } else{
                        let secondCounter = e.target.closest('.item').querySelector(".count_item").querySelector(".count");
                        secondCounter.value = newCount;
                        let wrapDiv = document.createElement("div");
                        wrapDiv.innerHTML = `<input type="text" class="count" name="count" value=${newCount}>`;
                        let insertDiv = wrapDiv.children[0];
                        secondCounter.after(insertDiv);
                        secondCounter.remove();
                    }
                    
                    addNumberCart(-1);
                    let oneItemPrice = e.target.closest('.item').querySelector(".oneItemPrice").innerText.slice(1);
                    let newPriceTotal = newCount * oneItemPrice;
                    e.target.closest('.item').querySelector(".totalItemPrice").innerText = `$${newPriceTotal}`;
                    allItmsPricesTotal();
                    sessionStorage.setItem('sec_item', document.querySelector(".items").outerHTML);
                    
                    let currentElem = e.target.closest(".item").querySelector(".product").querySelector("p").innerText;
                    let orderhtml = sessionStorage.getItem("orderTotal_items");
                    let divElement = document.createElement('div');
                    divElement.innerHTML = orderhtml;
                    let wrapperItems = Array.from(divElement.querySelectorAll(".orderItem"));
                    wrapperItems.forEach(element => {
                        if(element.children[0].innerText.includes(currentElem)){
                            let split = element.children[0].innerText.split(", ");
                            split[split.length-1] = newCount;
                            element.children[0].innerText = split.join(", ");
                            element.children[1].innerText = `$${newPriceTotal}`;
                            sessionStorage.setItem("orderTotal_items", divElement.querySelector(".orderItems").outerHTML);
                        };
                    });
                }
            })
        });
        
        let removeBtn = item.querySelector('.removeCartBtn');
        removeBtn.addEventListener('click', (e)=>{
            e.stopPropagation(); 

            let currentElem = e.target.closest(".item").querySelector(".product").querySelector("p").innerText;
            let orderhtml = sessionStorage.getItem("orderTotal_items");
            let divElement = document.createElement('div');
            divElement.innerHTML = orderhtml;
            let wrapperItems = Array.from(divElement.querySelectorAll(".orderItem"));
            wrapperItems.forEach(element => {
                if(element.children[0].innerText.includes(currentElem)){
                    element.remove();
                    sessionStorage.setItem("orderTotal_items", divElement.querySelector(".orderItems").outerHTML);
                };
            });
            
            let itemElement = e.target.closest('.item');
            itemElement.style.animationName = "removeItemAnim";
            itemElement.style.animationDuration = ".5s";
            
            let countInput = itemElement.querySelector('.count');
            let savedCount = Number(countInput.getAttribute('value') || countInput.value);
            addNumberCart(-savedCount);
            
            setTimeout(()=>{
                itemElement.remove();
                allItmsPricesTotal();
                sessionStorage.setItem('sec_item', document.querySelector(".items").outerHTML);
            }, 500);
            setTimeout(()=>checkIFCartEmpty(), 500);
        });
    });
    
    function allItmsPricesTotal(){
        let subTotalPriceBlock = document.querySelector(".subTotalProceBlock");
        let totalPriceBlock = document.querySelector(".totalProceBlock");
        let totalPrice = 0;
        let all = Array.from(document.querySelectorAll(".totalItemPrice"));
        all.forEach(element => {
            totalPrice += Number(element.outerText.slice(1));
        });
        if(subTotalPriceBlock && totalPriceBlock){
            subTotalPriceBlock.innerText = `$${totalPrice}`;
            totalPriceBlock.innerText = `$${totalPrice}`;
        }
        sessionStorage.setItem("totalPrice", `$${totalPrice}`);
    }
    allItmsPricesTotal();
}