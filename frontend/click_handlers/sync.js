import { syncFib } from '../fib_functions/sync.js';
import displayResult from '../utils/display_result.js';
import Worker from 'worker-loader!../workers/sync.js';
import { post } from '../utils/fetch.js';
import { hyphenize, snakeCaseize } from '../utils/convert_string.js';

export default function(type) {
  return function(e) {
    e.preventDefault();

    const hyphenizedType = hyphenize(type);

    const button = document.getElementById(`${hyphenizedType}-submit`);
    button.disabled = true;

    const spinnerContainer = document.getElementById(
      `${hyphenizedType}-spinner-container`
    );
    spinnerContainer.classList.remove('hidden');

    const n = parseInt(document.getElementById(`${hyphenizedType}-n`).value);
    const resultDiv = document.getElementById(`${hyphenizedType}-result`);
    const timeDiv = document.getElementById(`${hyphenizedType}-time`);

    let worker;
    if (window.Worker) {
      worker = new Worker(`./workers/sync.js`);
      const beforeTime = new Date().getTime();
      worker.postMessage({ n, type });
      worker.onmessage = function(e) {
        const afterTime = new Date().getTime();
        const duration = afterTime - beforeTime;
        displayResult(n, duration, e.data.n, hyphenizedType);
        worker.terminate();
        post(`${snakeCaseize(type)}`, n, duration);
      };
    } else {
      const beforeTime = new Date().getTime();
      const result = eval(`${type}Fib`)(n);
      const afterTime = new Date().getTime();
      const duration = afterTime - beforeTime;
      displayResult(n, duration, result, hyphenizedType);
      post(`${snakeCaseize(type)}`, n, duration);
    }
  };
}
