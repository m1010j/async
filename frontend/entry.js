import startAsync from './click_handlers/async.js';
import startSync from './click_handlers/sync.js';
import appendCode from './utils/append_code.js';
import { hyphenize } from './utils/convert_string.js';

document.addEventListener('DOMContentLoaded', function() {
  ['sync', 'syncBusy', 'syncMemo', 'async', 'asyncBusy', 'asyncMemo'].forEach(
    function(type) {
      const source = document.getElementById(`${hyphenize(type)}-source`);
      appendCode(type, source);
    }
  );

  ['sync', 'syncBusy', 'syncMemo'].forEach(function(type) {
    const form = document.getElementById(`${hyphenize(type)}-form`);
    form.onsubmit = startAsync(type);
  });

  ['async', 'asyncBusy', 'asyncMemo'].forEach(function(type) {
    const form = document.getElementById(`${hyphenize(type)}-form`);
    form.onsubmit = startAsync(type);
  });

  const inputIds = [
    'sync-n',
    'async-n',
    'sync-busy-n',
    'async-busy-n',
    'sync-memo-n',
    'async-memo-n',
  ];

  function nToSubmit(idString) {
    return `${idString.slice(0, idString.length - 2)}-submit`;
  }

  const numberInputs = inputIds.map(function(id) {
    return document.getElementById(id);
  });
  numberInputs.forEach(function(input) {
    input.onchange = function() {
      const submitButton = document.getElementById(nToSubmit(input.id));
      if (parseInt(input.value) > 0) {
        submitButton.disabled = false;
      } else {
        submitButton.disabled = true;
      }
    };
  });
});
