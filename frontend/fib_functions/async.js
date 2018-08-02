import { busywork } from '../utils/busywork.js';

export const asyncFib = async function(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  busywork(n ** 4);

  const prevValues = await Promise.all([asyncFib(n - 1), asyncFib(n - 2)]);

  return prevValues[0] + prevValues[1];
};
