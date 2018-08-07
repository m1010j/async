import startAsync from '../click_handlers/async.js';
import startSync from '../click_handlers/sync.js';
import appendCode from './append_code.js';
import { hyphenize } from './convert_string.js';
import { Chart } from 'chart.js';

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
      datasets: [
        {
          label: '# of Votes',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
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

  fetch('/api/sync_benchmarks?avg=true', {
    method: 'GET',
  })
    .then(function(res) {
      return res.json();
    })
    .then(function(res) {
      const nums = Object.keys(res.data);
      nums.forEach(function(num) {
        chart.data.labels.push(num);
      });
      const avgs = nums.map(function(num) {
        return res.data[num];
      });
      avgs.forEach(function(avg) {
        chart.data.datasets[0].data.push(avg);
      });
      debugger;
    });

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
