<template>
  <div>
    <h1>Наши тренеры</h1>
    <v-simple-table>
      <thead>
      <tr>
        <th class="text-left">
          Данные
        </th>
        <th class="text-left">
          Тип тренировки
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(item) in this.$store.getters.getTrainers"
          :key="item.id"
      >
        <td>
          <v-list-item
          >
            <v-list-item-avatar color="grey darken-3">
              <v-img
                  class="elevation-12"
                  alt=""
                  src="https://avatars.mds.yandex.net/i?id=4413f24986994697b3101db39b1f54201954f83a-5410274-images-thumbs&n=13"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="item.surname+' '+item.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </td>
        <td>{{ item.typename }}</td>
      </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  mounted() {
    this.$store.dispatch("fetchTrainers");
  },
}
</script>

<style scoped>
.v-avatar {
  width: 100px !important;
  height: 100px !important;
}
</style>