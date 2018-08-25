# Explorations in Asynchronicity

[Explorations in Asynchronicity](https://async.matthiasjenny.com/) is a benchmark and analysis tool for asynchronous recursive functions. See [here](https://medium.com/@matthiascjenny/async-recursion-promising-surprising-but-foremost-confusing-5e13aa8bbc06) of a discussion of some preliminary results.

See [async-explorations-cli](https://www.npmjs.com/package/async-explorations-cli) for a companion command-line tool to run these benchmarks in Node.js.

### Overview

Users can benchmark the following six functions:

```javascript
function syncFib(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  return syncFib(n - 1) + syncFib(n - 2);
}
```

```javascript
async function asyncFib(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  const prevValues = await Promise.all([asyncFib(n - 1), asyncFib(n - 2)]);

  return prevValues[0] + prevValues[1];
}
```

```javascript
function syncBusyFib(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  const superBig = n ** 9;
  for (let i = 0; i < superBig; i++) {
    i;
  }

  return syncBusyFib(n - 1) + syncBusyFib(n - 2);
}
```

```javascript
async function asyncBusyFib(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  const superBig = n ** 9;
  for (let i = 0; i < superBig; i++) {
    i;
  }

  const prevValues = await Promise.all([
    asyncBusyFib(n - 1),
    asyncBusyFib(n - 2),
  ]);

  return prevValues[0] + prevValues[1];
}
```

```javascript
function syncMemoFib(n, memo = {}) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  if (memo[n]) return memo[n];

  const first = syncMemoFib(n - 1, memo);
  const second = syncMemoFib(n - 2, memo);
  memo[n] = first + second;

  return memo[n];
}
```

```javascript
async function asyncMemoFib(n, memo = {}) {
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
```

### API

There is a public API for the data collected when users perform any of these benchmarks:

- `https://async.matthiasjenny.com/api/sync_benchmarks`
  - raw data for all `syncFib` benchmarks
- `https://async.matthiasjenny.com/api/sync_busy_benchmarks`
  - raw data for all `syncBusyFib` benchmarks
- `https://async.matthiasjenny.com/api/sync_memo_benchmarks`
  - raw data for all `syncMemoFib` benchmarks
- `https://async.matthiasjenny.com/api/async_benchmarks`
  - raw data for all `asyncFib` benchmarks
- `https://async.matthiasjenny.com/api/async_busy_benchmarks`
  - raw data for all `asyncBusyFib` benchmarks
- `https://async.matthiasjenny.com/api/async_memo_benchmarks`
  - raw data for all `asyncMemoFib` benchmarks

Benchmark data can be requested with the following optional parameters:

- `mode`
  - Setting this to `avg` returns average calculation times; `min` returns minium calculation times.
- `browser`
  - Setting this to a browser name returns results for only that browser.
  - Setting this to `firefox based` returns results for all Firefox-based browsers.
  - Setting this to `chromium based` returns results for all Chromium-based browsers.
- `os`
  - Setting this to an operating system name returns results for only that operating system.
  - Setting this to `linux` returns results for Linux-based Desktop operating systems.
- `num_cores`
  - Setting this to a number returns only results for devices with that number of logical cores.
- `max_n`
  - Setting this to a number limits the results to those benchmarks with an `n` of less than or equal to that number.

Examples:

- `https://async.matthiasjenny.com/api/async_busy_benchmarks?browser=chrome&os=windows&max_n=5&num_cores=12`

  - Returns a JSON object of the following form:

  ```json
  {
    "status": "success",
    "data": [
      {
        "id": 141,
        "browser": "Chrome 68.0.3440",
        "os": "Windows 10.0.0",
        "num_cores": 12,
        "n": 5,
        "duration": 7
      },
      {
        "id": 140,
        "browser": "Chrome 68.0.3440",
        "os": "Windows 10.0.0",
        "num_cores": 12,
        "n": 4,
        "duration": 4
      },
      {
        "id": 139,
        "browser": "Chrome 68.0.3440",
        "os": "Windows 10.0.0",
        "num_cores": 12,
        "n": 3,
        "duration": 4
      },
      {
        "id": 138,
        "browser": "Chrome 68.0.3440",
        "os": "Windows 10.0.0",
        "num_cores": 12,
        "n": 2,
        "duration": 1
      },
      {
        "id": 137,
        "browser": "Chrome 68.0.3440",
        "os": "Windows 10.0.0",
        "num_cores": 12,
        "n": 1,
        "duration": 1
      }
    ],
    "message": "Retrieved benchmarks"
  }
  ```

- `https://async.matthiasjenny.com/api/async_busy_benchmarks?mode=avg&browser=firefox&os=linux&max_n=10&num_cores=12`

  - Returns a JSON object of the following form:

    ```json
    {
      "status": "success",
      "data": {
        "1": "0.00",
        "2": "0.00",
        "3": "1.00",
        "4": "1.33",
        "5": "3.00",
        "6": "11.50",
        "7": "46.00",
        "8": "159.00",
        "9": "492.33",
        "10": "1398.00"
      },
      "message": "Retrieved benchmarks"
    }
    ```

  - The values here are the average calculation times, rounded to two decimal points, for `asyncBusyFib(1)` through `asyncBusyFib(10)` in Firefox on Linux devices with 12 logical cores.

Individual benchmark results can be requested as follows:

- `https://async.matthiasjenny.com/api/sync_benchmarks/:id`
  - raw data for an individual `syncFib` benchmark with id `:id`
- `https://async.matthiasjenny.com/api/sync_busy_benchmarks/:id`
  - raw data for an individual `syncBusyFib` benchmark with id `:id`
- `https://async.matthiasjenny.com/api/sync_memo_benchmarks/:id`
  - raw data for an individual `syncMemoFib` benchmark with id `:id`
- `https://async.matthiasjenny.com/api/async_benchmarks/:id`
  - raw data for an individual `asyncFib` benchmark with id `:id`
- `https://async.matthiasjenny.com/api/async_busy_benchmarks/:id`
  - raw data for an individual `asyncBusyFib` benchmark with id `:id`
- `https://async.matthiasjenny.com/api/async_memo_benchmarks/:id`
  - raw data for an individual `asyncMemoFib` benchmark with id `:id`

### [Contributing](./CONTRIBUTING.md)

### [License](./LICENSE)
