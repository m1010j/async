import startAsync from './click_handlers/async.js';
import startSync from './click_handlers/sync.js';
import appendCode from './utils/append_code.js';
import { hyphenize } from './utils/convert_string.js';

document.addEventListener('DOMContentLoaded', function() {
  window.syncTypes.concat(window.asyncTypes).forEach(function(type) {
    const source = document.getElementById(`${hyphenize(type)}-source`);
    appendCode(type, source);
  });

  window.syncTypes.forEach(function(type) {
    const form = document.getElementById(`${hyphenize(type)}-form`);
    form.onsubmit = startSync(type);
  });

  window.asyncTypes.forEach(function(type) {
    const form = document.getElementById(`${hyphenize(type)}-form`);
    form.onsubmit = startAsync(type);
  });

  const inputIds = window.syncTypes
    .concat(window.asyncTypes)
    .map(function(type) {
      return `${hyphenize(type)}-n`;
    });

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
