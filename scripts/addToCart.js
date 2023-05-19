if(sessionStorage.getItem('sec_item')){
    let blockAdd = document.querySelector('.sec_item-cart');
    let getItems = sessionStorage.getItem('sec_item');
    blockAdd.innerHTML = getItems;
}
