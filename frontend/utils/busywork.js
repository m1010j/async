export default function(n) {
  if (n === 0) return;

  return busywork(n - 1);
}
