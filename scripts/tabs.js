let allCardsNum = document.querySelector(".new_collection").children.length;
let blockCountCards = Array.from(document.querySelectorAll(".countCards"));
blockCountCards.forEach(element => {
    element.innerText = `Показано: ${allCardsNum} из 12 товаров`;
});
tabs = Array.from(document.querySelectorAll(".tab_button"));
tabs.forEach(function(tabLink) {
    tabLink.addEventListener('click', function(){
        let counter = 0;
        let currentTabNum = tabLink.getAttribute('data-tabs');
        if(currentTabNum == 1){
            counter = removeAllActive(true);
            tabLink.classList.add("active");
        } else{
            removeAllActive();
            tabLink.classList.add("active");
            let currentItems = Array.from(document.querySelectorAll(`.new_collection__product[data-tabs="${currentTabNum}"]`));
            currentItems.forEach(element => {
                element.classList.add("active");
                counter++;
            });
        }
        blockCountCards.forEach(element => {
            element.innerText = `Показано: ${counter} из 12 товаров`;
        });
    });
});
function removeAllActive(addAllActive=false){
    let tabActive = document.querySelector(".tab_button.active");
    tabActive.classList.remove("active");
    if(addAllActive){
        let items = Array.from(document.querySelectorAll(".new_collection__product"));
        let counter = 0;
        items.forEach(element => {
            counter++;
            if(!element.classList.contains("active")){
                element.classList.add("active");
            }
        });
        return counter;
    } else{
        let itemsActive = Array.from(document.querySelectorAll(".new_collection__product.active"))
        itemsActive.forEach(element => {
            element.classList.remove("active");
        });
    }
}
