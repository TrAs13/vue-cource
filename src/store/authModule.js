import axios from "axios";

export default {
  state: {
    curUser: {
      id: null,
      type: 0
    }
  },
  mutations: {
    setCurUser(state, payload) {
      state.curUser = payload;
    },
  },
  getters: {
    getCurUser(state) {
      return state.curUser;
    },
  },
  actions: {
    async fetchCurUser(ctx, params) {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          login: params[0],
          pass: params[1],
        });
        let user = {
          id: response.data.A_OUID,
          type: response.data.A_TYPE
        };
        ctx.commit("setCurUser", user);
      } catch (err) {
        console.log(err);
      }
    },
    logout(ctx) {
      let user = {
        id: null,
        type: 0,
      }
      ctx.commit("setCurUser", user);
    }
    
  }
};