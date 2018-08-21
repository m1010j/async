import functions from '../utils/functions.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/async.js';
import post from '../utils/fetch.js';
import { hyphenize, snakeCaseize } from '../utils/convert_string.js';

export default function(type) {
  return function(e) {
    e.preventDefault();

    const hyphenizedType = hyphenize(type);

    const button = document.getElementById(`${hyphenizedType}-submit`);
    const numberInput = document.getElementById(`${hyphenizedType}-n`);
    button.disabled = true;
    numberInput.disabled = true;

    const spinnerContainer = document.getElementById(
      `${hyphenizedType}-spinner-container`
    );
    spinnerContainer.classList.remove('hidden');

    const n = parseInt(document.getElementById(`${hyphenizedType}-n`).value);
    const resultDiv = document.getElementById(`${hyphenizedType}-result`);
    const timeDiv = document.getElementById(`${hyphenizedType}-time`);

    let worker;
    if (window.useWorker[type]) {
      worker = new Worker('./workers/async.js');

      worker.postMessage({ n, type });
      worker.onmessage = function(e) {
        displayResult(n, e.data.duration, e.data.result, hyphenizedType);
        worker.terminate();
        post(`${snakeCaseize(type)}`, n, e.data.duration, true);
      };
    } else {
      const beforeTime = new Date().getTime();
      functions[type](n).then(function(result) {
        const afterTime = new Date().getTime();
        const duration = afterTime - beforeTime;
        displayResult(n, duration, result, hyphenizedType);
        post(`${snakeCaseize(type)}`, n, duration, false);
      });
    }
  };
}
