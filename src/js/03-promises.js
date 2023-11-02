import { Notify } from 'notiflix/build/notiflix-notify-aio';

// DOM
const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

// Handles the form's submit event
function onSubmit(e) {
  e.preventDefault();

  let delay = Number(e.target.delay.value);
  const step = Number(e.target.step.value);
  const amount = Number(e.target.amount.value);

  for (let position = 1; position <= amount; position++) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    delay += step;
  }
}

// Creates a promise for the given position and delay
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = { position, delay };

  return new Promise((res, rej) => {
    setTimeout(() => {
      if (shouldResolve) {
        res(promise);
      } else {
        rej(promise);
      }
    }, delay);
  });
}