/**
 * 初始化 dom 元素
 */
function crateElement(vnode) {
  const tag = vnode.tag; // tag
  const attrs = vnode.attrs || {}; // 属性
  const children = vnode.children || []; // 子元素

  if (!tag) return;

  // 1. 创建 dom
  const el = document.createElement(tag);

  // 2. 添加属性
  for (const key in attrs) {
    if (Object.hasOwn(attrs, key)) {
      const value = attrs[key];
      el.setAttribute(key, value);
    }
  }

  // 3. 添加 children
  children.forEach((child) => {
    el.append(crateElement(child));
  });

  return el;
}

/**
 * 更新
 */
function update(vnode, newNode) {
  const children = vnode.children || [];
  const newChildren = newNode.children || [];

  children.forEach((child, index) => {
    const newChild = newChildren[index];

    if (child.tag === newChild.tag) {
      update(child, newChild);
    } else {
      // diff 内部方法
      replaceNode(child, newChild);
    }
  });
}
