import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { refs } from './refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = false;
let TIMER_ID;
const SET_INTERVAL_DELAY = 1000;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
  onChange(selectedDates, instance) {
    userSelectedDate = false;
    if (Date.now() < selectedDates[0].getTime()) {
      userSelectedDate = selectedDates[0];
    }
    if (!userSelectedDate) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    }

    refs.startBtn.disabled = !userSelectedDate;
  },
};

const fp = flatpickr(refs.datetimePicker, options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  TIMER_ID = setInterval(() => {
    const timeDiff = userSelectedDate - Date.now();

    refs.startBtn.disabled = timeDiff > 1000;
    refs.datetimePicker.disabled = timeDiff > 1000;

    const date = convertMs(timeDiff);

    updateDateFields(date);

    if (timeDiff < 1000) {
      clearInterval(TIMER_ID);
    }
  }, SET_INTERVAL_DELAY);
}

function updateDateFields({ days, hours, minutes, seconds }) {
  refs.daysField.textContent = addLeadingZero(days);
  refs.hoursField.textContent = addLeadingZero(hours);
  refs.minutesField.textContent = addLeadingZero(minutes);
  refs.secondsField.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
