import startAsync from '../click_handlers/async.js';
import startSync from '../click_handlers/sync.js';
import appendCode from './append_code.js';
import setUpChart from './set_up_chart.js';
import { hyphenize, snakeCaseize } from './convert_string.js';
import { renderResults, renderBenchmarks, render } from './render.js';

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
  render(main, chartContainerContainer, resultsButton, benchmarksButton);
  window.onhashchange = function() {
    render(main, chartContainerContainer, resultsButton, benchmarksButton);
  };
  benchmarksButton.onclick = function() {
    window.location.hash = 'benchmarks';
  };
  resultsButton.onclick = function() {
    window.location.hash = 'results';
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
