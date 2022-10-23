export const _storage = (items, key = 'state', action) => {
  if (action === 'get' && JSON.parse(localStorage.getItem(key))) {
    return JSON.parse(localStorage.getItem(key))
  }
  if (action === 'set') {
    localStorage.setItem(key, JSON.stringify(items));
  }
  if (action === 'reset') {
    localStorage.removeItem(key);
  }
  return false;
}
