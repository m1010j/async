export function post(type, n, duration) {
  const data = {
    n,
    duration,
    browser_name: navigator.appName,
    browser_engine: navigator.product,
    browser_version_1: navigator.appVersion,
    browser_version_2: navigator.userAgent,
    browser_platform: navigator.platform,
    num_threads: navigator.hardwareConcurrency,
  };

  return fetch(`/api/${type}_benchmarks`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
