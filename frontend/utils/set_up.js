import startAsync from '../click_handlers/async.js';
import startSync from '../click_handlers/sync.js';
import appendCode from './append_code.js';
import setUpChart from './set_up_chart.js';
import { hyphenize, snakeCaseize } from './convert_string.js';

export default function() {
  const agreeButton = document.getElementById('agree-button');
  if (agreeButton) {
    agreeButton.onclick = function(e) {
      fetch('/agree_to_privacy_notice', {
        method: 'GET',
      }).then(function() {
        document
          .getElementsByClassName('privacy-notice-container')[0]
          .classList.add('hidden');
      });
    };
  }

  const chartContainerContainer = document.getElementById(
    'chart-container-container'
  );
  const main = document.getElementById('main');

  const benchmarksButton = document.getElementById('benchmarks-span');
  const resultsButton = document.getElementById('results-span');
  benchmarksButton.onclick = function() {
    chartContainerContainer.style.display = 'none';
    main.style.display = 'flex';
    benchmarksButton.classList.add('bold');
    resultsButton.classList.remove('bold');
  };
  resultsButton.onclick = function() {
    main.style.display = 'none';
    chartContainerContainer.style.display = 'flex';
    resultsButton.classList.add('bold');
    benchmarksButton.classList.remove('bold');
  };

  setUpChart();

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
