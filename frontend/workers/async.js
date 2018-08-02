import { asyncFib } from '../fib_functions/async.js';

onmessage = function(e) {
  asyncFib(e.data.n).then(function(result) {
    postMessage({ n: result });
  });
};
