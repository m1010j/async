import { syncFib } from '../fib_functions/sync.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/sync.js';
import { post } from '../utils/fetch.js';

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
      const afterTime = new Date().getTime();
      const duration = afterTime - beforeTime;
      displayResult(n, button, duration, resultDiv, timeDiv, e.data.n);
      worker.terminate();
      post('sync', n, duration);
    };
  } else {
    const beforeTime = new Date().getTime();
    const result = syncFib(n);
    const afterTime = new Date().getTime();
    const duration = afterTime - beforeTime;
    displayResult(n, button, duration, resultDiv, timeDiv, result);
    post('sync', n, duration);
  }
};
