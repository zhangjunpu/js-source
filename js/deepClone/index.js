import { deepClone } from "./lib.js";

// 循环引用
const obj1 = { name: "obj1" };
const obj2 = { name: "obj2" };
obj1.obj = obj2;
obj2.obj = obj1;

const obj = {
  // null、undefined、基本数据类型、function 不需要处理
  none: null,
  str: "why",
  num: 18,
  fun: function () {
    console.log("running");
  },
  // Date、RegExp 类型，需要靠 new 构造函数传递参数
  reg: /\d+/,
  date: Date.now(),
  // Array、Object 类型，靠 key、value 直接处理
  obj: { name: "lili", age: 20, [Symbol()]: "123" },
  arr: ["running", "gaming"],
  arrObj: [
    { name: "james", age: 38 },
    { name: "kobi", age: 40 },
  ],
  // Set、Map 类型，需要靠特殊 api 处理
  set: new Set([12, 34]),
  map: new Map([
    ["name", "why"],
    ["age", 18],
  ]),
  obj1,
  obj2,
};

// 深拷贝，并改变拷贝后的对象数据；
const clone = deepClone(obj);
clone.obj.age = 40;
clone.arr.push("football");
clone.arrObj[1].age = 0;
clone.set.add(18);
clone.map.set("name", "coderwhy");

// 打印结果查看
console.log(obj);
console.log(clone);
