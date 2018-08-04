import { syncMemoFib } from '../fib_functions/sync_memo.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/sync_memo.js';
import { post } from '../utils/fetch.js';

export const startSyncMemoFib = function(e) {
  e.preventDefault();

  const button = document.getElementById('sync-memo-submit');
  button.disabled = true;

  const n = parseInt(document.getElementById('sync-memo-n').value);
  const resultDiv = document.getElementById('sync-memo-result');
  const timeDiv = document.getElementById('sync-memo-time');

  let worker;
  if (window.Worker) {
    worker = new Worker('./workers/sync_memo.js');
    const beforeTime = new Date().getTime();
    worker.postMessage({ n });
    worker.onmessage = function(e) {
      const afterTime = new Date().getTime();
      const duration = afterTime - beforeTime;
      displayResult(n, button, duration, resultDiv, timeDiv, e.data.n);
      worker.terminate();
      post('sync_memo', n, duration);
    };
  } else {
    const beforeTime = new Date().getTime();
    const result = syncMemoFib(n);
    const afterTime = new Date().getTime();
    const duration = afterTime - beforeTime;
    displayResult(n, button, duration, resultDiv, timeDiv, result);
    post('sync_memo', n, duration);
  }
};
