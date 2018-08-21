import merge from 'lodash/merge';
import randomColor from 'randomcolor';
import { camelize } from '../../utils/convert_string.js';

export function addData(types, workers, browsers, options, chart) {
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
  const typesAndBrowsersAndWorkers = [];
  types.forEach(function(type) {
    workers.forEach(function(worker) {
      browsers.forEach(function(browser) {
        typesAndBrowsersAndWorkers.push([type, worker, browser]);
      });
    });
  });
  _addData(typesAndBrowsersAndWorkers, options, chart);
  updateTitle(chart);
}

function _addData(typesAndBrowsersAndWorkers, options, chart) {
  if (typesAndBrowsersAndWorkers.length) {
    let [type, worker, browser] = typesAndBrowsersAndWorkers.pop();
    if (browser === 'all browsers') {
      browser = 'undefined';
    }
    let withWorker;
    if (!worker) {
      withWorker = 'undefined';
    } else if (worker === 'with worker') {
      withWorker = 'true';
    } else if (worker === 'without worker') {
      withWorker = 'false';
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
      `/api/${type}_benchmarks?mode=${mode}&with_worker=${withWorker}&browser=${browser}&os=${os}` +
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
        const newLabels = chart.data.labels.slice();
        nums.forEach(function(num) {
          if (!newLabels.includes(num)) {
            newLabels.push(num);
          }
        });
        chart.data.labels = newLabels.sort(function(a, b) {
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
        dataset.label = `${browserLabel} ${mode} time ${camelize(
          type
        )} ${worker}`;
        dataset.data = newData;
        chart.data.datasets.push(dataset);
        chart.update();
      })
      .then(function() {
        _addData(typesAndBrowsersAndWorkers, options, chart);
      });
  }
}

export function removeDataForType(type, chart) {
  const camelType = camelize(type);
  const datasets = chart.data.datasets;
  removeDataset(datasets, camelize(type));

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
    removeDataset(datasets, browser);

    const browserIdx = chart.appOptions.browsers.indexOf(browser);
    if (browserIdx !== -1) {
      chart.appOptions.browsers.splice(browserIdx, 1);
    }
  });
  chart.update();
}

export function removeDataForWorkers(workers, chart) {
  const datasets = chart.data.datasets;
  workers.forEach(function(worker) {
    removeDataset(datasets, worker);

    const workerIdx = chart.appOptions.workers.indexOf(worker);
    if (workerIdx !== -1) {
      chart.appOptions.workers.splice(workerIdx, 1);
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
  const avgOrMin = chart.appOptions.mode === 'avg' ? 'Average' : 'Minimum';
  let os = osStrings[chart.appOptions.os];
  if (['undefined', undefined].includes(chart.appOptions.os)) {
    os = 'any operating system';
  }
  let numCores = chart.appOptions.numCores;
  if (['undefined', undefined].includes(chart.appOptions.numCores)) {
    numCores = 'any number of';
  }
  chart.options.title.text =
    `${avgOrMin} calculation times (in milliseconds) per input size on ` +
    `${os} on devices with ${numCores} logical cores`;
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

function removeDataset(datasets, str) {
  str = ' ' + str + ' ';
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    const datasetLabel = dataset.label + ' ';
    for (let j = 0; j < datasetLabel.length - str.length + 1; j++) {
      const labelSubStr = datasetLabel.slice(j, j + str.length);
      const nextCh = datasetLabel.slice(j + str.length, j + str.length + 1);
      if (labelSubStr === str && nextCh !== 'b') {
        datasets.splice(i, 1);
        i--;
        break;
      }
    }
  }
}
