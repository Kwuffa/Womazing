let teamContainerChildernLen = document.querySelectorAll(".gallery_image").length;
let galleryButtons = Array.from(document.querySelectorAll(".galleryButton"));
let prevBtn = document.querySelector(".gallery_prevBtn");
let nextBtn = document.querySelector(".gallery_nextBtn");
function galleryFunction(minus=false) {
    // Ваш код, который нужно выполнять каждые три секунды
    let activeImg = document.querySelector('.gallery_image.active');
    let activeBtn = document.querySelector(".galleryButton.active");
    let currentDataAttr;
    if(!minus){
        dataAttr = Number(activeImg.getAttribute("data-gallery"))+1;
        if(dataAttr <= teamContainerChildernLen){
            currentDataAttr = dataAttr;
        }else{
            currentDataAttr = 1;
        };
    } else{
        dataAttr = Number(activeImg.getAttribute("data-gallery"))-1;
        if(dataAttr > 0){
            currentDataAttr = dataAttr;
        }else{
            currentDataAttr = 3;
        };
    }
    
    let currentImg = document.querySelector(`.gallery_image[data-gallery="${currentDataAttr}"]`);
    let currentBtn = document.querySelector(`.galleryButton[data-gallery="${currentDataAttr}"]`);
    activeImg.classList.remove("active");
    activeBtn.classList.remove("active");
    currentImg.classList.add("active");
    currentBtn.classList.add("active");
}
let intervalIdGallery;
galleryButtons.forEach(element => {
    element.addEventListener('click', function(e) {
        if(!e.target.classList.contains("active")){
            clearInterval(intervalIdGallery); // Удаление текущего интервала
            let btn = e.target;
            let activeImg = document.querySelector('.gallery_image.active');
            let activeBtn = document.querySelector(".galleryButton.active");
            let jumpAttr = btn.getAttribute("data-gallery");
            let currentImg = document.querySelector(`.gallery_image[data-gallery="${jumpAttr}"]`);
            let currentBtn = document.querySelector(`.galleryButton[data-gallery="${jumpAttr}"]`);
            activeImg.classList.remove("active");
            activeBtn.classList.remove("active");
            currentImg.classList.add("active");
            currentBtn.classList.add("active");
            intervalIdGallery = setInterval(galleryFunction, 4000);
        }
    });
});
prevBtn.addEventListener('click', function(e) {
    clearInterval(intervalIdGallery);
    galleryFunction(true);
    intervalIdGallery = setInterval(galleryFunction, 4000);
});
nextBtn.addEventListener('click', function(e) {
    clearInterval(intervalIdGallery);
    galleryFunction();
    intervalIdGallery = setInterval(galleryFunction, 4000);
});
intervalIdGallery = setInterval(galleryFunction, 4000);