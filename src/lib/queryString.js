module.exports.queryString = obj => {
  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
};
