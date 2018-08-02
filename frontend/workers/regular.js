import { regularFib } from '../fib_functions/regular.js';

onmessage = function(e) {
  postMessage({ n: regularFib(e.data.n) });
};
