import { hyphenize, snakeCaseize } from '../../utils/convert_string.js';
import unselectOthers from './unselect_others.js';
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
} from './set.js';
import getBrowserStr from './get_browser_str.js';

export function setUpTypes(chart) {
  setTypes(window.types, chart.options.types);
  window.types.forEach(function(type) {
    const hyphenizedType = hyphenize(type);
    const snakeCasedType = snakeCaseize(type);

    const typeCheckbox = document.getElementById(`${hyphenizedType}-checkbox`);
    typeCheckbox.onclick = function() {
      if (this.checked) {
        if (!chart.options.types.includes(type)) {
          chart.options.types.push(type);
          localStorage.setItem('types', JSON.stringify(chart.options.types));
        }
        addData([snakeCasedType], chart.options.browsers, chart.options, chart);
      } else {
        const typeIdx = chart.options.types.indexOf(type);
        if (typeIdx !== -1) {
          chart.options.types.splice(typeIdx, 1);
          localStorage.setItem('types', JSON.stringify(chart.options.types));
        }
        removeDataForType(type, chart);
      }
    };
  });
}

export function setUpAvgOrMin(chart) {
  const avgOrMinRadios = document.getElementById('avg-or-min-radios');
  setAvgOrMin(avgOrMinRadios, chart.options.mode);
  for (let i = 0; i < avgOrMinRadios.length; i++) {
    const radio = avgOrMinRadios[i];
    radio.onclick = function() {
      chart.options.mode = radio.value;
      localStorage.setItem('mode', radio.value);
      unselectOthers(i, avgOrMinRadios);
      updateChart(chart);
    };
  }
}

export function setUpBrowserCheckboxes(chart) {
  const browserCheckboxes = document.getElementById('browser-checkboxes');
  for (let i = 0; i < browserCheckboxes.length; i++) {
    const checkbox = browserCheckboxes[i];
    const browserStr = getBrowserStr(checkbox);
    setBrowserCheckboxes(browserCheckboxes, chart.options.browsers);
    checkbox.onclick = function() {
      if (checkbox.checked) {
        chart.options.browsers.push(browserStr);
        addData(chart.options.types, [browserStr], chart.options, chart);
      } else {
        const browserIdx = browsers.indexOf(browserStr);
        if (browserIdx !== -1) {
          browsers.splice(browserIdx, 1);
        }
        removeDataForBrowsers([browserStr], chart);
      }
      localStorage.setItem('browsers', JSON.stringify(chart.options.browsers));
    };
  }
}

export function setUpOsRadios(chart) {
  const osRadios = document.getElementById('os-radios');
  for (let i = 0; i < osRadios.length; i++) {
    const radio = osRadios[i];
    setOsRadios(osRadios, chart.options.os);
    radio.onclick = function() {
      chart.options.os = radio.value;
      localStorage.setItem('os', radio.value);
      unselectOthers(i, osRadios);
      updateChart(chart);
    };
  }
}

export function setUpNumCoresRadios(chart) {
  const numCoresRadios = document.getElementById('num-cores-radios');
  for (let i = 0; i < numCoresRadios.length; i++) {
    setNumCoresRadios(numCoresRadios, chart.options.numCores);
    const radio = numCoresRadios[i];
    radio.onclick = function() {
      localStorage.setItem('numCores', radio.value);
      chart.options.numCores = radio.value;
      unselectOthers(i, numCoresRadios);
      updateChart(chart);
    };
  }
}

export function setUpSlider(chart) {
  const slider = document.getElementById('slider');
  slider.value = chart.options.maxN;
  const sliderSpan = document.getElementById('slider-span');
  sliderSpan.innerText = chart.options.maxN;
  slider.oninput = function() {
    const value = slider.value;
    sliderSpan.innerText = value;
  };
  slider.onchange = function() {
    const value = slider.value;
    localStorage.setItem('maxN', value);
    chart.options.maxN = value;
    clearData(chart);
    updateChart(chart);
  };
}

export function setUpResetChartButton(chart) {
  const avgOrMinRadios = document.getElementById('avg-or-min-radios');
  const browserCheckboxes = document.getElementById('browser-checkboxes');
  const osRadios = document.getElementById('os-radios');
  const numCoresRadios = document.getElementById('num-cores-radios');
  const slider = document.getElementById('slider');
  const sliderSpan = document.getElementById('slider-span');

  const resetChartButton = document.getElementById('reset-chart-button');
  resetChartButton.onclick = function(e) {
    e.preventDefault();
    chart.options.types = ['sync', 'async'];
    localStorage.setItem('types', JSON.stringify(chart.options.types));

    setTypes(window.types, chart.options.types);

    chart.options.mode = 'avg';
    setAvgOrMin(avgOrMinRadios, chart.options.mode);

    chart.options.browsers = ['all browsers'];
    localStorage.setItem('browsers', JSON.stringify(chart.options.browsers));
    setBrowserCheckboxes(browserCheckboxes, chart.options.browsers);

    chart.options.os = 'undefined';
    localStorage.setItem('os', chart.options.os);
    setOsRadios(osRadios, chart.options.os);

    chart.options.numCores = 'undefined';
    localStorage.setItem('numCores', chart.options.numCores);
    setNumCoresRadios(numCoresRadios, chart.options.numCores);

    chart.options.maxN = '45';
    localStorage.setItem('maxN', chart.options.maxN);
    slider.value = chart.options.maxN;
    sliderSpan.innerText = chart.options.maxN;

    updateChart(chart);
  };
}
