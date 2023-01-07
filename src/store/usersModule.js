import axios from "axios";

export default {
  state: {
    Records: []
  },
  mutations: {
    setRecords(state, payload) {
      state.Records = payload;
    },
  },
  getters: {
    getRecords(state) {
      return state.Records;
    },
  },
  actions: {
    async fetchRecords(ctx,params) {
      try {
        const response = await axios.get(`http://localhost:5000/records/${params}`);
        let r = response.data
        ctx.commit("setRecords", r);
      } catch (err) {
        console.log(err);
      }
    },
  }
};