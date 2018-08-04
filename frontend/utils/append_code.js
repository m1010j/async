import { asyncFib } from '../fib_functions/async.js';
import { asyncMemoFib } from '../fib_functions/async_memo.js';
import { asyncBusyFib } from '../fib_functions/async_busy.js';
import { syncFib } from '../fib_functions/sync.js';
import { syncMemoFib } from '../fib_functions/sync_memo.js';
import { syncBusyFib } from '../fib_functions/sync_busy.js';
import { busywork } from './busywork.js';

export default function(type, htmlElement) {
  const lines = functions[type].toString().split('\n');
  lines.forEach(function(line, idx) {
    if (line.slice(0, 8) === '  Object') {
      busyworkTags().forEach(function(tag) {
        htmlElement.appendChild(tag);
      });
    } else {
      const newLineArr = line.split('').map(function(ch) {
        return ch === ' ' ? '&nbsp;' : ch;
      });
      const codeTag = document.createElement('code');
      codeTag.classList.add('prettyprint');
      codeTag.classList.add('lang-js');
      codeTag.innerHTML = newLineArr.join('');
      htmlElement.appendChild(codeTag);
    }
  });
}

const functions = {
  sync: syncFib,
  syncBusy: syncBusyFib,
  syncMemo: syncMemoFib,
  async: asyncFib,
  asyncBusy: asyncBusyFib,
  asyncMemo: asyncMemoFib,
};

function busyworkTags() {
  const lines = busywork.toString().split('\n');
  const cleanedUpLines = [];
  lines.forEach(function(line, idx) {
    if (idx > 0 && idx < lines.length - 1) {
      const newLineArr = line.split('').map(function(ch) {
        return ch === ' ' ? '&nbsp;' : ch;
      });
      cleanedUpLines.push(newLineArr.join(''));
    }
  });
  return cleanedUpLines.map(function(line) {
    const codeTag = document.createElement('code');
    codeTag.classList.add('prettyprint');
    codeTag.classList.add('lang-js');
    codeTag.innerHTML = line;
    return codeTag;
  });
}
