// 节流函数
function throttle(callback, delay, tailing = false) {
  let start = 0;
  let timerId = null;

  const _throttle = function (...args) {
    const now = Date.now();
    if (now - start >= delay) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }

      callback.apply(this, args);
      start = now;
      return;
    }

    // 最后一次是否执行
    if (tailing && !timerId) {
      timerId = setTimeout(() => {
        callback.apply(this, args);
        start = Date.now();
        timerId = null;
      }, delay - (now - start));
    }
  };

  // 取消定时器
  _throttle.cancel = function () {
    if (timerId) {
      clearTimeout(timerId);
      start = 0;
      timerId = null;
    }
  };

  return _throttle;
}
