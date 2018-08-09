import merge from 'lodash/merge';
import randomColor from 'randomcolor';
import { camelize, snakeCaseize } from './convert_string.js';

export function addData(types, options, chart) {
  chart.types = merge([], chart.types, types);
  if (types.length) {
    const type = types.pop();
    const { mode, browser, os, maxN } = options;
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
        dataset.label = `${mode} time ${camelize(type)}`;
        dataset.data = newData;
        chart.data.datasets.push(dataset);
        chart.update();
      })
      .then(function() {
        addData(types, options, chart);
      });
  }
}

export function removeData(type, chart) {
  const datasets = chart.data.datasets;
  for (let i = 0; i < datasets.length; i++) {
    const dataset = datasets[i];
    if (dataset.label.split(' ')[2] === type) {
      datasets.splice(i, 1);
      i = datasets.length;
    }
  }
  const typeIdx = chart.types.indexOf(snakeCaseize(type));
  if (typeIdx !== -1) {
    chart.types.splice(typeIdx, 1);
  }
  chart.update();
}

function mapValues(data, nums) {
  return nums.map(function(num) {
    return data[num];
  });
}

export function clearData(chart) {
  chart.data.labels = [];
  chart.data.datasets = [];
  chart.update();
}
