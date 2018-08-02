export const syncMemoFib = function(n, memo = {}) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (memo[n]) return memo[n];

  const first = syncMemoFib(n - 1, memo);
  const second = syncMemoFib(n - 2, memo);
  memo[n] = first + second;

  return memo[n];
};
