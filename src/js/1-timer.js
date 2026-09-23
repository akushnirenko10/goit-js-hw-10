import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { refs } from './refs';

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

const fp = flatpickr(refs.datetimePicker, options);
