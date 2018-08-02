import { regularFib } from '../fib_functions/regular.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/regular.js';

export const startRegularFib = function(e) {
  e.preventDefault();

  const button = document.getElementById('regular-submit');
  button.disabled = true;

  const n = parseInt(document.getElementById('regular-n').value);
  const resultDiv = document.getElementById('regular-result');
  const timeDiv = document.getElementById('regular-time');

  const beforeTime = new Date().getTime();
  let worker;
  if (window.Worker) {
    worker = new Worker('./workers/regular.js');
    worker.postMessage({ n });
    worker.onmessage = function(e) {
      displayResult(n, button, beforeTime, resultDiv, timeDiv, e.data.n);
      worker.terminate();
    };
  } else {
    displayResult(button, beforeTime, resultDiv, timeDiv, regularFib(n));
  }
};
