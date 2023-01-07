<template>
  <v-app>
    <NavBar></NavBar>
    <v-main >
      <router-view class="page"></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
  name: 'App',
  components: {NavBar},
}
</script>
<style>
.v-main {
  padding: 0 !important;
  margin-top: 64px;
}
.page {
  margin: auto;
  max-width: 880px;
}
</style>
