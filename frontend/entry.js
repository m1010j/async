import render from './utils/render.js';

document.addEventListener('DOMContentLoaded', function() {
  render();

  // const inputIds = window.syncTypes
  //   .concat(window.asyncTypes)
  //   .map(function(type) {
  //     return `${hyphenize(type)}-n`;
  //   });

  // function nToSubmit(idString) {
  //   return `${idString.slice(0, idString.length - 2)}-submit`;
  // }

  // const numberInputs = inputIds.map(function(id) {
  //   return document.getElementById(id);
  // });
  // numberInputs.forEach(function(input) {
  // input.onchange = function() {
  //   const submitButton = document.getElementById(nToSubmit(input.id));
  //   if (parseInt(input.value) > 0) {
  //     submitButton.disabled = false;
  //   } else {
  //     submitButton.disabled = true;
  //   }
  // };
  // });
});
