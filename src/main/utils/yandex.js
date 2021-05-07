import { makeRequest } from '@/main/utils/api';
const axios = require('axios').default;
export function createMap(trips, user) {
    ymaps.ready(['AnimatedLine']).then(function () {
        var map = new ymaps.Map("map", {
            center: [55.76, 37.64],
            zoom: 12,
            controls: [
                'zoomControl',
                'fullscreenControl',
            ]
        });;
        addBtn(map);
        if (trips) {
            trips.forEach(trip => {
                let counter = 0;
                let BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<div class="ballon">' +
                    '<div class="ballon__title"><span>$[properties.name]</span></div>' +
                    '<div class="ballon__from">ОТКУДА: $[properties.from]</div>' +
                    '<div div class= "ballon__to" > КУДА: $[properties.to]</div>' +
                    '<div class="ballon__when">КОГДА: $[properties.time]</div>' +
                    '<div class="flex-block">' +
                    '<div class="df__el">Связаться</div>' +
                    '<div class="df__el" id="route">Построить маршрут</div>' +
                    '</div>' +
                    '</div>', {

                    build: function () {
                        localStorage.setItem("pointA", this._data.properties._data.pointA);
                        localStorage.setItem("pointB", this._data.properties._data.pointB);
                        BalloonContentLayout.superclass.build.call(this);
                        $('#route').bind('click', this.onRouteClick);
                        $('#count').html(counter);
                    },

                    clear: function () {
                        localStorage.removeItem("pointA");
                        localStorage.removeItem("pointB");
                        $('#route').unbind('click', this.onRouteClick);
                        BalloonContentLayout.superclass.clear.call(this);
                    },

                    onRouteClick: async function () {
                        let a = localStorage.pointA;
                        let b = localStorage.pointB;
                        drawROute(map, a, b);
                    }
                });

                var placemark = new ymaps.Placemark(trip.pointA, {
                    name: user.name,
                    from: trip.textA,
                    to: trip.textB,
                    pointA: trip.pointA,
                    pointB: trip.pointB,
                    time: trip.departureTime
                }, {
                    balloonContentLayout: BalloonContentLayout
                });

                map.geoObjects.add(placemark);
            });
        } else {
            console.log("Trips no available");
        }
    });
}

const routes = [];
function drawROute(map, a, b) {
    const platform = new H.service.Platform({ apikey: '8uiDorc0NR3v7ZkHby8-V4Q3IV2VsYUyoDJDIBEeXYI' });
    const routingService = platform.getRoutingService();
    routingService.calculateRoute(
        {
            mode: 'fastest;car;traffic:enabled',
            waypoint0: a,
            waypoint1: b,
            representation: 'display',
        },
        (data) => {
            const shape = data.response.route[0].shape;
            let arr = [];
            shape.forEach(point => {
                const el = point.split(',');
                arr.push(el);
            });
            var firstAnimatedLine = new ymaps.AnimatedLine(arr, {}, {
                strokeColor: "#ED4543",
                strokeWidth: 5,
                animationTime: 3000
            });
            map.geoObjects.add(firstAnimatedLine);
            firstAnimatedLine.animate()
            routes.push(firstAnimatedLine);
        },
        (err) => {
            console.log(err);
        },
    );
}

function addBtn(map) {
    const deleteBtn =
        new ymaps.control.Button({
            data: {
                content: "<b id='deleteBtn'>Удалить маршруты</b>",
            },
            options: {
                maxWidth: [28, 150, 178]
            }
        });
    deleteBtn.events
        .add(
            'select',
            function () {
                routes.forEach(tr => {
                    tr.reset();
                });
            }
        )
    map.controls.add(deleteBtn, {
        float: "left"
    });
}

export function animatedLine() {
    ymaps.modules.define('AnimatedLine', [
        'util.defineClass',
        'Polyline',
        'vow'
    ], function (provide, defineClass, Polyline, vow) {
        /**
         * @fileOverview Анимированная линия.
         */
        /**
         * Создает экземпляр анимированной линии.
         * @class AnimatedLine. Представляет собой геообъект с геометрией geometry.LineString.
         * @param {Boolean} [options.animationTime = 4000] Длительность анимации.
         **/
        function AnimatedLine(geometry, properties, options) {
            AnimatedLine.superclass.constructor.call(this, geometry, properties, options);
            this._loopTime = 50;
            this._animationTime = this.options.get('animationTime', 4000);
            // Вычислим длину переданной линии.
            var distance = 0;
            var previousElem = geometry[0];
            this.geometry.getCoordinates().forEach(function (elem) {
                distance += getDistance(elem, previousElem);
                previousElem = elem;
            });
            // Вычислим минимальный интервал отрисовки.
            this._animationInterval = distance / this._animationTime * this._loopTime;
            // Создадим массив с более частым расположением промежуточных точек.
            this._smoothCoords = generateSmoothCoords(geometry, this._animationInterval);
        }
        defineClass(AnimatedLine, Polyline, {
            // Анимировать линию.
            start: function () {
                var value = 0;
                var coords = this._smoothCoords;
                var line = this;
                var loopTime = this._loopTime;
                // Будем добавлять по одной точке каждые 50 мс.
                function loop(value, currentTime, previousTime) {
                    if (value < coords.length) {
                        if (!currentTime || (currentTime - previousTime) > loopTime) {
                            line.geometry.set(value, coords[value]);
                            value++;
                            previousTime = currentTime;
                        }
                        requestAnimationFrame(function (time) {
                            loop(value, time, previousTime || time)
                        });
                    } else {
                        // Бросаем событие окончания отрисовки линии.
                        line.events.fire('animationfinished');
                    }
                }

                loop(value);
            },
            // Убрать отрисованную линию.
            reset: function () {
                this.geometry.setCoordinates([]);
            },
            // Запустить полный цикл анимации.
            animate: function () {
                this.reset();
                this.start();
                var deferred = vow.defer();
                this.events.once('animationfinished', function () {
                    deferred.resolve();
                });
                return deferred.promise();
            }

        });
        // Функция генерации частых координат по заданной линии.
        function generateSmoothCoords(coords, interval) {
            var smoothCoords = [];
            smoothCoords.push(coords[0]);
            for (var i = 1; i < coords.length; i++) {
                var difference = [coords[i][0] - coords[i - 1][0], coords[i][1] - coords[i - 1][1]];
                var maxAmount = Math.max(Math.abs(difference[0] / interval), Math.abs(difference[1] / interval));
                var minDifference = [difference[0] / maxAmount, difference[1] / maxAmount];
                var lastCoord = coords[i - 1];
                while (maxAmount > 1) {
                    lastCoord = [lastCoord[0] + minDifference[0], lastCoord[1] + minDifference[1]];
                    smoothCoords.push(lastCoord);
                    maxAmount--;
                }
                smoothCoords.push(coords[i])
            }
            return smoothCoords;
        }
        // Функция нахождения расстояния между двумя точками на плоскости.
        function getDistance(point1, point2) {
            return Math.sqrt(
                Math.pow((point2[0] - point1[0]), 2) +
                Math.pow((point2[1] - point1[1]), 2)
            );
        }
        provide(AnimatedLine);
    });
}

