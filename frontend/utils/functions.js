import asyncFib from '../fib_functions/async.js';
import asyncMemoFib from '../fib_functions/async_memo.js';
import asyncBusyFib from '../fib_functions/async_busy.js';
import syncFib from '../fib_functions/sync.js';
import syncMemoFib from '../fib_functions/sync_memo.js';
import syncBusyFib from '../fib_functions/sync_busy.js';

export default {
  sync: syncFib,
  syncBusy: syncBusyFib,
  syncMemo: syncMemoFib,
  async: asyncFib,
  asyncBusy: asyncBusyFib,
  asyncMemo: asyncMemoFib,
};
