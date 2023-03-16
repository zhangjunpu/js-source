import { createStore } from "@/vuex";

const store = createStore({
  state: {
    count: 0,
  },
  getters: {
    double(state) {
      console.log(state)
      return state.count * 2;
    },
  },
  mutations: {
    increment(state, num) {
      state.count += num;
    },
  },
});

export default store;
