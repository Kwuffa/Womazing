if(localStorage.getItem('sec_item')){
    let blockAdd = document.querySelector('.sec_item-cart');
    let getItems = localStorage.getItem('sec_item');
    blockAdd.innerHTML = getItems;
}