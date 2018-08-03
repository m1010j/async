export default function(n) {
  switch (n % 10) {
    case 1:
      if (n % 100 === 11) {
        return `${n}th`;
      } else {
        return `${n}st`;
      }
    case 2:
      if (n % 100 === 12) {
        return `${n}th`;
      } else {
        return `${n}nd`;
      }
    case 3:
      if (n % 100 === 13) {
        return `${n}th`;
      } else {
        return `${n}rd`;
      }
    default:
      return `${n}th`;
  }
}
