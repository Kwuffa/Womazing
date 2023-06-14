let slideButtons = Array.from(document.querySelectorAll(".slide"));
function slideNext(){
    let currentBlock = document.querySelector(".images_block_wrapper.active");
    let currentBtn = document.querySelector(".slide.active");
    let currentAttr = Number(currentBlock.getAttribute("data-gallery")) + 1;
    if(currentAttr > 3){
        currentAttr = 1
    };
    let newBlock = document.querySelector(`.images_block_wrapper[data-gallery="${currentAttr}"]`);
    let newBtn = document.querySelector(`.slide[data-gallery="${currentAttr}"]`);
    // делаем
    currentBlock.classList.remove("active");
    currentBtn.classList.remove("active");
    newBlock.classList.add("active");
    newBtn.classList.add("active");
    slideButtons = Array.from(document.querySelectorAll(".slide"));
}

let intervalIdGallery = setInterval(slideNext, 4000);

slideButtons.forEach(element => {
    element.addEventListener('click', function(e){
        if(!e.target.classList.contains("active")){
            clearInterval(intervalIdGallery);
            e.preventDefault;
            let currentBlock = document.querySelector(".images_block_wrapper.active");
            let currentBtn = document.querySelector(".slide.active");
            let currentAttr = Number(e.target.getAttribute("data-gallery"));
            let newBlock = document.querySelector(`.images_block_wrapper[data-gallery="${currentAttr}"]`);
            let newBtn = document.querySelector(`.slide[data-gallery="${currentAttr}"]`);
            // делаем
            currentBlock.classList.remove("active");
            currentBtn.classList.remove("active");
            newBlock.classList.add("active");
            newBtn.classList.add("active");
            intervalIdGallery = setInterval(slideNext, 4000);
        };
    });
});
