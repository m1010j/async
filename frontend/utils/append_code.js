import functions from './functions.js';
import { busywork } from './busywork.js';

export default function(type, htmlElement) {
  const lines = functions[type].toString().split('\n');
  lines.forEach(function(line, idx) {
    if (line.slice(0, 8) === '  Object') {
      busyworkTags().forEach(function(tag) {
        htmlElement.appendChild(tag);
      });
    } else {
      const newLineArr = line.split('').map(function(ch) {
        return ch === ' ' ? '&nbsp;' : ch;
      });
      const codeTag = document.createElement('code');
      codeTag.classList.add('prettyprint');
      codeTag.classList.add('lang-js');
      codeTag.innerHTML = newLineArr.join('');
      htmlElement.appendChild(codeTag);
    }
  });
}

function busyworkTags() {
  const lines = busywork.toString().split('\n');
  const cleanedUpLines = [];
  lines.forEach(function(line, idx) {
    if (idx > 0 && idx < lines.length - 1) {
      const newLineArr = line.split('').map(function(ch) {
        return ch === ' ' ? '&nbsp;' : ch;
      });
      cleanedUpLines.push(newLineArr.join(''));
    }
  });
  return cleanedUpLines.map(function(line) {
    const codeTag = document.createElement('code');
    codeTag.classList.add('prettyprint');
    codeTag.classList.add('lang-js');
    codeTag.innerHTML = line;
    return codeTag;
  });
}
