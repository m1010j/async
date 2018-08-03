import { busywork } from '../utils/busywork.js';

export async function asyncBusyFib(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  busywork(n);

  const prevValues = await Promise.all([
    asyncBusyFib(n - 1),
    asyncBusyFib(n - 2),
  ]);

  return prevValues[0] + prevValues[1];
}
