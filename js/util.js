'use strict';

(function () {
  var MOUSE_LEFT = 0;
  var ENTER_KEY = 'Enter';
  var MAP_PIN_WIDTH = 62;
  var MAP_PIN_HEIGHT = 84;

  var getRandomInteger = function (min, max) {
    return Math.round(Math.random() * (max - min)) + min;
  };

  window.util = {
    MOUSE_LEFT: MOUSE_LEFT,
    ENTER_KEY: ENTER_KEY,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,

    getRandomInteger: function (min, max) {
      return Math.round(Math.random() * (max - min)) + min;
    },
    getRandomElement: function (elements) {
      return elements[getRandomInteger(0, elements.length - 1)];
    },
    getRandomArray: function (items) {
      return items.slice(0, getRandomInteger(0, items.length - 1));
    }
  };
})();
