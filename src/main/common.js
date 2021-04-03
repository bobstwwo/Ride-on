export function animateMain() {
    const svgOuter = document.querySelector(".svg-outer");
    const mainTitle = document.querySelector(".main-title");
    const mainDesc = document.querySelector(".main-desc");
    svgOuter.classList.add("anim");
    setTimeout(() => {
        mainTitle.classList.add("anim");
        setTimeout(() => {
            mainDesc.classList.add("anim");
        }, 100);
    }, 100);

}
