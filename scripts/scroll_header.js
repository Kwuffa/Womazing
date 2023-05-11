myhead = document.getElementById("myhead");
// themeBtn = document.querySelector(".themeBtn_a");
// Когда прокручиваем вниз на 10 пикселей от верха - показать head
themeBtn.addEventListener('click', ()=>{
    if(myhead.classList.contains("grey")){
        scrollFunc();
    }
    else{
        scrollFunc();
    }
});
scrollFunc();
window.onscroll = function() {scrollFunc()};
function scrollFunc() {
    if (document.documentElement.scrollTop > 10) {
        if(localStorage.getItem('theme') === "white"){
            myhead.style.background = "white";
        }
        else if(localStorage.getItem('theme') === "dark"){
            myhead.style.background = "grey";
        }
        else{
            myhead.style.background = "white";
        }
        myhead.style.top = "0";
    } else {
        myhead.style.background = "none";
        myhead.style.top = "1.2rem";
    }
}