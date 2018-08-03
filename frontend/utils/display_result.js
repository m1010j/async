import nth from './nth.js';

export default function(n, button, beforeTime, resultDiv, timeDiv, result) {
  button.disabled = false;
  resultDiv.innerHTML = `The ${nth(n)} ` + `Fibonacci number is ${result}.`;
  const afterTime = new Date().getTime();
  timeDiv.innerHTML =
    `It took ` + `${afterTime - beforeTime} milliseconds to calculate this.`;
}
