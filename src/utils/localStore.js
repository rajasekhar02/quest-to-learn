const getData = function (key) {
  return localStorage.getItem(key) == null
    ? undefined
    : JSON.parse(localStorage.getItem(key));
};
const setData = function (key, data) {
  localStorage.setItem(key, JSON.stringify(data));
};
const deleteDataWith = function (key) {
  localStorage.removeItem(key);
};

export default {
  getData,
  setData,
  deleteDataWith,
};
