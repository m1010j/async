import { asyncFib } from '../fib_functions/async.js';
import { asyncBusyFib } from '../fib_functions/async_busy.js';
import { asyncMemoFib } from '../fib_functions/async_memo.js';
import functions from '../utils/functions.js';

onmessage = async function(e) {
  const { n, type } = e.data;
  const beforeTime = new Date().getTime();
  const result = await functions[type](n);
  const afterTime = new Date().getTime();
  const duration = afterTime - beforeTime;
  postMessage({ result, duration });
};
