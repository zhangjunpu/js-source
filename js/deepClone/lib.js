const cacheMap = new WeakMap();

/**
 * 深拷贝
 */
export function deepClone(obj) {
  // 1. null、undefined、基本数据类型、function 不做处理
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  // 解决循环引用问题
  if (cacheMap.has(obj)) return cacheMap.get(obj);

  // 2. 引用数据类型，分类型处理
  // 2.1 Date、RegExp 类型，需要通过构造函数入参
  let params;
  if (obj instanceof Date || obj instanceof RegExp) {
    params = obj;
  }

  const clone = new obj.constructor(params);
  cacheMap.set(obj, clone);

  // 2.2 Set、Map 类型，需要通过特殊 api 操作
  if (obj instanceof Map) {
    for (const [key, val] of obj) {
      clone.set(deepClone(key), deepClone(val));
    }
  } else if (obj instanceof Set) {
    for (const val of obj) {
      clone.add(deepClone(val));
    }
  } else if (Array.isArray(obj) || isObject(obj)) {
    // 2.3 Array、Object 类型，通过 key、value 直接操作
    for (const key in obj) {
      clone[key] = deepClone(obj[key]);
    }
  }

  return clone;
}

/**
 * 是否为 object 类型
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}
