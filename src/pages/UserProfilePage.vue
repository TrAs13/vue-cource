<template>
  <div>
    <h1>Ваши записи</h1>
    <v-simple-table>
        <thead>
        <tr>
          <th class="text-left">
            Дата
          </th>
          <th class="text-left">
            Время
          </th>
          <th class="text-left">
            Тренер
          </th>
          <th class="text-left">
            Тип тренировки
          </th>
          <th class="text-left">
            Статус
          </th>
        </tr>
        </thead>
        <tbody>
        <tr
            v-for="(item) in this.$store.getters.getRecords"
            :key="item.id"
        >
          <td>{{ item.date.split('T')[0].split('-').reverse().join('.') }}</td>
          <td>{{ item.time }}</td>
          <td>{{ item.surname }} {{ item.name }}</td>
          <td>{{ item.traintype }}</td>
          <td>
            <v-icon v-if="item.icon=='mdi-cancel'" color='red' v-text="item.icon"></v-icon>
            <v-icon v-else color='green' v-text="item.icon"></v-icon>
          </td>
        </tr>
        </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: "UserProfilePage",

  mounted() {
    this.$store.dispatch("fetchRecords", this.$store.getters.getCurUser.id);
  },
}
</script>

<style scoped>

</style>