export const asyncFib = async function(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  const prevValues = await Promise.all([asyncFib(n - 1), asyncFib(n - 2)]);

  return prevValues[0] + prevValues[1];
};

export const asyncMemoFib = async function(n, memo = {}) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (memo[n]) return memo[n];

  const prevValues = await Promise.all([
    asyncMemoFib(n - 1, memo),
    asyncMemoFib(n - 2, memo),
  ]);

  memo[n] = prevValues[0] + prevValues[1];
  return memo[n];
};
