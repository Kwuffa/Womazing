{
    let themeBtn = document.querySelector(".themeBtn_a");
    let themeImg = document.querySelector(".themeBtn_a img");
    let myhead = document.getElementById("myhead");

    addDarkClassHTML(); 

    themeBtn.addEventListener("click", (e) => {
        e.preventDefault();
        if(localStorage.getItem('theme') === 'dark') {
            localStorage.setItem('theme', "white");
        }
        else {
            localStorage.setItem('theme', "dark");
        }
        addDarkClassHTML();
    });

    function addDarkClassHTML() {
        if(localStorage.getItem('theme') === 'dark') {
            document.querySelector('html').classList.add('dark');
            themeImg.src = "images/Theme/sun-white.svg";
            myhead.classList.add("grey");
            myhead.classList.remove("white");
        }
        else{
            document.querySelector('html').classList.remove('dark');
            themeImg.src = "images/Theme/dark.svg";
            myhead.classList.remove("grey");
            myhead.classList.add("white");
        }
    }
}