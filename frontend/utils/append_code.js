import { busywork } from './busywork.js';

export default function(fcn, htmlElement) {
  const lines = fcn.toString().split('\n');
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
    codeTag.innerHTML = line;
    return codeTag;
  });
}
