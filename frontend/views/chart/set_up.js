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
    const color = '#d6deeb';
    const fontSize = 15;
    const fontStyle = {
      fontColor: color,
      fontFamily: '"Arsenal", sans-serif',
      fontSize,
    };
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [],
      },
      options: {
        tooltips: {
          titleFontSize: fontSize + 2,
          bodyFontSize: fontSize,
          backgroundColor: '#011627',
        },
        scales: {
          yAxes: [
            {
              ticks: Object.assign(
                {
                  beginAtZero: true,
                },
                fontStyle
              ),
              gridLines: { color },
            },
          ],
          xAxes: [
            {
              ticks: Object.assign(
                {
                  beginAtZero: true,
                },
                fontStyle
              ),
              gridLines: {
                color,
                borderDash: [1, 10],
              },
            },
          ],
        },
        legend: {
          labels: fontStyle,
        },
      },
    });

    chart.appOptions = {
      mode,
      maxN,
      os,
      numCores,
      browsers,
      types: [],
    };
    window.types.forEach(function(camelType) {
      const snakeCaseType = snakeCaseize(camelType);
      if (types.includes(snakeCaseType)) {
        chart.appOptions.types.push(snakeCaseType);
      }
    });

    addData(
      chart.appOptions.types,
      chart.appOptions.browsers,
      chart.appOptions,
      chart
    );

    setUpTypes(chart);
    setUpAvgOrMin(chart);
    setUpBrowserCheckboxes(chart);
    setUpOsRadios(chart);
    setUpNumCoresRadios(chart);
    setUpSlider(chart);
    setUpResetChartButton(chart);
  });
}
