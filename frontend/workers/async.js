import { asyncFib } from '../fib_functions/async.js';
import { asyncBusyFib } from '../fib_functions/async_busy.js';
import { asyncMemoFib } from '../fib_functions/async_memo.js';
import functions from '../utils/functions.js';

onmessage = function(e) {
  const { n, type } = e.data;
  functions[type](n).then(function(result) {
    postMessage({ n: result });
  });
};
