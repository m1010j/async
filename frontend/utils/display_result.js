import nth from './nth.js';

export default function(n, duration, result, type) {
  document.getElementById(`${type}-submit`).disabled = false;
  const spinnerContainer = document.getElementById(`${type}-spinner-container`);
  spinnerContainer.classList.add('hidden');
  document.getElementById(`${type}-result`).innerHTML =
    `The ${nth(n)} ` + `Fibonacci number is ${result}.`;
  document.getElementById(`${type}-time`).innerHTML =
    `It took ` + `${duration} milliseconds to calculate this.`;
}
