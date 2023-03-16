// 订阅者对象
let Deq = {
  list: {}, // 容器
  // 订阅方法
  subscribe(key, fn) {
    (this.list[key] || (this.list[key] = [])).push(fn);
  },
  // 发布：key, value
  publish(...args) {
    const key = args.shift();
    const fns = this.list[key];

    if (!fns || fns.length === 0) return;

    for (const fn of fns) {
      fn.apply(this, args);
    }
  },
};

// 模拟数据绑定方法
function dataBinding({ data, dataKey, key, selector }) {
  let value;

  // 数据劫持
  Object.defineProperty(data, dataKey, {
    get() {
      return value;
    },
    set(val) {
      this.value = val;
      Deq.publish(key, val); // 发布
    },
  });

  const els = selector.map((item) => document.querySelector(item));
  // 订阅
  Deq.subscribe(key, function (text) {
    for (const el of els) {
      el.innerHTML = text;
    }
  });
}
