let callbackground = document.querySelector(".background-for-call");
let body = document.getElementById("body");
let btn = document.querySelector(".CallTelephoneMenu");
let call_block = document.querySelector(".call_wrapper");
let closeBtn = document.querySelector(".closeCallMenu");

function topFunc() {
    callbackground.classList.add("active");
    callbackground.classList.remove("close");
    call_block.classList.remove("close");
    call_block.classList.add("active");
    callbackground.parentElement.style.display = "flex";
    body.style.overflow = "hidden";
}
export function cancel_Func(callbackground, call_block, body) {
    let errorSpans = Array.from(document.querySelectorAll(".errorSpan"));
    document.querySelector(".pushInfError.orderCall").classList.remove("active");
    if(errorSpans){
        errorSpans.forEach(element => {
            element.remove();
        });
    };
    callbackground.classList.remove("active");
    callbackground.classList.add("close");
    call_block.classList.remove("active");
    call_block.classList.add("close");
    setTimeout(function() {
        callbackground.parentElement.style.display = "none";
    }, 1700);
    body.style.overflowY = "scroll";
}
closeBtn.addEventListener('click', function() {
    cancel_Func(callbackground, call_block, body);
});
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
