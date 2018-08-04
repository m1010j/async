import nth from './nth.js';

export default function(n, button, duration, resultDiv, timeDiv, result) {
  button.disabled = false;
  resultDiv.innerHTML = `The ${nth(n)} ` + `Fibonacci number is ${result}.`;
  timeDiv.innerHTML =
    `It took ` + `${duration} milliseconds to calculate this.`;
}
