import setUpWorkerRadios from './views/benchmarks/set_up_worker_radios';
import render from './views/chart/render.js';
import setUpBenchmarks from './views/benchmarks/set_up.js';
import setUpAgreeButton from './views/agree_button/set_up.js';
import setUpChart from './views/chart/set_up.js';

document.addEventListener('DOMContentLoaded', function() {
  if (navigator.userAgent.match(/iPad/i) !== null) {
    document.getElementsByTagName('html')[0].style.fontSize = '1em';
  }

  setUpWorkerRadios();

  setUpAgreeButton();

  const chartContainerContainer = document.getElementById(
    'chart-container-container'
  );
  const main = document.getElementById('main');
  const benchmarksButton = document.getElementById('benchmarks-span');
  const resultsButton = document.getElementById('results-span');
  render(main, chartContainerContainer, resultsButton, benchmarksButton);
  window.onhashchange = function() {
    render(main, chartContainerContainer, resultsButton, benchmarksButton);
  };
  benchmarksButton.onclick = function() {
    window.location.hash = 'benchmarks';
  };
  resultsButton.onclick = function() {
    window.location.hash = 'results';
  };

  if (window.location.hash === 'benchmarks') {
    setUpChart();
    window.chartIsSetUp = true;
  }

  setUpBenchmarks();
});
