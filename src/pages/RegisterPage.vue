<template>
  <div>
    <form class="form mt-4">
      <v-text-field
          v-model="surname"
          label="Фамилия"
          required
      ></v-text-field>
      <v-text-field
          v-model="name"
          label="Имя"
          required
      ></v-text-field>
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
      <v-text-field
          v-model="pass2"
          label="Повторите пароль"
          required
      ></v-text-field>
      <v-btn
          class="mr-4"
          @click="submit"
          color="blue lighten-2">
        Зарегистрироваться
      </v-btn>
      <v-btn @click="clear"
             color="blue lighten-2">
        Очистить
      </v-btn>
    </form>
    <v-alert
        color="red"
        :value="showAlert"
        type="error"
        dismissible
        @input="hideAlert"
    >
      {{ messageAlert }}
    </v-alert>
  </div>

</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    surname: '',
    name: '',
    login: '',
    pass: '',
    pass2: '',
    showAlert: false,
    messageAlert: '',
  }),
  methods: {
    async submit() {
      if (this.pass == this.pass2) {
        const response = await axios.post("http://localhost:5000/check_login", {
          login: this.login
        })
        console.log(response.data.z)
        if (response.data.z == 1) {
          this.messageAlert = 'Пользователь с таким логином уже существует. Попробуйте другой логин';
          this.showAlert = true;
        } else {
          await axios.post("http://localhost:5000/registerU", {
            name: this.name,
            pass: this.pass,
            surname: this.surname,
            login: this.login
          })
          await axios.post("http://localhost:5000/registerA", {
            name: this.name,
            pass: this.pass,
            surname: this.surname,
            login: this.login
          })
          this.$router.push('/login');
        }
      } else {
        this.messageAlert = 'Пароли не совпадают, проверьте правильность ввода';
        this.showAlert = true;
      }

    },
    clear() {
      this.login = '';
      this.pass = '';
      this.surname = '';
      this.name = '';
      this.pass2 = '';
    },
    hideAlert() {
      this.showAlert = false;
    },
  },
}
</script>

<style scoped>
.form {
  margin: auto;
  width: 50%;
}
</style>