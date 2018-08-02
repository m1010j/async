import { regularMemoFib } from '../fib_functions/regular_memo.js';

onmessage = function(e) {
  postMessage({ n: regularMemoFib(e.data.n) });
};
