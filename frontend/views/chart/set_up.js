import { snakeCaseize } from '../../utils/convert_string.js';
import { addData } from './chart_util.js';
import {
  setUpTypes,
  setUpAvgOrMin,
  setUpBrowserCheckboxes,
  setUpWorkerCheckboxes,
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
  const workers = JSON.parse(localStorage.getItem('workers')) || [
    'with worker',
  ];
  const os = localStorage.getItem('os') || 'undefined';
  const numCores = localStorage.getItem('numCores') || 'undefined';
  const maxN = localStorage.getItem('maxN') || '45';

  const ctx = document.getElementById('chart').getContext('2d');

  import(/* webpackChunkName: "Chart" */ 'chart.js').then(function({ Chart }) {
    const lightGray = '#d6deeb';
    const fontSize = 15;
    const fontFamily = '"Arsenal", sans-serif';
    const fontStyle = {
      fontColor: lightGray,
      fontFamily: fontFamily,
      fontSize,
      fontVariant: 'small-caps',
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
              gridLines: { color: lightGray },
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
                color: lightGray,
                borderDash: [1, 10],
              },
            },
          ],
        },
        legend: {
          labels: fontStyle,
        },
        title: {
          display: true,
          fontSize: fontSize + 2,
          fontFamily,
          fontColor: '#ff635d',
        },
      },
    });

    chart.appOptions = {
      mode,
      maxN,
      os,
      numCores,
      browsers,
      workers,
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
      chart.appOptions.workers,
      chart.appOptions.browsers,
      chart.appOptions,
      chart
    );

    setUpTypes(chart);
    setUpAvgOrMin(chart);
    setUpBrowserCheckboxes(chart);
    setUpWorkerCheckboxes(chart);
    setUpOsRadios(chart);
    setUpNumCoresRadios(chart);
    setUpSlider(chart);
    setUpResetChartButton(chart);
  });
}
