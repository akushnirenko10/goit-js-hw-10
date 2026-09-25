import { refs } from './refs';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();

  const delay = event.currentTarget.elements.delay.value;
  const isFullfilled =
    event.currentTarget.elements.state.value === 'fulfilled' ? true : false;

  createPromise(delay, isFullfilled)
    .then(value => {
      iziToast.success({
        position: 'topRight',
        title: 'OK',
        message: value,
      });
    })
    .catch(err => {
      iziToast.error({
        position: 'topRight',
        title: 'Error',
        message: err,
      });
    });

  event.currentTarget.reset();
}

function createPromise(delay, isFullfilled) {
  return new Promise((resolved, rejected) => {
    setTimeout(() => {
      if (isFullfilled) {
        resolved(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        rejected(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
