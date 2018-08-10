import startAsync from '../click_handlers/async.js';
import startSync from '../click_handlers/sync.js';
import appendCode from './append_code.js';
import { hyphenize, snakeCaseize } from './convert_string.js';
import { Chart } from 'chart.js';
import {
  addData,
  removeDataForType,
  removeDataForBrowsers,
  clearData,
  updateChart,
} from './chart_util.js';

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

  chart.types = window.types.filter(function(camelType) {
    if (['sync', 'async'].includes(camelType)) {
      return snakeCaseize(camelType);
    }
  });

  chart.options = {
    mode: 'avg',
    maxN: 45,
  };

  chart.browsers = ['all browsers'];

  addData(chart.types, chart.browsers, chart.options, chart);

  const main = document.getElementById('main');

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
    updateChart(chart);
  };

  ['avg', 'min'].forEach(function(mode) {
    const radio = document.getElementById(`${mode}-radio`);
    const otherMode = mode === 'avg' ? 'min' : 'avg';
    const otherRadio = document.getElementById(`${otherMode}-radio`);
    radio.onclick = function() {
      chart.options.mode = mode;
      otherRadio.checked = false;
      updateChart(chart);
    };
  });

  const checkboxes = [
    'all-browsers',
    'firefox',
    'chromium',
    'chrome',
    'opera',
    'safari',
    'edge',
    'firefox-mobile',
    'chrome-mobile',
    'opera-mobile',
    'mobile-safari',
    'uc-browser',
    'samsung-mobile',
    'chromium-based',
    'firefox-based',
  ].map(function(browserStr) {
    return document.getElementById(`${browserStr}-checkbox`);
  });
  checkboxes.forEach(function(checkbox) {
    checkbox.onchange = function() {
      const checkboxIdArr = checkbox.id.split('-');
      checkboxIdArr.pop();
      const browserStr = checkboxIdArr.join(' ');
      if (checkbox.checked) {
        addData(chart.types, [browserStr], chart.options, chart);
      } else {
        removeDataForBrowsers([browserStr], chart);
      }
    };
  });

  const osSelect = document.getElementById('os-select');
  osSelect.onchange = function(e) {
    chart.options.os = this.value.toLowerCase();
    updateChart(chart);
  };

  const numCoresSelect = document.getElementById('num-cores-select');
  numCoresSelect.onchange = function(e) {
    chart.options.numCores = this.value;
    updateChart(chart);
  };

  window.types.forEach(function(type) {
    const hyphenizedType = hyphenize(type);
    const snakeCasedType = snakeCaseize(type);

    const typeCheckbox = document.getElementById(`${hyphenizedType}-checkbox`);
    if (['sync', 'async'].includes(type)) {
      typeCheckbox.checked = true;
    }
    typeCheckbox.onclick = function() {
      if (this.checked) {
        addData([snakeCasedType], chart.browsers, chart.options, chart);
      } else {
        removeDataForType(type, chart);
      }
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
