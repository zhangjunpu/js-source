import { inject, provide, reactive } from "vue";

class Store {
  constructor(options) {
    // state
    this.state = reactive(options.state);

    // getters
    const getters = options.getters;
    this.getters = {};
    for (const key of Object.keys(getters)) {
      Object.defineProperty(this.getters, key, {
        get: () => {
          return getters[key](this.state);
        },
      });
    }

    // mutations
    const mutations = options.mutations;
    this.mutations = {};
    for (const key of Object.keys(mutations)) {
      this.mutations[key] = (value) => {
        return mutations[key](this.state, value);
      };
    }
  }

  // app.use 安装插件必须要有此方法，用于给 $store 赋值，或用 provider/inject 给 useStore 提供条件；
  install(app) {
    app.config.globalProperties.$store = this; // $store 赋值
    app.provide("store", this); // useStore 赋值
  }

  commit(key, value) {
    this.mutations[key](value);
  }
}

export function createStore(options) {
  return new Store(options);
}

export function useStore() {
  return inject("store");
}
