export const splitWords = string => {
  const array = string.toString().split(' ');
  const { length } = array;
  let result = '';

  for (let i = 0; i < length; i++) {
    result += array[i][0];
  }
  return result.slice(0, 2);
};
