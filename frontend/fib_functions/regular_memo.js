export const regularMemoFib = function(n, memo = {}) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (memo[n]) return memo[n];

  const first = regularMemoFib(n - 1, memo);
  const second = regularMemoFib(n - 2, memo);
  memo[n] = first + second;

  return memo[n];
};
