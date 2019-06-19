export const titleCase = str => {
  return str
    .toLowerCase()
    .split(/(\s+)/)
    .filter(e => e.trim().length > 0)
    .map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    })
    .join(' ');
};
