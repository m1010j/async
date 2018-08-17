JavaScript is a single-threaded language, but browsers use multiple threads to handle the event loop. I set out to explore how much we can leverage the multi-threaded nature of browsers when writing recursive functions. The results are decidedly mixed, and along the way the reveal significant differences between Chromium-based browsers and Firefox, Safari, and Edge, as well as differences between iOS and other operating systems.

### The main test functions

I used a regular Fibonacci function without memoization to establish a baseline:

```javascript
function syncFib(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;

  return syncFib(n - 1) + syncFib(n - 2);
}
```
