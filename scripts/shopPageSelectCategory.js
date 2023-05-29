let categoryLinks = Array.from(document.querySelectorAll(".products_footer__links"));
categoryLinks.forEach(element => {
    element.addEventListener('click', function(e){
        sessionStorage.setItem('categoryId', element.getAttribute("data-tabs"));
    });
});