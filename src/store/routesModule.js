import axios from "axios";

export default {
  state: {
    routes: []
  },
  mutations: {
    setRoutes(state, payload) {
      state.routes = payload;
    },
  },
  getters: {
    getRoutes(state) {
      return state.routes;
    },
  },
  actions: {
    async fetchRoutes(ctx,params) {
      try {
        const response = await axios.get(`http://localhost:5000/routes/${params[0]}`);
        let r = response.data
        ctx.commit("setRoutes", r);
      } catch (err) {
        console.log(err);
      }
    },
  }
};