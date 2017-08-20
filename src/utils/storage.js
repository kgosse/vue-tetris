const StorageKey = 'VUE_TETRIS';

export const lastRecord = (() => {
  let data = localStorage.getItem(StorageKey);
  if (!data) {
    return false;
  }
  try {
    if (window.btoa) {
      data = atob(data);
    }
    data = decodeURIComponent(data);
    data = JSON.parse(data);
  } catch (e) {
    if (window.console || window.console.error) {
      window.console.error('读取记录错误:', e);
    }
    return false;
  }
  return data;
})();

export function subscribeRecord(store) {
  store.subscribe(() => {
    let data = store.state;
    if (data.lock) {
      return;
    }
    data = JSON.stringify(data);
    data = encodeURIComponent(data);
    if (window.btoa) {
      data = btoa(data);
    }
    localStorage.setItem(StorageKey, data);
  });
}