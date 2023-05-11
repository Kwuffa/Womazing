let products = [];
let counter = 0;
// скидочный товар или нет?
let checkIsSale;
// функция для проверки скидки
let CheckIfSale = function(price_block) {
    if(price_block.children[3].className == "price_sale"){
        checkIsSale = true;
        return price_block.children[3].children[1].innerText;
    } 
    else{
        checkIsSale = false;
        return price_block.children[3].children[0].innerText;
    } 
}
// переменная родителя
let parent;
// функция для проверки нажатия на карточку товара или нет
let CheckIfItem = function(block){
    if(block.tagName.toLowerCase() === 'svg' || block.tagName.toLowerCase() === 'html') return false;
    if(block.className.split(" ")[1] == "new_collection__product"){
        parent = block;
        return true;
    }
    else{
        while(block != document.body){
            block = block.parentNode;
            if(block.className.split(" ")[1] == "new_collection__product"){
                parent = block;
                return true;
            }
        }
        return false;
    }
}
// при клике
addEventListener("click", function(event) {
    // проверяем 
    if(CheckIfItem(event.target)){
        // добавляем в список товар
        products[counter] = {
            name: parent.children[2].children[0].innerText.split(" ")[0],
            price: CheckIfSale(parent),
            isSale: checkIsSale,
            description: parent.children[2].children[0].innerText
        };
    // очищаем консоль и выводим весь текущий список
    counter++;
    console.clear();
    products.forEach(elem => {
        console.log(`Товар ${products.indexOf(elem)+1}`)
        for (const key in elem) {
            console.log(`${key} - ${elem[key]}`);
        }
    })
    }
});
