<template>
  <form class="form mt-4">
    <v-text-field
        v-model="login"
        label="Логин"
        required
    ></v-text-field>
    <v-text-field
        v-model="pass"
        label="Пароль"
        required
    ></v-text-field>
    <v-btn
        class="mr-4"
        @click="submit"
        color="blue lighten-2">
      Войти
    </v-btn>
    <v-btn @click="clear"
    color="blue lighten-2">
      Очистить
    </v-btn>
  </form>
</template>

<script>
export default {
  data: () => ({
    login: '',
    pass: '',
  }),
  methods: {
    submit() {
      this.$store.dispatch("fetchCurUser", [this.login, this.pass]).then(() =>
          this.$store.dispatch("fetchRoutes", [this.$store.getters.getCurUser.type])).then(() => {
        if (this.$store.getters.getCurUser.type == 2) {
          this.$router.push('/admin');
        } else if (this.$store.getters.getCurUser.type == 1) {
          this.$router.push('/profile');
        } else {
          this.$router.push('/login');
        }
      })
    },
    clear() {
      this.login = '';
      this.pass = '';
    },
  },
}
</script>

<style scoped>
.form {
  margin: auto;
  width: 30%;
}
</style>