export default function(type, n, duration, withWorker) {
  const token = document
    .querySelector('meta[name="csrf-token"]')
    .getAttribute('content');
  const data = {
    n,
    duration,
    num_cores: navigator.hardwareConcurrency,
    with_worker: withWorker,
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
