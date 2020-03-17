'use strict';

(function () {
  var inputAdres = document.getElementById('address');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinX = parseFloat(mapPinMain.style.left) + window.util.MAP_PIN_WIDTH / 2;
  var mapPinY = parseFloat(mapPinMain.style.top) + window.util.MAP_PIN_HEIGHT;
  var notice = document.querySelector('.notice');
  var announcementForm = document.querySelector('.ad-form');
  var noticeFieldset = notice.querySelectorAll('fieldset');
  var roomNumber = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var selectCapacity = capacity.getElementsByTagName('option');
  var titleInput = announcementForm.querySelector('#title');
  var priceInput = announcementForm.querySelector('#price');
  var typeInput = announcementForm.querySelector('#type');
  var timeInInput = announcementForm.querySelector('#timein');
  var timeOutInput = announcementForm.querySelector('#timeout');
  var descriptionInput = announcementForm.querySelector('#description');
  var resetButton = announcementForm.querySelector('.ad-form__reset');
  var filterForm = document.querySelector('.map__filters');

  var resetAnnouncementForm = function () {
    var emptyInput = '';

    titleInput.value = emptyInput;
    priceInput.value = emptyInput;
    descriptionInput.value = emptyInput;
    filterForm.reset();

  };

  inputAdres.value = mapPinX + ',' + mapPinY;

  var announcementFormDisabled = function () {
    for (var i = 0; i < noticeFieldset.length; i++) {
      noticeFieldset[i].setAttribute('disabled', 'disabled');
    }
  };

  announcementFormDisabled();

  var titleLengthControlHandler = function (evt) {
    var target = evt.target;

    if (target.validity.tooShort) {
      target.setCustomValidity('Заголовок должен состоять минимум из ' + target.minLength + ' символов!');
    } else if (target.validity.tooLong) {
      target.setCustomValidity('Заголовок состоять максимум из ' + target.maxLength + ' символов!');
    } else if (target.validity.valueMissing) {
      target.setCustomValidity('Обязательное поле!');
    } else {
      target.setCustomValidity('');
    }
  };

  var setCapacity = function () {
    selectCapacity[1].classList.add('hidden');
    selectCapacity[2].classList.add('hidden');
    selectCapacity[3].classList.add('hidden');
    selectCapacity[3].removeAttribute('selected', 'selected');
  };
  setCapacity();

  roomNumber.addEventListener('change', function () {
    if (roomNumber.value === '1') {
      setCapacity();
      selectCapacity[0].classList.remove('hidden');
    } else if (roomNumber.value === '2') {
      setCapacity();
      selectCapacity[0].classList.remove('hidden');
      selectCapacity[1].classList.remove('hidden');
    } else if (roomNumber.value === '3') {
      setCapacity();
      selectCapacity[0].classList.remove('hidden');
      selectCapacity[1].classList.remove('hidden');
      selectCapacity[2].classList.remove('hidden');
    } else if (roomNumber.value === '100') {
      setCapacity();
      selectCapacity[0].classList.add('hidden');
      selectCapacity[3].classList.remove('hidden');
      selectCapacity[3].setAttribute('selected', 'selected');
    } else {
      setCapacity();
    }
  });

  var selectHousingHandler = function (evt) {
    var target = evt.target;

    if (target.value === 'bungalo') {
      priceInput.min = 0;
    } else if (target.value === 'flat') {
      priceInput.min = 1000;
    } else if (target.value === 'house') {
      priceInput.min = 5000;
    } else if (target.value === 'palace') {
      priceInput.min = 10000;
    }

    priceInput.placeholder = priceInput.min;
  };

  var timeCheckHandler = function (evt) {
    var chosenInput = (evt.target === timeInInput) ? timeInInput : timeOutInput;
    var remainingInput = (evt.target === timeInInput) ? timeOutInput : timeInInput;

    if (chosenInput.value === '12:00') {
      remainingInput.value = chosenInput.value;
    } else if (chosenInput.value === '13:00') {
      remainingInput.value = chosenInput.value;
    } else if (chosenInput.value === '14:00') {
      remainingInput.value = chosenInput.value;
    }
  };

  var noticeActivate = function (fieldset) {
    for (var a = 0; a < fieldset.length; a++) {
      fieldset[a].removeAttribute('disabled');
    }
  };

  var submitHandler = function (evt) {
    evt.preventDefault();
    var filledForm = new FormData(announcementForm);

    window.load.sendForm(filledForm, function () {
      window.messages.successMessage();
      window.pins.removePins();
      window.card.closeCard();
      window.form.resetAnnouncementForm();
      window.map.initialState();

    }, window.messages.errorMessage);

  };

  var setHandlers = function () {
    announcementForm.addEventListener('submit', submitHandler);
    titleInput.addEventListener('invalid', titleLengthControlHandler);
    typeInput.addEventListener('change', selectHousingHandler);
    timeOutInput.addEventListener('change', timeCheckHandler);
    timeInInput.addEventListener('change', timeCheckHandler);
    resetButton.addEventListener('click', resetAnnouncementForm);
  };

  window.form = {
    noticeActivate: noticeActivate,
    setHandlers: setHandlers,
    resetAnnouncementForm: resetAnnouncementForm,
    announcementFormDisabled: announcementFormDisabled
  };
}
)();
