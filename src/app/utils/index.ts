export const isJSON = str => {
  try {
    JSON.parse(str);
    return true;
  } catch (err) {
    return false;
  }
};
