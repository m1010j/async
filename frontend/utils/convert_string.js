function transform(camelString, underscoreOrHyphen) {
  return camelString
    .replace(/([A-Z])/g, function(_, ch) {
      return underscoreOrHyphen + ch.toLowerCase();
    })
    .replace(new RegExp(`^${underscoreOrHyphen}`), '');
}

export function snakeCaseize(camelString) {
  return transform(camelString, '_');
}

export function hyphenize(camelString) {
  return transform(camelString, '-');
}

export function camelize(snakeString) {
  let camelized = '';
  const snakeArray = snakeString.split('_');
  camelized += snakeArray.shift();
  snakeArray.forEach(function(str) {
    camelized += str.slice(0, 1).toUpperCase();
    camelized += str.slice(1);
  });
  return camelized;
}
