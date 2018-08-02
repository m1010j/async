import { regularMemoFib } from '../fib_functions/regular.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/regular_memo.js';

export const startRegularMemoFib = function(e) {
  e.preventDefault();

  const button = document.getElementById('regular-memo-submit');
  button.disabled = true;

  const n = parseInt(document.getElementById('regular-memo-n').value);
  const resultDiv = document.getElementById('regular-memo-result');
  const timeDiv = document.getElementById('regular-memo-time');

  const beforeTime = new Date().getTime();
  let worker;
  if (window.Worker) {
    worker = new Worker('./workers/regular_memo.js');
    worker.postMessage({ n });
    worker.onmessage = function(e) {
      displayResult(n, button, beforeTime, resultDiv, timeDiv, e.data.n);
      worker.terminate();
    };
  } else {
    displayResult(button, beforeTime, resultDiv, timeDiv, regularMemoFib(n));
  }
};
