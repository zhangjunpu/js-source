define(["foo"], function (foo) {
  console.log(foo.name);
  console.log(foo.age);

  return {
    name: "bar",
    foo,
  };
});
