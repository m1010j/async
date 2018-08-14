import getBrowserStr from './get_browser_str.js';
import {
  hyphenize,
  snakeCaseize,
  camelize,
} from '../../utils/convert_string.js';

export function setTypes(allTypes, types) {
  allTypes.forEach(function(type) {
    const hyphenizedType = hyphenize(type);
    const snakeCasedType = snakeCaseize(type);
    const camelizedTypes = types.map(function(snakeType) {
      return camelize(snakeType);
    });

    const typeCheckbox = document.getElementById(`${hyphenizedType}-checkbox`);
    if (camelizedTypes.includes(type)) {
      typeCheckbox.checked = true;
    } else {
      typeCheckbox.checked = false;
    }
  });
}

export function setAvgOrMin(avgOrMinRadios, mode) {
  for (let i = 0; i < avgOrMinRadios.length; i++) {
    const radio = avgOrMinRadios[i];
    if (radio.value === mode) {
      radio.checked = true;
    } else {
      radio.checked = false;
    }
  }
}

export function setBrowserCheckboxes(browserCheckboxes, browsers) {
  for (let i = 0; i < browserCheckboxes.length; i++) {
    const checkbox = browserCheckboxes[i];
    const browserStr = getBrowserStr(checkbox);
    if (browsers.includes(browserStr)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  }
}

export function setOsRadios(osRadios, os) {
  for (let i = 0; i < osRadios.length; i++) {
    const radio = osRadios[i];
    if (radio.value === os) {
      radio.checked = true;
    }
  }
}

export function setNumCoresRadios(numCoresRadios, numCores) {
  for (let i = 0; i < numCoresRadios.length; i++) {
    const radio = numCoresRadios[i];
    if (numCores === radio.value) {
      radio.checked = true;
    } else {
      radio.checked = false;
    }
  }
}
