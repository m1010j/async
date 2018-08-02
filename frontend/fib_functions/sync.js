import { busywork } from '../utils/busywork.js';

export const syncFib = function(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  busywork(n ** 4);

  return syncFib(n - 1) + syncFib(n - 2);
};
