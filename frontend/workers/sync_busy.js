import { syncBusyFib } from '../fib_functions/sync_busy.js';

onmessage = function(e) {
  postMessage({ n: syncBusyFib(e.data.n) });
};
