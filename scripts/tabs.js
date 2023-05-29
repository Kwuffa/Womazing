let allCardsNum = document.querySelector(".new_collection").children.length;
let blockCountCards = Array.from(document.querySelectorAll(".countCards"));
blockCountCards.forEach(element => {
    element.innerText = `Показано: ${allCardsNum} из 12 товаров`;
});
tabs = Array.from(document.querySelectorAll(".tab_button"));
tabs.forEach(function(tabLink) {
    tabLink.addEventListener('click', function(){
        // получаем из сессии элемент, активный до этого
        let categoryIdToDelete = sessionStorage.getItem('categoryId');
        let counter = 0;
        let currentTabNum = tabLink.getAttribute('data-tabs');
        // если активный до этого элемент существует, убираем с него стили
        if(categoryIdToDelete){
            let categoryLinksDelete = Array.from(document.querySelectorAll(`.products_footer__links[data-tabs="${categoryIdToDelete}"]`));
            categoryLinksDelete.forEach(element => {
                element.style.pointerEvents = "";
                element.style.fontWeight = "";
                element.style.cursor = "";
                element.style.color = "";
            });
        };
        // добавляем выбраной категории стили
        let currentCategoryLinks = Array.from(document.querySelectorAll(`.products_footer__links[data-tabs="${currentTabNum}"]`));
        if(currentCategoryLinks.length > 0){
            currentCategoryLinks.forEach(element => {
                element.style.pointerEvents = "none";
                element.style.fontWeight = 700;
                element.style.cursor = "default";
                element.style.color = "#6E9C9F";
            });
        };
        // основной код
        if(currentTabNum == 1){
            counter = removeAllActive(true);
            tabLink.classList.add("active");
            sessionStorage.setItem('categoryId', '');
        } else{
            removeAllActive();
            tabLink.classList.add("active");
            sessionStorage.setItem('categoryId', currentTabNum);
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
// категории из сслок
if(sessionStorage.getItem('categoryId')){
    let categoryLinks = Array.from(document.querySelectorAll(`.products_footer__links[data-tabs="${sessionStorage.getItem('categoryId')}"]`));
    categoryLinks.forEach(element => {
        element.style.pointerEvents = "none";
        element.style.fontWeight = 700;
        element.style.cursor = "default";
        element.style.color = "#6E9C9F";
    });

    let currentTabNum = sessionStorage.getItem('categoryId');
    let counter = 0;
    removeAllActive();
    let tabLink = document.querySelector(`.tab_button[data-tabs="${currentTabNum}"]`)
    tabLink.classList.add("active");
    let currentItems = Array.from(document.querySelectorAll(`.new_collection__product[data-tabs="${currentTabNum}"]`));
    currentItems.forEach(element => {
        element.classList.add("active");
        counter++;
    });
    blockCountCards.forEach(element => {
        element.innerText = `Показано: ${counter} из 12 товаров`;
    });
};

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
