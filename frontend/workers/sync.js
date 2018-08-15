import { syncFib } from '../fib_functions/sync.js';
import { syncBusyFib } from '../fib_functions/sync_busy.js';
import { syncMemoFib } from '../fib_functions/sync_memo.js';
import functions from '../utils/functions.js';

onmessage = function(e) {
  const { n, type } = e.data;

  const beforeTime = new Date().getTime();
  const result = functions[type](n);
  const afterTime = new Date().getTime();
  const duration = afterTime - beforeTime;
  postMessage({ result, duration });
};
