export default function(i, radios) {
  for (let j = 0; j < radios.length; j++) {
    if (i !== j) {
      radios[j].checked = false;
    }
  }
}
