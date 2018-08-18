import nth from './nth.js';
import stringify from './stringify.js';

export default function(n, duration, result, type) {
  const button = document.getElementById(`${type}-submit`);
  const numberInput = document.getElementById(`${type}-n`);
  button.disabled = false;
  numberInput.disabled = false;
  numberInput.focus();

  const spinnerContainer = document.getElementById(`${type}-spinner-container`);
  spinnerContainer.classList.add('hidden');
  let resultString = result.toString();
  if (resultString[1] !== '.' && resultString !== 'Infinity') {
    resultString = stringify(result);
  }
  document.getElementById(`${type}-result`).innerHTML =
    `The ${nth(n)} ` + `Fibonacci number is ${resultString}.`;
  document.getElementById(`${type}-time`).innerHTML =
    `It took ` + `${stringify(duration)} milliseconds to calculate this.`;
}
