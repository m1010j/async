export default function(n) {
  const arr = n.toString().split('');
  let result = [];
  while (arr.length) {
    for (let i = 0; i < 3; i++) {
      result.unshift(arr.pop());
    }
    result.unshift(',');
  }
  return result.slice(1, result.length).join('');
}
