<template>
  <div class="page record">
    <v-row justify="center">
      <v-row v-if="step==0">
        <v-col
            cols="12"
            sm="6"
        >
          Выберите дату
          <v-date-picker
              v-model="dates"
              multiple
          ></v-date-picker>
        </v-col>
      </v-row>
      <v-row v-if="step==1">
        <v-col
            class="d-flex"
            cols="12"
            sm="6"
        >
          <v-select
              :items="this.$store.getters.getRecordsTimes"
              item-text="time"
              item-value="id"
              v-model="time"
              label="Выберите время"
              outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="step==2">
        <v-col
            class="d-flex"
            cols="12"
            sm="6"
        >
          <v-select
              :items="this.$store.getters.getRecordsType"
              label="Выберите зал"
              item-text="name"
              item-value="id"
              v-model="course"
              outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="step==3">
        <v-col
            class="d-flex"
            cols="12"
            sm="6"
        >
          <v-select
              :items="getTrainers"
              label="Выберите тренера"
              v-model="trainer"
              item-text="name"
              item-value="id"
              outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="step==4" class="flex-column align-center">
        <h2>Выберите одну из следующих свободных дат</h2>
        <v-radio-group v-model="selected" :mandatory="false">
          <div v-for="item in freeRecord" :key="item" class="custom d-flex flex-row justify-space-around rounded-xl"
               colored-border>
            <v-card-title>{{ item }}</v-card-title>
            <v-radio :value="item" color="white"/>
          </div>

        </v-radio-group>
        <v-btn
            color="primary"
            dark
            @click="acceptRecord"
        >
          Подтвердить запись на выбранную дату
        </v-btn>
      </v-row>
      <v-dialog
          v-model="dialog"
          persistent
          max-width="290"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-row class="flex-column align-center">
            <v-btn v-if="step<=3"
                   color="primary"
                   dark
                   v-bind="attrs"
                   v-on="on"
                   class="custom-sec d-flex flex-row justify-space-around"
            >
              Подтвердить
            </v-btn>
            <v-btn v-if="step>0"
                   color="primary"
                   dark
                   @click="goBack"
                   class="custom-sec d-flex flex-row justify-space-around"
            >
              Вернуться назад
            </v-btn>
          </v-row>
        </template>
        <v-card>
          <v-card-title class="text-h5">
            Вы уверены в своем выборе?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="green darken-1"
                text
                @click="unacceptStep"
            >
              Не согласен
            </v-btn>
            <v-btn
                color="green darken-1"
                text
                @click="acceptStep"
            >
              Согласен
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-alert
        color="red"
        :value="showAlert"
        type="error"
        dismissible
        @input="hideAlert"
    >
      {{ message }}
    </v-alert>
  </div>

</template>

<script>
import axios from "axios";

export default {
  name: "RecordPage",
  data() {
    return {
      dialog: false,
      dates: [],
      course: 0,
      time: 0,
      trainer: 0,
      step: 0,
      showAlert: false,
      freeRecord: [],
      selected: '',
      message: '',
    }
  },
  methods: {
    goBack() {
      this.step--;
    },
    hideAlert() {
      this.showAlert = false;
    },
    unacceptStep() {
      this.dialog = false;
    },
    async acceptStep() {
      const response = await axios.post("http://localhost:5000/check_record", {
        countDate: this.dates.length,
        time: this.time,
        course: this.course,
        trainer: this.trainer,
        dates: this.dates,
      });
      console.log(this.dates)
      if (this.checkDates == 1) {
        this.dialog = false;
        this.showAlert = true;
        this.message = 'Среди выбранных дат существует дата, которая меньше текущей. Попробуйте выбрать другую'
      } else if (response.data.can == 1) {
        this.dialog = false;
        this.step++;
      } else {
        this.dialog = false;
        this.showAlert = true;
        this.message = 'Для заданного параметра нет подходящих свободных мест. Попробуйте выбрать другой.'
      }
      if (this.step == 4) {
        const response = await axios.post("http://localhost:5000/free_record", {
          countDate: this.dates.length,
          time: this.time,
          course: this.course,
          trainer: this.trainer,
          dates: this.dates,
        });
        this.freeRecord = this.dates.filter(date => !response.data.map((item) => item.date.split('T')[0]).includes(date));
      }
    },
    async acceptRecord() {
      const response = await axios.post("http://localhost:5000/create_record", {
        user: this.$store.getters.getCurUser.id,
        time: this.time,
        course: this.course,
        trainer: this.trainer,
        dates: this.selected,
      });
      console.log(response.data)
      this.$router.push('/profile');
    }
  },
  mounted() {
    this.$store.dispatch("fetchRecordsType");
    this.$store.dispatch("fetchRecordsTimes");
    this.$store.dispatch("fetchTrainers");
  },
  computed: {
    getTrainers() {
      return this.$store.getters.getTrainers.filter((item) => item.typeid === this.course)
          .map((item) => ({id: item.id, name: `${item.surname} ${item.name}`}));
    },
    checkDates() {
      const currentDate = new Date();
      for (let i = 0; i < this.dates.length; i++) {
        const date = new Date(this.dates[i]);
        if (date < currentDate) {
          return 1;
        }
      }
      return 0;
    }
  }
}
</script>

<style scoped>
.record {
  margin-top: 30px;
}

.custom {
  margin-bottom: 5px;
  border-color: #1976d2;
  background-color: #2196f3;
  color: white;
}

.custom-sec {
  margin-top: 30px;
}
</style>