let offerContainerChildernLen = document.querySelectorAll(".carousel_wrapper").length;
let carouselButtons = Array.from(document.querySelectorAll(".carouselButton"));
function carouselFunction() {
    // Ваш код, который нужно выполнять каждые три секунды
    let activeText = document.querySelector('.carousel_wrapper.active');
    let activeImg = document.querySelector('.mainHomeImage.active');
    let activeBtn = document.querySelector(".carouselButton.active");
    dataAttr = Number(activeText.getAttribute("data-carousel"))+1;
    let currentDataAttr;
    if(dataAttr <= offerContainerChildernLen){
        currentDataAttr = dataAttr;
    }
    else{
        currentDataAttr = 1;
    }
    let currentText = document.querySelector(`.carousel_wrapper[data-carousel="${currentDataAttr}"]`);
    let currentImg = document.querySelector(`.mainHomeImage[data-carousel="${currentDataAttr}"]`);
    let currentBtn = document.querySelector(`.carouselButton[data-carousel="${currentDataAttr}"]`);
    activeText.classList.remove("active");
    activeImg.classList.remove("active");
    activeBtn.classList.remove("active");
    currentText.classList.add("active");
    currentImg.classList.add("active");
    currentBtn.classList.add("active");
}

let intervalId; // Переменная для хранения идентификатора текущего интервала
carouselButtons.forEach(element => {
    element.addEventListener('click', function(e) {
        if (!e.target.classList.contains("active")) {
            clearInterval(intervalId); // Удаление текущего интервала
            let btn = e.target;
            let activeText = document.querySelector('.carousel_wrapper.active');
            let activeImg = document.querySelector('.mainHomeImage.active');
            let activeBtn = document.querySelector(".carouselButton.active");
            let jumpAttr = btn.getAttribute("data-carousel");
            let currentText = document.querySelector(`.carousel_wrapper[data-carousel="${jumpAttr}"]`);
            let currentImg = document.querySelector(`.mainHomeImage[data-carousel="${jumpAttr}"]`);
            let currentBtn = document.querySelector(`.carouselButton[data-carousel="${jumpAttr}"]`);
            activeText.classList.remove("active");
            activeImg.classList.remove("active");
            activeBtn.classList.remove("active");
            currentText.classList.add("active");
            currentImg.classList.add("active");
            currentBtn.classList.add("active");
            intervalId = setInterval(carouselFunction, 4000); // Установка нового интервала
        }
    });
});

intervalId = setInterval(carouselFunction, 4000);