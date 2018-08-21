import { camelize } from '../../utils/convert_string.js';

export default function() {
  const defaults = {};
  window.types.forEach(function(type) {
    defaults[type] = true;
  });
  const localStorageOptions =
    JSON.parse(localStorage.getItem('useWorker')) || {};
  window.useWorker = Object.assign(defaults, localStorageOptions);

  if (window.Worker) {
    const workerRadiosYes = document.getElementsByClassName('worker-radio-yes');
    for (let i = 0; i < workerRadiosYes.length; i++) {
      const workerRadioYes = workerRadiosYes[i];

      const idArr = workerRadioYes.id.split('-');
      for (let j = 0; j < 3; j++) {
        idArr.pop();
      }
      const type = camelize(idArr.join('_'));

      workerRadioYes.checked = window.useWorker[type];

      workerRadioYes.onclick = function() {
        window.useWorker[type] = true;
        localStorageOptions[type] = true;
        localStorage.setItem('useWorker', JSON.stringify(localStorageOptions));
      };
    }

    const workerRadiosNo = document.getElementsByClassName('worker-radio-no');
    for (let i = 0; i < workerRadiosNo.length; i++) {
      const workerRadioNo = workerRadiosNo[i];
      const idArr = workerRadioNo.id.split('-');
      for (let j = 0; j < 3; j++) {
        idArr.pop();
      }
      const type = camelize(idArr.join('_'));

      workerRadioNo.checked = !window.useWorker[type];

      workerRadioNo.onclick = function() {
        window.useWorker[type] = false;

        localStorageOptions[type] = false;
        localStorage.setItem('useWorker', JSON.stringify(localStorageOptions));
      };
    }
  } else {
    const workerRadiosContainers = document.getElementsByClassName(
      'worker-radios-container'
    );
    for (let i = 0; i < workerRadiosContainers.length; i++) {
      workerRadiosContainers[i].remove();
    }
  }
}
