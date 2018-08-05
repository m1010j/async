export function post(type, n, duration) {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');

  const data = {
    n,
    duration,
    browser_name: navigator.appName,
    browser_engine: navigator.product,
    browser_version_1: navigator.appVersion,
    browser_version_2: navigator.userAgent,
    browser_platform: navigator.platform,
    num_threads: navigator.hardwareConcurrency,
    // _csrf: token,
  };

  return fetch(`/api/${type}_benchmarks`, {
    method: 'POST',
    body: JSON.stringify(data),
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'CSRF-Token': token,
    },
  });
}
