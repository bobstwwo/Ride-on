export function animateHide(el1, el2, el3) {
  return new Promise((resolve) => {
    // const main = document.querySelector(".main");
    const svgOuter = document.querySelector(el1); //".svg-outer"
    const mainTitle = document.querySelector(el2); //".main-title"
    const mainDesc = document.querySelector(el3); //".main-desc"

    svgOuter.classList.add('anim');
    setTimeout(() => {
      mainTitle.classList.add('anim');
      setTimeout(() => {
        mainDesc.classList.add('anim');
        setTimeout(() => {
          resolve();
        }, 500);
      }, 100);
    }, 100);
  });
}

export function animateShow(containerSelector, firstSelector, secondSelector, thirdSelector) {
  return new Promise((resolve) => {
    const container = document.querySelector(containerSelector);
    const first = document.querySelector(firstSelector);
    const second = document.querySelector(secondSelector);
    const third = document.querySelector(thirdSelector);
    container.classList.add('opac-zero');
    container.classList.remove('hide');
    first.classList.add('animDown');
    setTimeout(() => {
      second.classList.add('animDown');
      setTimeout(() => {
        third.classList.add('animDown');
        container.classList.remove('opac-zero');
        resolve();
      }, 100);
    }, 100);
  });
}

export function animateMenu() {
  let lis = document.querySelectorAll('li');
  lis.forEach(function (el, index) {
    setTimeout(() => {
      el.classList.add('animDown');
      el.classList.add('opac');
    }, index * 200);
  });
}

export function animateSteps() {
  let parent = document.querySelector('.steps');
  let steps = document.querySelectorAll('.steps > div');
  return new Promise((resolve) => {
    parent.classList.add('opac-zero');
    parent.classList.remove('hide');
    steps[0].classList.add('animRightToLeft');
    setTimeout(() => {
      steps[1].classList.add('animRightToLeft');
      setTimeout(() => {
        steps[2].classList.add('animRightToLeft');
        setTimeout(() => {
          steps[3].classList.add('animRightToLeft');
          parent.classList.remove('opac-zero');
          resolve();
        }, 100);
      }, 100);
    }, 100);
  });
}
