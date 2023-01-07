<template>
  <div>
    <v-navigation-drawer
        app
        left
        absolute
        temporary
        v-model="drawer"
    >
      <v-list-item-group>
        <router-link v-for="item in this.$store.getters.getRoutes" :key="item.id" :to="item.url">
          <v-list-item>
            <v-list-item-title>
              {{ item.name }}
            </v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-navigation-drawer>
    <v-app-bar
        app
        color="blue"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title class="nav">
        <h3 class="text-h4 white--text">Fitness</h3>

      </v-app-bar-title>
      <v-btn
          v-if="this.$store.getters.getCurUser.id>0"
          class="logout"
          color="blue darken-2"
          @click="logout"
          dark
      >
        <v-icon
            dark
            left
        >
          mdi-arrow-left
        </v-icon>
        Logout
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    drawer: false,
  }),
  mounted() {
    this.$store.dispatch("fetchRoutes", [this.$store.getters.getCurUser.type]);
  },
  methods:{
    logout(){
      this.$store.dispatch("logout")
      this.$router.push('/login');
      this.$store.dispatch("fetchRoutes", [this.$store.getters.getCurUser.type])
    }
  }

}
</script>

<style scoped>
.logout {
  margin-left: 80%;
}
a{
  text-decoration: none !important;
}
</style>