import startAsync from '../click_handlers/async.js';
import startSync from '../click_handlers/sync.js';
import appendCode from './append_code.js';
import { hyphenize } from './convert_string.js';

export default function() {
  const main = document.getElementById('main');

  const types = [
    'sync',
    'async',
    'syncBusy',
    'asyncBusy',
    'syncMemo',
    'asyncMemo',
  ];

  const titles = {
    sync: 'Synchronous Fibonacci',
    async: 'Asynchronous Fibonacci',
    syncBusy: 'Synchronous Fibonacci with Busywork',
    asyncBusy: 'Asynchronous Fibonacci with Busywork',
    syncMemo: 'Memoized Synchronous Fibonacci',
    asyncMemo: 'Memoized Asynchronous Fibonacci',
  };

  types.forEach(function(type) {
    const hyphenizedType = hyphenize(type);
    const container = document.createElement('div');
    container.classList.add('container');
    container.id = `${hyphenizedType}-container`;

    const h2 = document.createElement('h2');
    h2.innerText = titles[type];
    container.append(h2);

    const source = document.createElement('div');
    source.classList.add('source');
    source.id = `${hyphenizedType}-source`;
    appendCode(type, source);
    container.append(source);

    const h3 = document.createElement('h3');
    h3.innerText = 'Benchmark';
    container.append(h3);

    const form = document.createElement('form');
    form.id = `${type}-form`;
    form.onsubmit = type[0] === 's' ? startSync(type) : startAsync(type);

    const numberInput = document.createElement('input');
    numberInput.id = `${hyphenizedType}-n`;
    numberInput.type = 'number';
    numberInput.placeholder = 'n';
    form.append(numberInput);

    const submitInput = document.createElement('input');
    submitInput.classList.add('submit');
    submitInput.id = `${hyphenizedType}-submit`;
    submitInput.type = 'submit';
    submitInput.disabled = true;
    submitInput.value = 'Invoke';
    form.append(submitInput);

    numberInput.onchange = function() {
      if (parseInt(numberInput.value) > 0) {
        submitInput.disabled = false;
      } else {
        submitInput.disabled = true;
      }
    };

    container.append(form);

    const resultContainer = document.createElement('div');
    resultContainer.classList.add('result-container');

    const result = document.createElement('div');
    result.classList.add('result');
    result.id = `${hyphenizedType}-result`;
    resultContainer.append(result);

    const resultTime = document.createElement('div');
    resultTime.classList.add('result');
    resultTime.id = `${hyphenizedType}-time`;
    resultContainer.append(resultTime);

    container.append(resultContainer);

    main.append(container);
  });
}
