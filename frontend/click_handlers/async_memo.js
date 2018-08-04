import { asyncMemoFib } from '../fib_functions/async_memo.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/async_memo.js';
import { post } from '../utils/fetch.js';

export const startAsyncMemoFib = function(e) {
  e.preventDefault();

  const button = document.getElementById('async-memo-submit');
  button.disabled = true;

  const n = parseInt(document.getElementById('async-memo-n').value);
  const resultDiv = document.getElementById('async-memo-result');
  const timeDiv = document.getElementById('async-memo-time');

  let worker;
  if (window.Worker) {
    worker = new Worker('./workers/async_memo.js');
    const beforeTime = new Date().getTime();
    worker.postMessage({ n });
    worker.onmessage = function(e) {
      const afterTime = new Date().getTime();
      const duration = afterTime - beforeTime;
      displayResult(n, button, duration, resultDiv, timeDiv, e.data.n);
      worker.terminate();
      post('async_memo', n, duration);
    };
  } else {
    const beforeTime = new Date().getTime();
    asyncMemoFib(n).then(function(result) {
      const afterTime = new Date().getTime();
      const duration = afterTime - beforeTime;
      displayResult(n, button, duration, resultDiv, timeDiv, result);
      post('async_memo', n, duration);
    });
  }
};
