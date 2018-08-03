export async function asyncMemoFib(n, memo = {}) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (memo[n]) return memo[n];

  const prevValues = await Promise.all([
    asyncMemoFib(n - 1, memo),
    asyncMemoFib(n - 2, memo),
  ]);

  memo[n] = prevValues[0] + prevValues[1];
  return memo[n];
}
