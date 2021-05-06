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

export async function makeRequest(url, options = {}) {
  const response = await fetch(url, options)
  if (response.status === 200) {
    const data = await response.json()
    return data.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
  } else {
    return response.text()
  }
}

export function initPanel() {
  ymaps.modules.define('Panel', [
    'util.augment',
    'collection.Item'
  ], function (provide, augment, item) {
    // Создаем собственный класс.
    var Panel = function (options) {
      Panel.superclass.constructor.call(this, options);
    };

    // И наследуем его от collection.Item.
    augment(Panel, item, {
      onAddToMap: function (map) {
        Panel.superclass.onAddToMap.call(this, map);
        this.getParent().getChildElement(this).then(this._onGetChildElement, this);
        // Добавим отступы на карту.
        // Отступы могут учитываться при установке текущей видимой области карты,
        // чтобы добиться наилучшего отображения данных на карте.
        map.margin.addArea({
          top: 0,
          left: 0,
          width: '250px',
          height: '100%'
        })
      },

      onRemoveFromMap: function (oldMap) {
        if (this._$control) {
          this._$control.remove();
        }
        Panel.superclass.onRemoveFromMap.call(this, oldMap);
      },

      _onGetChildElement: function (parentDomContainer) {
        // Создаем HTML-элемент с текстом.
        // По-умолчанию HTML-элемент скрыт.
        this._$control = $('<div class="customControl"><div class="content"></div><div class="closeButton"></div></div>').appendTo(parentDomContainer);
        this._$content = $('.content');
        // При клике по крестику будем скрывать панель.
        $('.closeButton').on('click', this._onClose);
      },
      _onClose: function () {
        $('.customControl').css('display', 'none');
      },
      // Метод задания контента панели.
      setContent: function (text) {
        // При задании контента будем показывать панель.
        this._$control.css('display', 'flex');
        this._$content.html(text);
      }
    });

    provide(Panel);
  });
}

export function createMap() {
  ymaps.ready(['Panel']).then(function () {
    var map = new ymaps.Map("map", {
      center: [55.76, 37.64],
      zoom: 10,
      controls: [
        'zoomControl',
        'fullscreenControl',
      ]
    });
    var firstOffice = 'Первый полноценный офис Яндекса появился в Москве в 2001 году. ' +
      'Тогда компания занимала небольшой корпус Вычислительного центра РАН на улице Вавилова, там работало 60 человек.';
    var secondOffice = 'Второй офис Яндекса на Самокатной улице.';
    var thirdOffice = '<a href="https://yandex.ru/company/contacts/moscow/">Главный офис Яндекса</a>' +
      '<p><img style="width: 190px;" src="img/office.jpeg"></p>' +
      '<p>В офисе на улице Льва Толстого находится штаб-квартира Яндекса, он самый большой и по размерам, ' +
      'и по численности сотрудников. Сейчас он занимает почти целый квартал между улицами Льва Толстого ' +
      'и Тимура Фрунзе. Общая площадь всех зданий — более 50 тысяч квадратных метров.</p>';


    var panel = new ymaps.Panel();
    map.controls.add(panel, {
      float: 'left'
    });


    var collection = new ymaps.GeoObjectCollection(null, {
      hasBalloon: false,
      iconColor: '#3b5998'
    });


    collection
      .add(new ymaps.Placemark([55.733838, 37.588100], {
        balloonContent: thirdOffice
      }))
      .add(new ymaps.Placemark([55.758240, 37.678523], {
        balloonContent: secondOffice
      }))
      .add(new ymaps.Placemark([55.693784, 37.564942], {
        balloonContent: firstOffice
      }));

    map.geoObjects.add(collection);

    collection.events.add('click', function (e) {
      var target = e.get('target');
      panel.setContent(target.properties.get('balloonContent'));
      map.panTo(target.geometry.getCoordinates(), { useMapMargin: true });
    });
  });
}
