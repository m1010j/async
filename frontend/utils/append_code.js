export default function(fcn, htmlElement) {
  const arr = fcn.toString().split('\n');
  arr.forEach(function(line, idx) {
    const newLineArr = line.split('').map(function(ch) {
      return ch === ' ' ? '&nbsp;' : ch;
    });
    const codeTag = document.createElement('code');
    codeTag.innerHTML = newLineArr.join('');
    htmlElement.appendChild(codeTag);
  });
}
