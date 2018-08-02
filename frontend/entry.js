import { asyncFib } from './fib_functions/async.js';
import { asyncMemoFib } from './fib_functions/async_memo.js';
import { syncFib } from './fib_functions/sync.js';
import { syncMemoFib } from './fib_functions/sync_memo.js';
import { startAsyncFib } from './click_handlers/async.js';
import { startAsyncMemoFib } from './click_handlers/async_memo.js';
import { startSyncFib } from './click_handlers/sync.js';
import { startSyncMemoFib } from './click_handlers/sync_memo.js';
import appendCode from './utils/append_code.js';

document.addEventListener('DOMContentLoaded', function() {
  const syncSource = document.getElementById('sync-source');
  appendCode(syncFib, syncSource);
  const asyncSource = document.getElementById('async-source');
  appendCode(asyncFib, asyncSource);
  const syncMemoSource = document.getElementById('sync-memo-source');
  appendCode(syncMemoFib, syncMemoSource);
  const asyncMemoSource = document.getElementById('async-memo-source');
  appendCode(asyncMemoFib, asyncMemoSource);

  const syncForm = document.getElementById('sync-form');
  syncForm.onsubmit = startSyncFib;
  const asyncForm = document.getElementById('async-form');
  asyncForm.onsubmit = startAsyncFib;
  const syncMemoForm = document.getElementById('sync-memo-form');
  syncMemoForm.onsubmit = startSyncMemoFib;
  const asyncMemoForm = document.getElementById('async-memo-form');
  asyncMemoForm.onsubmit = startAsyncMemoFib;
});
