import Vue from "vue";
import Vuex from "vuex";
import userModule from "@/store/usersModule";
import authModule from "@/store/authModule";
import routesModule from "@/store/routesModule";
import trainersModule from "@/store/trainersModule";
import recordStart from "@/store/recordStartModule";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userModule,
    authModule,
    routesModule,
    trainersModule,
    recordStart,
  },
});