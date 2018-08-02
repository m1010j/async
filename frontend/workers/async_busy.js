import { asyncBusyFib } from '../fib_functions/async_busy.js';

onmessage = function(e) {
  asyncBusyFib(e.data.n).then(function(result) {
    postMessage({ n: result });
  });
};
