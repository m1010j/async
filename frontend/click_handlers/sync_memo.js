import { syncMemoFib } from '../fib_functions/sync_memo.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/sync_memo.js';

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
      displayResult(n, button, beforeTime, resultDiv, timeDiv, e.data.n);
      worker.terminate();
    };
  } else {
    const beforeTime = new Date().getTime();
    displayResult(n, button, beforeTime, resultDiv, timeDiv, syncMemoFib(n));
  }
};
