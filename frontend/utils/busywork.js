export function busywork(n) {
  const superBig = n ** 4;

  for (let i = 0; i < superBig; i++) {
    for (let j = 0; j < superBig; j++) {
      i + j;
    }
  }
}
