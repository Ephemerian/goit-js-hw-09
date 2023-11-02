import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';

// DOM
const refs = {
  inputEl: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
};

// Setting the start button as disabled initially
refs.startBtn.setAttribute('disabled', '');

// Event action
refs.startBtn.addEventListener('click', onStartBtnClick, { once: true });

let difference;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      refs.startBtn.setAttribute('disabled', '');
      Report.warning('Incorrect Date', 'Please choose a date in the future', 'Okay');
    } else {
      calculateDifferenceTime(selectedDates[0].getTime());
    }
  },
};

flatpickr(refs.inputEl, options);

function onStartBtnClick() {
  refs.startBtn.setAttribute('disabled', '');
  refs.inputEl.setAttribute('disabled', '');
  // Showing timer
  setInterval(() => setTimerToHTML(convertMs(difference)), 1000);
}

function calculateDifferenceTime(setTime) {
  refs.startBtn.removeAttribute('disabled');
  const intervalId = setInterval(() => {
    difference = new Date(setTime) - Date.now();
    if (difference < 1000) {
      clearInterval(intervalId);
      refs.inputEl.removeAttribute('disabled');
      return;
    }
  }, 1000);
}

function setTimerToHTML({ days, hours, minutes, seconds }) {
  refs.timerEl.children[0].querySelector('.value').innerText = addLeadingZero(days);
  refs.timerEl.children[1].querySelector('.value').innerText = addLeadingZero(hours);
  refs.timerEl.children[2].querySelector('.value').innerText = addLeadingZero(minutes);
  refs.timerEl.children[3].querySelector('.value').innerText = addLeadingZero(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}