import { hyphenize } from '../../utils/convert_string.js';
import appendCode from './append_code.js';
import startSync from '../../click_handlers/sync.js';
import startAsync from '../../click_handlers/async.js';

export default function() {
  window.types.forEach(function(type) {
    const hyphenizedType = hyphenize(type);

    const source = document.getElementById(`${hyphenizedType}-source`);
    appendCode(type, source);

    const form = document.getElementById(`${hyphenizedType}-form`);
    form.onsubmit = type[0] === 's' ? startSync(type) : startAsync(type);

    const numberInput = document.getElementById(`${hyphenizedType}-n`);
    const submitInput = document.getElementById(`${hyphenizedType}-submit`);
    ['change', 'keyup'].forEach(function(eventType) {
      numberInput.addEventListener(eventType, function(e) {
        if (!(e.key === 'Enter')) {
          if (parseInt(numberInput.value) > 0) {
            submitInput.disabled = false;
          } else {
            submitInput.disabled = true;
          }
        }
      });
    });
  });
}
