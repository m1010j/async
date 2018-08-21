import { hyphenize, snakeCaseize } from '../../utils/convert_string.js';
import {
  addData,
  removeDataForType,
  removeDataForBrowsers,
  clearData,
  updateChart,
} from './chart_util.js';
import {
  setAvgOrMin,
  setBrowserCheckboxes,
  setOsRadios,
  setTypes,
  setNumCoresRadios,
  setWorkerCheckboxes,
} from './set.js';
import getBrowserStr from './get_browser_str.js';

export function setUpTypes(chart) {
  setTypes(window.types, chart.appOptions.types);
  window.types.forEach(function(type) {
    const hyphenizedType = hyphenize(type);
    const snakeCasedType = snakeCaseize(type);

    const typeCheckbox = document.getElementById(`${hyphenizedType}-checkbox`);
    typeCheckbox.onclick = function() {
      if (this.checked) {
        if (!chart.appOptions.types.includes(snakeCasedType)) {
          chart.appOptions.types.push(snakeCasedType);
          localStorage.setItem('types', JSON.stringify(chart.appOptions.types));
        }
        addData(
          [snakeCasedType],
          chart.appOptions.browsers,
          chart.appOptions,
          chart
        );
      } else {
        const typesCopy = chart.appOptions.types.slice();
        const typeIdx = typesCopy.indexOf(type);
        if (typeIdx !== -1) {
          typesCopy.splice(typeIdx, 1);
          localStorage.setItem('types', JSON.stringify(typesCopy));
        }
        removeDataForType(snakeCasedType, chart);
      }
    };
  });
}

export function setUpAvgOrMin(chart) {
  const avgOrMinRadios = document.getElementById('avg-or-min-radios');
  setAvgOrMin(avgOrMinRadios, chart.appOptions.mode);
  for (let i = 0; i < avgOrMinRadios.length; i++) {
    const radio = avgOrMinRadios[i];
    radio.onclick = function() {
      chart.appOptions.mode = radio.value;
      localStorage.setItem('mode', radio.value);
      updateChart(chart);
    };
  }
}

export function setUpBrowserCheckboxes(chart) {
  const browserCheckboxes = document.getElementById('browser-checkboxes');
  for (let i = 0; i < browserCheckboxes.length; i++) {
    const checkbox = browserCheckboxes[i];
    const browserStr = getBrowserStr(checkbox);
    setBrowserCheckboxes(browserCheckboxes, chart.appOptions.browsers);
    checkbox.onclick = function() {
      if (checkbox.checked) {
        chart.appOptions.browsers.push(browserStr);
        addData(chart.appOptions.types, [browserStr], chart.appOptions, chart);
      } else {
        const browserIdx = chart.appOptions.browsers.indexOf(browserStr);
        if (browserIdx !== -1) {
          chart.appOptions.browsers.splice(browserIdx, 1);
        }
        removeDataForBrowsers([browserStr], chart);
      }
      localStorage.setItem(
        'browsers',
        JSON.stringify(chart.appOptions.browsers)
      );
    };
  }
}

export function setUpWorkerCheckboxes(chart) {
  const workerCheckboxes = document.getElementById('worker-checkboxes');
  for (let i = 0; i < workerCheckboxes.length; i++) {
    const checkbox = workerCheckboxes[i];
    setWorkerCheckboxes(workerCheckboxes, chart.appOptions.workers);
    checkbox.onclick = function() {
      if (checkbox.checked) {
        chart.appOptions.workers.push(checkbox.value);
        // addData(chart.appOptions.types, [workerStr], chart.appOptions, chart);
      } else {
        const workerIdx = chart.appOptions.workers.indexOf(checkbox.value);
        if (workerIdx !== -1) {
          chart.appOptions.workers.splice(workerIdx, 1);
        }
        // removeDataForWorkers([workerStr], chart);
      }
      localStorage.setItem('workers', JSON.stringify(chart.appOptions.workers));
    };
  }
}

export function setUpOsRadios(chart) {
  const osRadios = document.getElementById('os-radios');
  for (let i = 0; i < osRadios.length; i++) {
    const radio = osRadios[i];
    setOsRadios(osRadios, chart.appOptions.os);
    radio.onclick = function() {
      chart.appOptions.os = radio.value;
      localStorage.setItem('os', radio.value);
      updateChart(chart);
    };
  }
}

export function setUpNumCoresRadios(chart) {
  const numCoresRadios = document.getElementById('num-cores-radios');
  for (let i = 0; i < numCoresRadios.length; i++) {
    setNumCoresRadios(numCoresRadios, chart.appOptions.numCores);
    const radio = numCoresRadios[i];
    radio.onclick = function() {
      localStorage.setItem('numCores', radio.value);
      chart.appOptions.numCores = radio.value;
      updateChart(chart);
    };
  }
}

export function setUpSlider(chart) {
  const slider = document.getElementById('slider');
  slider.value = chart.appOptions.maxN;
  const sliderSpan = document.getElementById('slider-span');
  sliderSpan.innerText = chart.appOptions.maxN;
  slider.oninput = function() {
    const value = slider.value;
    sliderSpan.innerText = value;
  };
  slider.onchange = function() {
    const value = slider.value;
    localStorage.setItem('maxN', value);
    chart.appOptions.maxN = value;
    clearData(chart);
    updateChart(chart);
  };
}

export function setUpResetChartButton(chart) {
  const avgOrMinRadios = document.getElementById('avg-or-min-radios');
  const browserCheckboxes = document.getElementById('browser-checkboxes');
  const workerCheckboxes = document.getElementById('worker-checkboxes');
  const osRadios = document.getElementById('os-radios');
  const numCoresRadios = document.getElementById('num-cores-radios');
  const slider = document.getElementById('slider');
  const sliderSpan = document.getElementById('slider-span');

  const resetChartButton = document.getElementById('reset-chart-button');
  resetChartButton.onclick = function(e) {
    e.preventDefault();
    chart.appOptions.types = ['sync', 'async'];
    localStorage.setItem('types', JSON.stringify(chart.appOptions.types));

    setTypes(window.types, chart.appOptions.types);

    chart.appOptions.mode = 'avg';
    setAvgOrMin(avgOrMinRadios, chart.appOptions.mode);

    chart.appOptions.browsers = ['all browsers'];
    localStorage.setItem('browsers', JSON.stringify(chart.appOptions.browsers));
    setBrowserCheckboxes(browserCheckboxes, chart.appOptions.browsers);

    chart.appOptions.workers = ['yes'];
    localStorage.setItem('workers', JSON.stringify(chart.appOptions.workers));
    setWorkerCheckboxes(workerCheckboxes, chart.appOptions.workers);

    chart.appOptions.os = 'undefined';
    localStorage.setItem('os', chart.appOptions.os);
    setOsRadios(osRadios, chart.appOptions.os);

    chart.appOptions.numCores = 'undefined';
    localStorage.setItem('numCores', chart.appOptions.numCores);
    setNumCoresRadios(numCoresRadios, chart.appOptions.numCores);

    chart.appOptions.maxN = '45';
    localStorage.setItem('maxN', chart.appOptions.maxN);
    slider.value = chart.appOptions.maxN;
    sliderSpan.innerText = chart.appOptions.maxN;

    updateChart(chart);
  };
}
