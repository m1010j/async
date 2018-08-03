import { asyncFib } from './fib_functions/async.js';
import { asyncMemoFib } from './fib_functions/async_memo.js';
import { asyncBusyFib } from './fib_functions/async_busy.js';
import { syncFib } from './fib_functions/sync.js';
import { syncMemoFib } from './fib_functions/sync_memo.js';
import { syncBusyFib } from './fib_functions/sync_busy.js';
import { startAsyncFib } from './click_handlers/async.js';
import { startAsyncMemoFib } from './click_handlers/async_memo.js';
import { startAsyncBusyFib } from './click_handlers/async_busy.js';
import { startSyncFib } from './click_handlers/sync.js';
import { startSyncMemoFib } from './click_handlers/sync_memo.js';
import { startSyncBusyFib } from './click_handlers/sync_busy.js';
import appendCode from './utils/append_code.js';

document.addEventListener('DOMContentLoaded', function() {
  const syncSource = document.getElementById('sync-source');
  appendCode(syncFib, syncSource);
  const asyncSource = document.getElementById('async-source');
  appendCode(asyncFib, asyncSource);
  const syncBusySource = document.getElementById('sync-busy-source');
  appendCode(syncBusyFib, syncBusySource);
  const asyncBusySource = document.getElementById('async-busy-source');
  appendCode(asyncBusyFib, asyncBusySource);
  const syncMemoSource = document.getElementById('sync-memo-source');
  appendCode(syncMemoFib, syncMemoSource);
  const asyncMemoSource = document.getElementById('async-memo-source');
  appendCode(asyncMemoFib, asyncMemoSource);

  const syncForm = document.getElementById('sync-form');
  syncForm.onsubmit = startSyncFib;
  const asyncForm = document.getElementById('async-form');
  asyncForm.onsubmit = startAsyncFib;
  const syncBusyForm = document.getElementById('sync-busy-form');
  syncBusyForm.onsubmit = startSyncBusyFib;
  const asyncBusyForm = document.getElementById('async-busy-form');
  asyncBusyForm.onsubmit = startAsyncBusyFib;
  const syncMemoForm = document.getElementById('sync-memo-form');
  syncMemoForm.onsubmit = startSyncMemoFib;
  const asyncMemoForm = document.getElementById('async-memo-form');
  asyncMemoForm.onsubmit = startAsyncMemoFib;

  const formIds = {
    'sync-n': 'sync-submit',
    'async-n': 'async-submit',
    'sync-busy-n': 'sync-busy-submit',
    'async-busy-n': 'async-busy-submit',
    'sync-memo-n': 'sync-memo-submit',
    'async-memo-n': 'async-memo-submit',
  };
  const numberInputs = Object.keys(formIds).map(function(id) {
    return document.getElementById(id);
  });
  numberInputs.forEach(function(input) {
    input.onchange = function() {
      const submitButton = document.getElementById(formIds[input.id]);
      if (parseInt(input.value) > 0) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    };
  });
});
