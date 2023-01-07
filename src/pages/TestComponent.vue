<template>
<div>
  Тестовая страница
  {{items}}
</div>
</template>

<script>
import axios from "axios";

export default {
  name: "TestComponent",
  data: () => ({
    items:""
  }),
  mounted() {
    this.getUsers();
  },
  methods: {
    // Get All Products
    async getUsers() {
      try {
        const response = await axios.post("http://localhost:5000/login", {
            login: 'tras',
            pass: 'tras',
        });
        this.items = response.data;
      } catch (err) {
        console.log(err);
      }
    }
  },
}
</script>

<style scoped>

</style>