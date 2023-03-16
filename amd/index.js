(function () {
  require.config({
    baseUrl: "",
    paths: {
      foo: "./modules/foo",
      bar: "./modules/bar",
    },
  });

  require(["bar"], function (bar) {
    console.log(bar);
  });
})();
