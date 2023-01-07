import axios from "axios";

export default {
  state: {
    RecordsType: [],
    RecordsTimes: []
  },
  mutations: {
    setRecordsType(state, payload) {
      state.RecordsType = payload;
    },
    setRecordsTimes(state, payload) {
      state.RecordsTimes = payload;
    },
  },
  getters: {
    getRecordsType(state) {
      return state.RecordsType;
    },
    getRecordsTimes(state) {
      return state.RecordsTimes;
    },
  },
  actions: {
    async fetchRecordsType
      (ctx) {
      try {
        const response = await axios.get("http://localhost:5000/records_types");
        ctx.commit("setRecordsType", response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async fetchRecordsTimes
      (ctx) {
      try {
        const response = await axios.get("http://localhost:5000/records_times");
        ctx.commit("setRecordsTimes", response.data);
      } catch (err) {
        console.log(err);
      }
    },
  }
};