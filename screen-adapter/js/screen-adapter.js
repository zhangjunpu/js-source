// 1. 获取 html 元素
const htmlEl = document.documentElement;

function resizeHtmlFontSize() {
  // 2. 获取 html 的宽度
  const fontSize = htmlEl.clientWidth / 10;
  htmlEl.style.fontSize = fontSize + "px";
}
// 第一次不会监听，所以主动调用一次
resizeHtmlFontSize();

// 3. 动态监听 window 尺寸改变
window.addEventListener("resize", resizeHtmlFontSize);
// 4. 页面切换后的前进、后退操作需不需要重新设置大小
window.addEventListener("pageshow", (e) => {
  if (e.persisted) resizeHtmlFontSize();
});
