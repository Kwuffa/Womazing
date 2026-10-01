{
    let myhead = document.getElementById("myhead");
    let themeBtn = document.querySelector(".themeBtn_a");

    themeBtn.addEventListener('click', () => {
        scrollFunc();
    });

    scrollFunc();
    window.onscroll = function() { scrollFunc() };

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
}