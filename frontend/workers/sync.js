import { syncFib } from '../fib_functions/sync.js';
import { syncBusyFib } from '../fib_functions/sync_busy.js';
import { syncMemoFib } from '../fib_functions/sync_memo.js';
import functions from '../utils/functions.js';

onmessage = function(e) {
  const { n, type } = e.data;
  postMessage({ n: functions[type](n) });
};
