import functions from '../utils/functions.js';

onmessage = async function(e) {
  const { n, type } = e.data;
  const beforeTime = new Date().getTime();
  const result = await functions[type](n);
  const afterTime = new Date().getTime();
  const duration = afterTime - beforeTime;
  postMessage({ result, duration });
};
