import { Chart } from 'chart.js';
import { hyphenize, snakeCaseize } from './convert_string.js';
import {
  addData,
  removeDataForType,
  removeDataForBrowsers,
  clearData,
  updateChart,
} from './chart_util.js';
import unselectOthers from './unselect_others.js';

export default function() {
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

  const avgOrMinRadios = document.getElementById('avg-or-min-radios');
  for (let i = 0; i < avgOrMinRadios.length; i++) {
    const radio = avgOrMinRadios[i];
    radio.onclick = function() {
      chart.options.mode = radio.value;
      unselectOthers(i, avgOrMinRadios);
      updateChart(chart);
    };
  }

  const browserCheckboxes = document.getElementById('browser-checkboxes');
  for (let i = 0; i < browserCheckboxes.length; i++) {
    const checkbox = browserCheckboxes[i];
    checkbox.onclick = function() {
      const checkboxIdArr = checkbox.id.split('-');
      checkboxIdArr.pop();
      const browserStr = checkboxIdArr.join(' ');
      if (checkbox.checked) {
        addData(chart.types, [browserStr], chart.options, chart);
      } else {
        removeDataForBrowsers([browserStr], chart);
      }
    };
  }

  const osRadios = document.getElementById('os-radios');
  for (let i = 0; i < osRadios.length; i++) {
    const radio = osRadios[i];
    radio.onclick = function() {
      chart.options.os = radio.value;
      unselectOthers(i, osRadios);
      updateChart(chart);
    };
  }

  const numCores = document.getElementById('num-cores-radios');
  for (let i = 0; i < numCores.length; i++) {
    const radio = numCores[i];
    radio.onclick = function() {
      chart.options.numCores = radio.value;
      unselectOthers(i, numCores);
      updateChart(chart);
    };
  }

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
  });
}
