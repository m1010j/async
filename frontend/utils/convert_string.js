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
