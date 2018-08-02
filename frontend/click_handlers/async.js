import { asyncFib } from '../fib_functions/async.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/async.js';

export const startAsyncFib = function(e) {
  e.preventDefault();

  const button = document.getElementById('async-submit');
  button.disabled = true;

  const n = parseInt(document.getElementById('async-n').value);
  const resultDiv = document.getElementById('async-result');
  const timeDiv = document.getElementById('async-time');

  const beforeTime = new Date().getTime();
  let worker;
  if (window.Worker) {
    worker = new Worker('./workers/async.js');
    worker.postMessage({ n });
    worker.onmessage = function(e) {
      displayResult(n, button, beforeTime, resultDiv, timeDiv, e.data.n);
      worker.terminate();
    };
  } else {
    displayResult(n, button, beforeTime, resultDiv, timeDiv, asyncFib(n));
  }
};
