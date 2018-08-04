import { asyncFib } from '../fib_functions/async.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/async.js';
import { post } from '../utils/fetch.js';

export const startAsyncFib = function(e) {
  e.preventDefault();

  const button = document.getElementById('async-submit');
  button.disabled = true;

  const n = parseInt(document.getElementById('async-n').value);
  const resultDiv = document.getElementById('async-result');
  const timeDiv = document.getElementById('async-time');

  let worker;
  if (window.Worker) {
    worker = new Worker('./workers/async.js');
    const beforeTime = new Date().getTime();
    worker.postMessage({ n });
    worker.onmessage = function(e) {
      const afterTime = new Date().getTime();
      const duration = afterTime - beforeTime;
      displayResult(n, button, duration, resultDiv, timeDiv, e.data.n);
      worker.terminate();
      post('async', n, duration);
    };
  } else {
    const beforeTime = new Date().getTime();
    asyncFib(n).then(function(result) {
      const afterTime = new Date().getTime();
      const duration = afterTime - beforeTime;
      displayResult(n, button, duration, resultDiv, timeDiv, result);
      post('async', n, duration);
    });
  }
};
