export function animateMain() {
    const main = document.querySelector(".main");
    const svgOuter = document.querySelector(".svg-outer");
    const mainTitle = document.querySelector(".main-title");
    const mainDesc = document.querySelector(".main-desc");

    const reg = document.querySelector(".reg");
    const title = document.querySelector("#title-anim");
    const sectionIn = document.querySelector(".sec-el-in");
    const sectionIn2 = document.querySelector(".sec-el-in2");
    svgOuter.classList.add("anim");
    setTimeout(() => {
        mainTitle.classList.add("anim");
        setTimeout(() => {
            mainDesc.classList.add("anim");
            setTimeout(() => {
                main.classList.add("hide");
                reg.classList.add("opac-zero");
                reg.classList.remove("hide");
                title.classList.add("animDown");
                setTimeout(() => {
                    sectionIn.classList.add("animDown");
                    setTimeout(() => {
                        sectionIn2.classList.add("animDown");
                        reg.classList.remove("opac-zero");
                    }, 100);
                }, 100);
            }, 500);
        }, 100);
    }, 100);
}

export function animateMenu() {
    let lis = document.querySelectorAll('li');
    lis.forEach(function (el, index) {
        setTimeout(() => {
            el.classList.add("animDown");
            el.classList.add("opac");
        }, index * 200);
    });
}
