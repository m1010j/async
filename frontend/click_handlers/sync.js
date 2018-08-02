import { syncFib } from '../fib_functions/sync.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/sync.js';

export const startSyncFib = function(e) {
  e.preventDefault();

  const button = document.getElementById('sync-submit');
  button.disabled = true;

  const n = parseInt(document.getElementById('sync-n').value);
  const resultDiv = document.getElementById('sync-result');
  const timeDiv = document.getElementById('sync-time');

  let worker;
  if (window.Worker) {
    worker = new Worker('./workers/sync.js');
    const beforeTime = new Date().getTime();
    worker.postMessage({ n });
    worker.onmessage = function(e) {
      displayResult(n, button, beforeTime, resultDiv, timeDiv, e.data.n);
      worker.terminate();
    };
  } else {
    const beforeTime = new Date().getTime();
    displayResult(n, button, beforeTime, resultDiv, timeDiv, syncFib(n));
  }
};
