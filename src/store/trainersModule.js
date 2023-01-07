import axios from "axios";

export default {
  state: {
    Trainers: []
  },
  mutations: {
    setTrainers(state, payload) {
      state.Trainers
        = payload;
    },
  },
  getters: {
    getTrainers
      (state) {
      return state.Trainers
        ;
    },
  },
  actions: {
    async fetchTrainers
      (ctx) {
      try {
        const response = await axios.get("http://localhost:5000/trainers");
        ctx.commit("setTrainers", response.data);
      } catch (err) {
        console.log(err);
      }
    },
  }
};