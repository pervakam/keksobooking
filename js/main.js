'use strict';

var annoucementTitle = ['Заголовок объявления'];
var annoucementPriceMin = 0;
var annoucementPriceMax = 1000000;
var annoucementType = ['palace', 'flat', 'house', 'bungalo'];
var annoucementRooms = [1, 2, 3, 100];
var annoucementGuests = [1, 2, 3];
var annoucementCheckin = ['12:00', '13:00', '14:00'];
var annoucementCheckout = ['12:00', '13:00', '14:00'];
var annoucementFeatures = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var announcementDescription = 'Описание';
var announcementPhotos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var announcementLocationXMin = 0;
var announcementLocationXMax = 1200;
var announcementLocationYMin = 130;
var announcementLocationYMax = 630;
var announcements = [];
var announcementLength = 8;

var getRandomInteger = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};
var getRandomElement = function (elements) {
  return Math.floor(Math.random() * elements.length);
};
var getRandomArray = function (items) {
  return items.slice(0, items.length);
};

var createAnnoucementItem = function () {
  for (var j = 0; j < announcementLength; j++) {
    var randomPositionX = getRandomInteger(announcementLocationXMin, announcementLocationXMax);
    var randomPositionY = getRandomInteger(announcementLocationYMin, announcementLocationYMax);

    announcements.push(
        {
          author: {
            avatar: 'img/avatars/user0' + (j + 1) + '.png'
          },
          offer: {
            title: getRandomElement(annoucementTitle),
            address: randomPositionX + ',' + randomPositionY,
            price: getRandomInteger(annoucementPriceMin, annoucementPriceMax),
            type: getRandomElement(annoucementType),
            rooms: getRandomElement(annoucementRooms),
            guests: getRandomElement(annoucementGuests),
            checkin: getRandomElement(annoucementCheckin),
            checkout: getRandomElement(annoucementCheckout),
            features: getRandomArray(annoucementFeatures),
            description: getRandomElement(announcementDescription),
            photos: getRandomArray(announcementPhotos)
          },
          location: {
            x: randomPositionX,
            y: randomPositionY
          }
        });
  }
};

createAnnoucementItem(announcementLength);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPin = document.querySelector('#pin').content.querySelector('button');
var pinWidth = 50;
var pinHeight = 70;
var mapPins = document.querySelector('.map__pins');

var createPin = function (ad) {
  var pinElement = mapPin.cloneNode(true);
  var pinPosition = 'left: ' + (ad.location.x - (pinWidth / 2)) + 'px; top: ' + (ad.location.y - pinHeight) + 'px;';

  map.appendChild(pinElement);
  pinElement.style = pinPosition;
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  return pinElement;
};

var generatePin = function () {
  var item = document.createDocumentFragment();
  for (var i = 0; i < announcementLength; i++) {
    item.appendChild(createPin(announcements[i]));
  }

  mapPins.appendChild(item);
};

generatePin();
