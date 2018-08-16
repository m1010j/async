import merge from 'lodash/merge';
import randomColor from 'randomcolor';
import { camelize } from '../../utils/convert_string.js';

export function addData(types, browsers, options, chart) {
  const newTypes = chart.appOptions.types.slice();
  types.forEach(function(type) {
    if (!newTypes.includes(type)) {
      newTypes.push(type);
    }
  });
  chart.appOptions.types = newTypes;
  browsers.forEach(function(browser) {
    if (!chart.appOptions.browsers.includes(browser)) {
      chart.appOptions.browsers.push(browser);
    }
  });
  const typesAndBrowsers = [];
  types.forEach(function(type) {
    browsers.forEach(function(browser) {
      typesAndBrowsers.push([type, browser]);
    });
  });
  _addData(typesAndBrowsers, options, chart);
  updateTitle(chart);
}

function _addData(typesAndBrowsers, options, chart) {
  if (typesAndBrowsers.length) {
    let [type, browser] = typesAndBrowsers.pop();
    if (browser === 'all browsers') {
      browser = 'undefined';
    }
    const { mode, os, maxN, numCores } = options;
    const emptyDataset = {
      label: '',
      data: [],
      backgroundColor: ['rgba(255, 255, 255, 0)'],
      borderWidth: 2,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: '#ff635d',
    };

    fetch(
      `/api/${type}_benchmarks?mode=${mode}&browser=${browser}&os=${os}` +
        `&max_n=${maxN}&num_cores=${numCores}`,
      {
        method: 'GET',
      }
    )
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

        chart.data.datasets.forEach(function(dataset) {
          dataset.data = mapValues(dataset.resData, chart.data.labels);
        });

        const newData = mapValues(res.data, chart.data.labels);
        const dataset = merge({}, emptyDataset);
        dataset.resData = res.data;
        dataset.borderColor = [randomColor({ luminosity: 'light' })];
        let browserLabel = browser;
        if (browserLabel === 'undefined') {
          browserLabel = 'all browsers';
        }
        dataset.label = `${browserLabel} ${mode} time ${camelize(type)}`;
        dataset.data = newData;
        chart.data.datasets.push(dataset);
        chart.update();
      })
      .then(function() {
        _addData(typesAndBrowsers, options, chart);
      });
  }
}

export function removeDataForType(type, chart) {
  const camelType = camelize(type);
  const datasets = chart.data.datasets;
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    const datasetLabelArr = dataset.label.split(' ');
    if (datasetLabelArr[datasetLabelArr.length - 1] === camelType) {
      datasets.splice(i, 1);
      i--;
    }
  }
  const typeIdx = chart.appOptions.types.indexOf(type);
  if (typeIdx !== -1) {
    chart.appOptions.types.splice(typeIdx, 1);
    localStorage.setItem('types', JSON.stringify(chart.appOptions.types));
  }
  chart.update();
}

export function removeDataForBrowsers(browsers, chart) {
  const datasets = chart.data.datasets;
  browsers.forEach(function(browser) {
    for (let i = 0; i < datasets.length; i++) {
      const dataset = datasets[i];
      const datasetLabelArr = dataset.label.split(' ');
      const browserArr = browser.split(' ');
      if (datasetLabelArr.slice(0, browserArr.length).join(' ') === browser) {
        datasets.splice(i, 1);
        i--;
      }
    }

    const browserIdx = chart.appOptions.browsers.indexOf(browser);
    if (browserIdx !== -1) {
      chart.appOptions.browsers.splice(browserIdx, 1);
    }
  });
  chart.update();
}

export function clearData(chart) {
  chart.data.labels = [];
  chart.data.datasets = [];
  chart.update();
}

export function updateChart(chart) {
  clearData(chart);
  updateTitle(chart);
  addData(
    chart.appOptions.types,
    chart.appOptions.browsers,
    chart.appOptions,
    chart
  );
}

function updateTitle(chart) {
  const chartTitle = document.getElementById('chart-title');
  const avgOrMin = chart.appOptions.mode === 'avg' ? 'Average' : 'Minimum';
  let os = osStrings[chart.appOptions.os];
  if (['undefined', undefined].includes(chart.appOptions.os)) {
    os = 'any operating system';
  }
  let numCores = chart.appOptions.numCores;
  if (['undefined', undefined].includes(chart.appOptions.numCores)) {
    numCores = 'any number of';
  }
  chartTitle.innerText =
    `${avgOrMin} calculation times (in milliseconds) per input size on ` +
    `${os} using ${numCores} logical cores`;
}

const osStrings = {
  'mac os': 'macOS',
  windows: 'Windows',
  linux: 'Linux',
  ubuntu: 'Ubuntu',
  android: 'Android',
  ios: 'iOS',
};

function mapValues(data, nums) {
  return nums.map(function(num) {
    return data[num];
  });
}
