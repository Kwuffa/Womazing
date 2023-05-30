function updateListenerOnNewInputs(){
    let allInputsCount = Array.from(document.querySelectorAll(".count"));
    allInputsCount.forEach(element => {
        element.addEventListener('input', validFunc);
    });
};
updateListenerOnNewInputs();
counterForEvent = 0;
function validFunc(event) {
    let checkIfCartPage = document.querySelector(".item");
    function clickHandler(e) {
        if(checkIfCartPage){
            let oldValue = event.target.outerHTML.split('value="')[1].split('"')[0];
            addNumberCartValid(-Number(oldValue));
            if(Number(event.target.value) == 0){
                addNumberCartValid(1);
            } else{
                addNumberCartValid(Number(event.target.value));
            };
        };
        counterForEvent = 0;
        let isInput = e.target == event.target;
        if(!isInput){
            if(!event.target.value){
                event.target.value = "1";
            }
            else if(Number(event.target.value) == 0){
                event.target.value = "1";
            };
        };
        if(checkIfCartPage){
            // order
            orderFuncInput(event.target);

            let wrapDiv = document.createElement("div");
            wrapDiv.innerHTML = `<input type="text" class="count" name="count" value=${event.target.value}>`;
            let insertDiv = wrapDiv.children[0];
            event.target.after(insertDiv);
            let newInput = event.target.parentNode;
            if(newInput){
                updateTOtalPrice(newInput.children[2]);
            }   
            event.target.remove();
            sessionStorage.setItem('sec_item', document.querySelector(".items").outerHTML);
            updateListenerOnNewInputs();
            allItmsPricesTotal();
        };
        document.removeEventListener('click', clickHandler);
    };
    const inputValue = event.target.value;
    let numericValue = inputValue.replace(/\D/g, "");
    if(Number(numericValue) > 999){
        numericValue = numericValue.slice(0, numericValue.length-1);
    }
    else if(Number(numericValue[0]) == 0 && numericValue.length > 1){
        numericValue = numericValue.slice(1);
    };
    event.target.value = numericValue;
    if(checkIfCartPage){
        updateTOtalPrice(event.target);
        if(event.target.parentNode.parentNode.className == 'count_item'){
            let secondCounter = event.target.closest('.item').querySelector(".total_item").querySelector(".count");
            if(Number(event.target.value) == 0 || !event.target.value){
                secondCounter.value = "1";
            } else{
                secondCounter.value = event.target.value;
            }
            let wrapDiv = document.createElement("div");
            wrapDiv.innerHTML = `<input type="text" class="count" name="count" value=${secondCounter.value}>`;
            let insertDiv = wrapDiv.children[0];
            secondCounter.after(insertDiv);
            secondCounter.remove();
        } else{
            let secondCounter = event.target.closest('.item').querySelector(".count_item").querySelector(".count");
            if(Number(event.target.value) == 0 || !event.target.value){
                secondCounter.value = "1";
            } else{
                secondCounter.value = event.target.value;
            }
            let wrapDiv = document.createElement("div");
            wrapDiv.innerHTML = `<input type="text" class="count" name="count" value=${secondCounter.value}>`;
            let insertDiv = wrapDiv.children[0];
            secondCounter.after(insertDiv);
            secondCounter.remove();
        }
    };
    if(counterForEvent == 0){
        document.addEventListener('click', clickHandler);
    };
    counterForEvent++;
};
// update minuses and pluses
if(document.querySelector(".item")){
    itemsAll = Array.from(document.querySelectorAll(".item"));
    itemsAll.forEach(item => {
        let pluses = Array.from(item.querySelectorAll(".plus"));
        pluses.forEach(element => {
            element.addEventListener('click', function(){
                setTimeout(updateListenerOnNewInputs, 10);
            });
        });
        let minuses = Array.from(item.querySelectorAll(".minus"));
        minuses.forEach(element => {
            element.addEventListener('click', function(){
                setTimeout(updateListenerOnNewInputs, 10);
            });
        });
    });
};


function updateTOtalPrice(eventTarget){
    totalPriceBlock = eventTarget.closest(".item").querySelector(".totalItemPrice");
    oneItemPrice = Number(eventTarget.closest(".item").querySelector(".oneItemPrice").innerText.slice(1));
    totalPriceBlock.innerText = `$${oneItemPrice * Number(eventTarget.value)}`;
};
// counterInCart 
function addNumberCartValid(num=0){
    let counter = 0;
    counter += num;
    countItemsCart.forEach(element => {
        if(Number(element.innerText) + counter > -1){
            element.innerText = Number(element.innerText) + counter;
        }
    });
    sessionStorage.setItem('countItems', Number(countItemsCart[0].innerText));
};
// totalCOuntFunc
function allItmsPricesTotal(){
    let subTotalPriceBlock = document.querySelector(".subTotalProceBlock");
    let totalPriceBlock = document.querySelector(".totalProceBlock");
    let totalPrice = 0;
    let all = Array.from(document.querySelectorAll(".totalItemPrice"));
    all.forEach(element => {
        totalPrice += Number(element.outerText.slice(1));
    });
    subTotalPriceBlock.innerText = `$${totalPrice}`;
    totalPriceBlock.innerText = `$${totalPrice}`;
    sessionStorage.setItem("totalPrice", `$${totalPrice}`);
};
function orderFuncInput(eventTarget){
    let currentElem = eventTarget.closest(".item").querySelector(".product").querySelector("p").innerText;
    let orderhtml = sessionStorage.getItem("orderTotal_items");
    let divElement = document.createElement('div');
    divElement.innerHTML = orderhtml;
    let wrapperItems = Array.from(divElement.querySelectorAll(".orderItem"));
    wrapperItems.forEach(element => {
        if(element.children[0].innerText.includes(currentElem)){
            split = element.children[0].innerText.split(", ");
            newCount = Number(eventTarget.value);
            split[split.length-1] = newCount;
            element.children[0].innerText = split.join(", ");
            // цена
            let newPriceTotal = eventTarget.closest('.item').querySelector(".totalItemPrice").innerText;
            if(newPriceTotal == "$0"){
                newPriceTotal = "$129";
            };
            element.children[1].innerText = `${newPriceTotal}`;
            sessionStorage.setItem("orderTotal_items", divElement.querySelector(".orderItems").outerHTML);
        };
    });
};