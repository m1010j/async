import { asyncMemoFib } from '../fib_functions/async_memo.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/async_memo.js';

export const startAsyncMemoFib = function(e) {
  e.preventDefault();

  const button = document.getElementById('async-memo-submit');
  button.disabled = true;

  const n = parseInt(document.getElementById('async-memo-n').value);
  const resultDiv = document.getElementById('async-memo-result');
  const timeDiv = document.getElementById('async-memo-time');

  const beforeTime = new Date().getTime();
  let worker;
  if (window.Worker) {
    worker = new Worker('./workers/async_memo.js');
    worker.postMessage({ n });
    worker.onmessage = function(e) {
      displayResult(n, button, beforeTime, resultDiv, timeDiv, e.data.n);
      worker.terminate();
    };
  } else {
    displayResult(n, button, beforeTime, resultDiv, timeDiv, asyncMemoFib(n));
  }
};
