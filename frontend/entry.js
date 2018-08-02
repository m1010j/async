import { asyncFib, asyncMemoFib } from './fib_functions/async.js';
import { regularFib, regularMemoFib } from './fib_functions/regular.js';
import { startAsyncFib } from './click_handlers/async.js';
import { startAsyncMemoFib } from './click_handlers/async_memo.js';
import { startRegularFib } from './click_handlers/regular.js';
import { startRegularMemoFib } from './click_handlers/regular_memo.js';
import appendCode from './utils/append_code.js';

document.addEventListener('DOMContentLoaded', function() {
  const asyncSource = document.getElementById('async-source');
  appendCode(asyncFib, asyncSource);
  const regularSource = document.getElementById('regular-source');
  appendCode(regularFib, regularSource);
  const asyncMemoSource = document.getElementById('async-memo-source');
  appendCode(asyncMemoFib, asyncMemoSource);
  const regularMemoSource = document.getElementById('regular-memo-source');
  appendCode(regularMemoFib, regularMemoSource);

  const asyncForm = document.getElementById('async-form');
  asyncForm.onsubmit = startAsyncFib;
  const regularForm = document.getElementById('regular-form');
  regularForm.onsubmit = startRegularFib;
  const asyncMemoForm = document.getElementById('async-memo-form');
  asyncMemoForm.onsubmit = startAsyncMemoFib;
  const regularMemoForm = document.getElementById('regular-memo-form');
  regularMemoForm.onsubmit = startRegularMemoFib;
});
