import nth from './nth.js';
import stringify from './stringify.js';

export default function(n, duration, result, type) {
  document.getElementById(`${type}-submit`).disabled = false;
  const spinnerContainer = document.getElementById(`${type}-spinner-container`);
  spinnerContainer.classList.add('hidden');
  let resultString = result.toString();
  if (!(resultString[1] === '.')) {
    resultString = stringify(result);
  }
  document.getElementById(`${type}-result`).innerHTML =
    `The ${nth(n)} ` + `Fibonacci number is ${resultString}.`;
  document.getElementById(`${type}-time`).innerHTML =
    `It took ` + `${stringify(duration)} milliseconds to calculate this.`;
}
