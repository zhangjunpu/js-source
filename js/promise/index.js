class PPromise {
  state = "pending";
  onfulfilledList = [];
  onrejected = null;

  constructor(executor) {
    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(res) {
    this.state = "fulfilled";
    this.onfulfilledList?.forEach((callback) => callback(res));
  }

  reject(err) {
    this.state = "rejected";
    this.onrejected && this.onrejected(err);
  }

  then(onfulfilled, onrejected) {
    if (onfulfilled) {
      this.onfulfilledList.push(onfulfilled);
    }
    if (!this.onrejected) this.onrejected = onrejected;
    return this;
  }

  catch(onrejected) {
    if (!this.onrejected) this.onrejected = onrejected;
    return this;
  }
}

new PPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("123123");
    reject("error...");
  }, 2000);
})
  .then(
    (res) => {
      console.log("then", res);
    },
    // (err) => {
    //   console.log("then err", err);
    // }
  )
  .catch((err) => {
    console.log("catch err", err);
  })
  .catch((err) => {
    console.log("catch err2", err);
  });
