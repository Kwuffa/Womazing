// let countItemsCart = document.querySelector('.countItemsCart');
let countItemsCart = Array.from(document.querySelectorAll('.countItemsCart'));
if(localStorage.getItem("countItems") < 0){
    localStorage.setItem('countItems', 0);
}
// console.log(countItemsCart);
// очистка локал
// localStorage.setItem('countItems', 0);

function addNumberCart(num=0){
    let counter = 0;
    counter += num;
    countItemsCart.forEach(element => {
        if(Number(element.innerText) + counter > -1){
            element.innerText = Number(element.innerText) + counter;
        }
    });
    localStorage.setItem('countItems', Number(countItemsCart[0].innerText));
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
    element.innerText = localStorage.getItem('countItems');
});
// countItemsCart.innerText = localStorage.getItem('countItems');
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
// if(countItemsCart.innerText > 0){
//     countItemsCart.classList.add("active");
// }
// else{
//     countItemsCart.classList.remove("active");
// }

let addToCartBtn = document.querySelector(".add-to-cart__background_in-cart_button");
let item = document.querySelector(".item");
if(addToCartBtn){
    addToCartBtn.addEventListener('click', function(){
        setTimeout(function(){
            let errorSpanItem = document.querySelector(".errorSpanItem");
            if(!document.contains(errorSpanItem)){
                const countCurrentItem = Number(addToCartBtn.parentNode.querySelector('.count').innerText);
                addNumberCart(countCurrentItem);
            }
        }, 10)
    });
}
if(item){
    itemsAll = Array.from(document.querySelectorAll(".item"));
    itemsAll.forEach(item => {
        let pluses = Array.from(item.querySelectorAll(".plus"));
        pluses.forEach(element => {
            element.addEventListener('click', function(e){
                    if(e.target.parentNode.parentNode.className == 'count_item'){
                        let secondCounter = e.target.closest('.item').querySelector(".total_item").querySelector(".count");
                        secondCounter.innerText = Number(secondCounter.innerText) + 1;
                    } else{
                        let secondCounter = e.target.closest('.item').querySelector(".count_item").querySelector(".count");
                        secondCounter.innerText = Number(secondCounter.innerText) + 1;
                    }
                    addNumberCart(1);
                    let newCount = Number(e.target.parentNode.querySelector(".count").innerText)+1;
                    let oneItemPrice = e.target.closest('.item').querySelector(".oneItemPrice").innerText.slice(1);
                    let newPriceTotal = newCount * oneItemPrice;
                    e.target.closest('.item').querySelector(".totalItemPrice").innerText = `$${newPriceTotal}`;
                    allItmsPricesTotal();
                    localStorage.setItem('sec_item', document.querySelector(".items").outerHTML);
            });
        });
        let minuses = Array.from(item.querySelectorAll(".minus"));
        minuses.forEach(element => {
            element.addEventListener('click', function(e){
                if(e.target.parentNode.querySelector('.count').innerText > 1){
                    if(e.target.parentNode.parentNode.className == 'count_item'){
                        let secondCounter = e.target.closest('.item').querySelector(".total_item").querySelector(".count");
                        secondCounter.innerText = Number(secondCounter.innerText) - 1;
                    } else{
                        let secondCounter = e.target.closest('.item').querySelector(".count_item").querySelector(".count");
                        secondCounter.innerText = Number(secondCounter.innerText) - 1;
                    }
                    addNumberCart(-1);
                    let newCount = Number(e.target.parentNode.querySelector(".count").innerText)-1;
                    let oneItemPrice = e.target.closest('.item').querySelector(".oneItemPrice").innerText.slice(1);
                    let newPriceTotal = newCount * oneItemPrice;
                    e.target.closest('.item').querySelector(".totalItemPrice").innerText = `$${newPriceTotal}`;
                    allItmsPricesTotal();
                    localStorage.setItem('sec_item', document.querySelector(".items").outerHTML);
                }
            })
        });
        let removeBtn = item.querySelector('.removeCartBtn')
        removeBtn.addEventListener('click', (e)=>{
            let item = e.target.closest('.item');
            item.style.animationName = "removeItemAnim";
            item.style.animationDuration = ".5s";
            addNumberCart(-(Number(item.querySelector('.count').innerText)))
            setTimeout(()=>{
                item.remove();
                allItmsPricesTotal();
            localStorage.setItem('sec_item', document.querySelector(".items").outerHTML);
            }, 500);
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
        subTotalPriceBlock.innerText = `$${totalPrice}`;
        totalPriceBlock.innerText = `$${totalPrice}`;
    }
    allItmsPricesTotal();
}