import { syncBusyFib } from '../fib_functions/sync_busy.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/sync_busy.js';

export const startSyncBusyFib = function(e) {
  e.preventDefault();

  const button = document.getElementById('sync-busy-submit');
  button.disabled = true;

  const n = parseInt(document.getElementById('sync-busy-n').value);
  const resultDiv = document.getElementById('sync-busy-result');
  const timeDiv = document.getElementById('sync-busy-time');

  let worker;
  if (window.Worker) {
    worker = new Worker('./workers/sync_busy.js');
    const beforeTime = new Date().getTime();
    worker.postMessage({ n });
    worker.onmessage = function(e) {
      displayResult(n, button, beforeTime, resultDiv, timeDiv, e.data.n);
      worker.terminate();
    };
  } else {
    const beforeTime = new Date().getTime();
    displayResult(n, button, beforeTime, resultDiv, timeDiv, syncBusyFib(n));
  }
};
