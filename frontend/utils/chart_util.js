import merge from 'lodash/merge';
import randomColor from 'randomcolor';
import { camelize, snakeCaseize } from './convert_string.js';

export function addData(types, browsers, options, chart) {
  chart.types = merge([], chart.types, types);
  browsers.forEach(function(browser) {
    if (!chart.browsers.includes(browser)) {
      chart.browsers.push(browser);
    }
  });
  if (chart.browsers.length > 1) {
    const allIdx = chart.browsers.indexOf('all');
    if (allIdx !== -1) {
      chart.browsers.splice(allIdx, 1);
    }
  }
  const typesAndBrowsers = [];
  types.forEach(function(type) {
    browsers.forEach(function(browser) {
      typesAndBrowsers.push([type, browser]);
    });
  });
  _addData(typesAndBrowsers, options, chart);
}

function _addData(typesAndBrowsers, options, chart) {
  if (typesAndBrowsers.length) {
    let [type, browser] = typesAndBrowsers.pop();
    if (browser === 'all') {
      browser = 'undefined';
    }
    const { mode, os, maxN } = options;
    const emptyDataset = {
      label: '',
      data: [],
      backgroundColor: ['rgba(255, 255, 255, 0)'],
      borderWidth: 2,
    };

    fetch(
      `/api/${type}_benchmarks?mode=${mode}&browser=${browser}&os=${os}` +
        `&max_n=${maxN}`,
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
        dataset.borderColor = [randomColor()];
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
  const datasets = chart.data.datasets;
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    const datasetLabelArr = dataset.label.split(' ');
    if (datasetLabelArr[datasetLabelArr.length - 1] === type) {
      datasets.splice(i, 1);
    }
  }
  const typeIdx = chart.types.indexOf(snakeCaseize(type));
  if (typeIdx !== -1) {
    chart.types.splice(typeIdx, 1);
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
        datasets[i] = null;
      }
    }
    chart.data.datasets = chart.data.datasets.filter(function(dataset) {
      if (dataset) return dataset;
    });

    const browserIdx = chart.browsers.indexOf(browser);
    if (browserIdx !== -1) {
      chart.browsers.splice(browserIdx, 1);
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
  addData(chart.types, chart.browsers, chart.options, chart);
}

function mapValues(data, nums) {
  return nums.map(function(num) {
    return data[num];
  });
}
