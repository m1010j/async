import { syncFib } from '../fib_functions/sync.js';

onmessage = function(e) {
  postMessage({ n: syncFib(e.data.n) });
};
