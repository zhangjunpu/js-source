// 防抖函数
function debounce(callback, delay = 500) {
  let timerId;

  // 防抖函数
  const _debounce = function (...args) {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback.apply(this, args);
      timerId = null;
    }, delay);
  };

  // 取消函数
  _debounce.cancel = function () {
    if (timerId) clearTimeout(timerId);
  };

  return _debounce;
}

// export default debounce;
