import { snakeCaseize } from '../../utils/convert_string.js';
import { addData } from './chart_util.js';
import {
  setUpTypes,
  setUpAvgOrMin,
  setUpBrowserCheckboxes,
  setUpOsRadios,
  setUpNumCoresRadios,
  setUpSlider,
  setUpResetChartButton,
} from './set_up_utils.js';
import getBrowserStr from './get_browser_str.js';

export default function() {
  const mode = localStorage.getItem('mode') || 'avg';
  const types = JSON.parse(localStorage.getItem('types')) || ['sync', 'async'];
  const browsers = JSON.parse(localStorage.getItem('browsers')) || [
    'all browsers',
  ];
  const os = localStorage.getItem('os') || 'undefined';
  const numCores = localStorage.getItem('numCores') || 'undefined';
  const maxN = localStorage.getItem('maxN') || '45';

  const ctx = document.getElementById('chart').getContext('2d');

  import(/* webpackChunkName: "Chart" */ 'chart.js').then(function({ Chart }) {
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

    chart.options = {
      mode,
      maxN,
      os,
      numCores,
      browsers,
      types: [],
    };
    window.types.forEach(function(camelType) {
      if (types.includes(camelType)) {
        const snakeCaseType = snakeCaseize(camelType);
        chart.options.types.push(snakeCaseType);
      }
    });

    addData(chart.options.types, chart.options.browsers, chart.options, chart);

    setUpTypes(chart);
    setUpAvgOrMin(chart);
    setUpBrowserCheckboxes(chart);
    setUpOsRadios(chart);
    setUpNumCoresRadios(chart);
    setUpSlider(chart);
    setUpResetChartButton(chart);
  });
}
