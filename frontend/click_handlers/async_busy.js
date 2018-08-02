import { asyncBusyFib } from '../fib_functions/async_busy.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/async_busy.js';

export const startAsyncBusyFib = function(e) {
  e.preventDefault();

  const button = document.getElementById('async-busy-submit');
  button.disabled = true;

  const n = parseInt(document.getElementById('async-busy-n').value);
  const resultDiv = document.getElementById('async-busy-result');
  const timeDiv = document.getElementById('async-busy-time');

  let worker;
  if (window.Worker) {
    worker = new Worker('./workers/async_busy.js');
    const beforeTime = new Date().getTime();
    worker.postMessage({ n });
    worker.onmessage = function(e) {
      displayResult(n, button, beforeTime, resultDiv, timeDiv, e.data.n);
      worker.terminate();
    };
  } else {
    const beforeTime = new Date().getTime();
    displayResult(n, button, beforeTime, resultDiv, timeDiv, asyncBusyFib(n));
  }
};
