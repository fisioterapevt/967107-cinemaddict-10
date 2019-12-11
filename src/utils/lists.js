export const generateList = (count, elem) => {
  return new Array(count)
    .fill(``)
    .map(elem);
};
