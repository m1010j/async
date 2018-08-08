export function post(type, n, duration) {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');
  const data = {
    n,
    duration,
    num_cores: navigator.hardwareConcurrency,
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
