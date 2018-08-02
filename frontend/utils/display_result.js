export default function(n, button, beforeTime, resultDiv, timeDiv, result) {
  button.disabled = false;
  resultDiv.innerHTML = `The ${n}th ` + `Fibonacci number is ${result}.`;
  const afterTime = new Date().getTime();
  timeDiv.innerHTML =
    `It took ` + `${afterTime - beforeTime} milliseconds to calculate this.`;
}
