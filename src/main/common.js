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
          setTimeout(() => {
            steps[4].classList.add('animRightToLeft');
            parent.classList.remove('opac-zero');
            resolve();
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  });
}

export function animateSteps2() {
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

export function jsForDoc() {
  document.querySelector('html').classList.add('js');

  var fileInput = document.querySelector('.input-file'),
    button = document.querySelector('.input-file-trigger'),
    the_return = document.querySelector('.file-return');

  button.addEventListener('keydown', function (event) {
    if (event.keyCode == 13 || event.keyCode == 32) {
      fileInput.focus();
    }
  });
  button.addEventListener('click', function (event) {
    fileInput.focus();
    return false;
  });
  fileInput.addEventListener('change', function (event) {
    the_return.innerHTML = this.value;
  });
}


export function mainAccount() {
  $(window)
    .resize(function () {
      if ($(window).width() > 1090) {
        $(".sidebar").removeClass("collapse");
      } else {
        $(".sidebar").addClass("collapse");
      }
    })
    .resize();
}

export function anime404() {
  anime({
    targets: '.row svg',
    translateY: 10,
    autoplay: true,
    loop: true,
    easing: 'easeInOutSine',
    direction: 'alternate'
  });

  anime({
    targets: '#zero',
    translateX: 10,
    autoplay: true,
    loop: true,
    easing: 'easeInOutSine',
    direction: 'alternate',
    scale: [{ value: 1 }, { value: 1.4 }, { value: 1, delay: 250 }],
    rotateY: { value: '+=180', delay: 200 },
  });
}


export function makeLoader() {
  $(window).load(function () {
    $(".loader__inner").fadeOut();
    $(".loader").delay(400).fadeOut("slow");
  });
}

export function formatDate(date) {
  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    second = date.getSeconds(),
    hourFormatted = hour % 12 || 12,
    minuteFormatted = minute < 10 ? "0" + minute : minute,
    morning = hour < 12 ? "am" : "pm";

  return day + "/" + month + "/" + year + " " + hourFormatted + ":" +
    minuteFormatted + morning;
}
