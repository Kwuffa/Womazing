// Получить фон, форму и body
let callbackground = document.querySelector(".background-for-call");
let body = document.getElementById("body");
let btn = document.querySelector(".CallTelephoneMenu");
let call_block = document.querySelector(".call_wrapper");
let closeBtn = document.querySelector(".closeCallMenu");
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
export function cancel_Func(callbackground, call_block, body) {
    // цвет фона
    let errorSpans = Array.from(document.querySelectorAll(".errorSpan"));
    document.querySelector(".pushInfError.orderCall").classList.remove("active");
    if(errorSpans){
        errorSpans.forEach(element => {
            element.remove();
        });
    };
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
closeBtn.addEventListener('click', function() {
    cancel_Func(callbackground, call_block, body);
});
// btn.onclick = topFunc;
document.addEventListener('click', (e)=>{
    if(callbackground.classList.contains("active")){
        let event = e.target;
        if (!call_block.contains(event) && !btn.contains(event)) {
            cancel_Func(callbackground, call_block, body);
        };
    };
});
btn.addEventListener('click', ()=>{
    topFunc();
});
