// Получить меню спрятанное
const menu = document.getElementById("menu");
const menu_button = document.getElementById("menu-button");

function openMenu() {
    menu.style.display = "flex";
}
function closeMenu() {
    menu.style.animationName = "menuHideAnimation";
    menu.style.animationFillMode = "forwards";
    setTimeout(()=>{
        menu.style.animationName = "menuAppearAnimation";
        menu.style.display = "none";
    }, 500);
}
menu_button.addEventListener('click', function(event) {
    event.stopPropagation();
    openMenu();
});
document.addEventListener('click', function(event) {
    const target = event.target;
    const isMenu = target === menu || menu.contains(target);
    if (!isMenu) {
        closeMenu();
    }
});