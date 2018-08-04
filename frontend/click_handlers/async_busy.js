import { asyncBusyFib } from '../fib_functions/async_busy.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/async_busy.js';
import { post } from '../utils/fetch.js';

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
      const afterTime = new Date().getTime();
      const duration = afterTime - beforeTime;
      displayResult(n, button, duration, resultDiv, timeDiv, e.data.n);
      worker.terminate();
      post('async_busy', n, duration);
    };
  } else {
    const beforeTime = new Date().getTime();
    asyncBusyFib(n).then(function(result) {
      const afterTime = new Date().getTime();
      const duration = afterTime - beforeTime;
      displayResult(n, button, duration, resultDiv, timeDiv, result);
      post('async_busy', n, duration);
    });
  }
};
