// Получить фон, форму и body
let callbackground = document.querySelector(".background-for-call");
let body = document.getElementById("body");
let btn = document.querySelector(".CallTelephoneMenu");
let call_block = document.querySelector(".call_wrapper");
// При нажатии
function topFunc() {
    // цвет фона
    callbackground.classList.add("active");
    callbackground.classList.remove("close");
    // анимация самого меню
    call_block.classList.remove("close");
    call_block.classList.add("active");
    // показать весь блок звонка
    callbackground.parentElement.style.display = "flex";
    // спрятать прокрутку
    body.style.overflow = "hidden";
}
function cancel_Func() {
    // цвет фона
    callbackground.classList.remove("active");
    callbackground.classList.add("close");
    // анимация самого меню
    call_block.classList.remove("active");
    call_block.classList.add("close");
    // спрятать весь блок звонка с задержкой
    setTimeout(function() {
        callbackground.parentElement.style.display = "none";
    }, 1700);
    // показать прокрутку
    body.style.overflowY = "scroll";
}
btn.onclick = topFunc;