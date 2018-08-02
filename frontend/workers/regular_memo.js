import { regularMemoFib } from '../fib_functions/regular.js';

onmessage = function(e) {
  postMessage({ n: regularMemoFib(e.data.n) });
};
