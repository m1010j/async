import startAsync from '../click_handlers/async.js';
import startSync from '../click_handlers/sync.js';
import appendCode from './append_code.js';
import { hyphenize } from './convert_string.js';
import { Chart } from 'chart.js';
import merge from 'lodash/merge';
import randomColor from 'randomcolor';

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

  const types = [
    // 'sync',
    // 'sync_busy',
    // 'sync_memo',
    'async',
    // 'async_busy',
    'async_memo',
  ];
  types.forEach(function(type) {
    addData(type, 'min', chart);
  });
  // types.forEach(function(type) {
  //   addData(type, 'avg', chart);
  // });

  const main = document.getElementById('main');

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

  window.types = null;
  document
    .getElementsByTagName('head')[0]
    .removeChild(document.getElementById('types'));
}

function addData(type, mode, chart) {
  const emptyDataset = {
    label: '',
    data: [],
    backgroundColor: ['rgba(255, 255, 255, 0)'],
    borderColor: ['rgba(255,99,132,1)'],
    borderWidth: 2,
  };

  fetch(`/api/${type}_benchmarks?mode=${mode}`, {
    method: 'GET',
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      const nums = Object.keys(res.data);
      chart.data.labels = merge([], chart.data.labels, nums).sort(function(
        a,
        b
      ) {
        return parseInt(a) - parseInt(b);
      });
      const avgs = nums.map(function(num) {
        return res.data[num];
      });
      const dataset = merge({}, emptyDataset);
      dataset.borderColor = [randomColor()];
      dataset.label = `${mode} time ${type.split('_').join(' ')}`;
      dataset.data = avgs;
      chart.data.datasets.push(dataset);
      const test = chart.update();
    });
}
