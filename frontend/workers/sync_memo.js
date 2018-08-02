import { syncMemoFib } from '../fib_functions/sync_memo.js';

onmessage = function(e) {
  postMessage({ n: syncMemoFib(e.data.n) });
};
