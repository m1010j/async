import startAsync from '../click_handlers/async.js';
import startSync from '../click_handlers/sync.js';
import appendCode from './append_code.js';
import { hyphenize, snakeCaseize } from './convert_string.js';
import { Chart } from 'chart.js';
import { addData, removeData, clearData } from './chart_util.js';

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

  const ctx = document.getElementById('chart').getContext('2d');
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  chart.types = window.types.map(function(camelType) {
    return snakeCaseize(camelType);
  });

  chart.options = {
    mode: 'avg',
    browser: 'safari',
    os: 'mac os x',
    maxN: 45,
  };
  addData(chart.types, chart.options, chart);

  const main = document.getElementById('main');

  window.types.forEach(function(type) {
    const hyphenizedType = hyphenize(type);
    const snakeCasedType = snakeCaseize(type);

    const typeCheckbox = document.getElementById(`${hyphenizedType}-checkbox`);
    typeCheckbox.onclick = function() {
      if (typeCheckbox.checked) {
        addData([snakeCasedType], chart.options, chart);
      } else {
        removeData(type, chart);
      }
    };

    const slider = document.getElementById('slider');
    slider.oninput = function() {
      const value = slider.value;
      const sliderSpan = document.getElementById('slider-span');
      sliderSpan.innerText = value;
    };
    slider.onchange = function() {
      const value = slider.value;
      chart.options.maxN = parseInt(value);
      clearData(chart);
      addData(chart.types, chart.options, chart);
    };

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
