<script setup>
import { ref, reactive, computed } from "vue";
import MeetupCards from "./components/MeetupCards.vue";

const meetups = ref([
  {
    id: 1,
    img: "https://img.freepik.com/premium-vector/user-interface-elements-for-cryptocurrency-mobile-app-cryptocurrency-mining-exchange-and-stock-trading-gui-templates-unique-neumorphic-ui-ux-design-kit-manage-navigation-and-analytics-components_9209-3325.jpg",
    name: "Создание UI компонентов в Figma",
    author: "Мила Валерьевна Швановская",
    place: "ул.Шостаковича 13, каб.103",
    date: "2023-08-06T18:30:00.000",
  },
  {
    id: 2,
    img: "https://img.freepik.com/premium-photo/busy-office-multiracial-coworkers-share-big-table-in-coworking-space-horizontal-banner-image_411082-31.jpg",
    name: "Разработка маркетинговых стратегий",
    author: "Владимир Вольфович Воронецкий",
    place: "ул.1905 года 69, каб.12",
    date: "2023-09-04T19:30:00.000",
  },
  {
    id: 3,
    img: "https://www.mirf.ru/wp-content/uploads/2021/08/Start.jpg",
    name: "Верстка на таблицах и другие ископаемые",
    author: "Григорий Иванович Ваганов",
    place: "ул.Петухова 50к1, каб.24",
    date: "2023-06-20T20:00:00.000",
  },
  {
    id: 4,
    img: "https://248006.selcdn.ru/main/iblock/ea6/ea64f829f84bb7f85ab9f17e351bee1a/4e7feedfb613f035e3c819921a2eec86.png",
    name: "Тренды веб-дизайна 2023",
    author: "Лариса Даниловна Антикайнен",
    place: "ул.Коммунистическая 17, каб.20",
    date: "2023-06-17T20:00:00.000",
  },
  {
    id: 5,
    img: "https://img.freepik.com/premium-photo/horizontal-banner-male-hacker-hacking-security-firewall-late-at-night-in-basement-hideout-multiple-screens-background-copy-space-hacking-and-malware-concept_411082-970.jpg",
    name: "Информационная безопасность",
    author: "Игорь Модестович Дозоров",
    place: "ул.1905 года 69, каб.15",
    date: "2023-06-05T18:00:00.000",
  },
]);

let items = ref(meetups.value);
const inputValue = ref(null);

const filteredItems = computed(() => {
  if (inputValue.value) {
    return items.value.filter(
      (item) => item.name.startsWith(inputValue.value) || item.name.toLowerCase().startsWith(inputValue.value))
  }
  return items.value
});

const filterBy = function(value) {
  value === "allDate" ? items.value = meetups.value :
    value === "pastDate" ? items.value = meetups.value.filter((item) => new Date() > new Date(item.date)) :
      value === "futureDate" ? items.value = meetups.value.filter((item) => new Date() < new Date(item.date)) :
        items.value
};

const sortItems = ['По дате', 'По названию', 'По имени'];

const sortByDate = (a, b) => (new Date(a.date) > new Date(b.date)) ? 1 : -1;
const sortByName = (a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 : -1;
const sortByAuthor = (a, b) =>(a.author.toLowerCase() > b.author.toLowerCase()) ? 1 : -1;

const sortBy = function(sortValue) {
  sortValue === 'По дате' ? items.value.sort(sortByDate) :
    sortValue === 'По названию' ? items.value.sort(sortByName) :
      sortValue === 'По имени' ? items.value.sort(sortByAuthor) :
      items.value
};

const formatDate = function(date) {
  let year = date.getFullYear().toString().slice(-2);
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minutes = date.getMinutes();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${day}.${month}.${year} ${hour}:${minutes}`
};

//Форма создания митапа
//const defaultImg = 'https://248006.selcdn.ru/main/iblock/ea6/ea64f829f84bb7f85ab9f17e351bee1a/4e7feedfb613f035e3c819921a2eec86.png';
const defaultParams = {
  time: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30'],
  img: 'https://248006.selcdn.ru/main/iblock/ea6/ea64f829f84bb7f85ab9f17e351bee1a/4e7feedfb613f035e3c819921a2eec86.png',
  description: 'Автор не добавил описание - приходите и все узнаете :)'
}
const params = reactive({
  //time: ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30'],
  name: '',
  description: '',
  author: '',
  place: '',
  date: [],
  dayUTC: '',
  timeUTC: '',
  img: defaultParams.img,
});

const showForm = function() {
  let form = document.querySelector('.new-item-form');
  let btn = document.querySelector('.v-toolbar ion-icon');
  form.classList.toggle('d-none');
  btn.classList.toggle('rotate');
  getDates()
};

const getDates = function() {
 let currentDate = new Date();
 for (let i = 0; i < 30; i++) {
  let nextDate = currentDate.setDate(currentDate.getDate() + 1);
  let year = new Date(nextDate).getFullYear().toString().slice(-2);
  let month = new Date(nextDate).getMonth() + 1;
  let day = new Date(nextDate).getDate();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;

  let date = `${day}.${month}.${year}`;
  params.date.push(date)
 }
};

const setDate = (d) => d ? params.dayUTC = `20${d.split('.').reverse().join('-')}` : params.dayUTC = null;
const setTime = (t) => t ? params.timeUTC = `T${t}:00.000` : params.timeUTC = null;
const setImg = (e) => params.img = URL.createObjectURL(e.target.files[0]);

const alert = reactive({
  success: false,
  error: false,
});

const hideAlerts = function() {
  alert.error = false;
  alert.success = false;
};

const checkForm = function() {
  alert.success = false;
  if (!params.dayUTC || !params.timeUTC) return alert.error = true;
  return alert.error = false;
};

const resetForm = function() {
  let form = document.getElementsByTagName('form');
  form[0].reset()
};

const makeNewMeetup = function() {
  checkForm();
  if (!alert.error) {
    let newM = {
      id: meetups.value.length + 1,
      img: params.img,
      name: params.name,
      description: params.description,
      author: params.author,
      place: params.place,
      date: `${params.dayUTC}${params.timeUTC}`
    };
    meetups.value.push(newM);
    params.img = defaultParams.img;
    params.description = '';
    alert.success = true;
    resetForm();
    setTimeout(hideAlerts, 2000);
  } else {
    return
  }  
};

</script>

<template>
  <v-app class="d-block text-center bg-grey-lighten-5 mx-auto">
    <v-card class="rounded-0">
      <v-toolbar color="white">
        <h1 class="title">Meetups</h1>
        <v-btn color="primary" @click="showForm()">
          <ion-icon name="add-circle"></ion-icon>
        </v-btn>
      </v-toolbar>
    </v-card>
    <v-alert
      class="rounded-0"
      v-model="alert.error"
      color="error"
    >
      Выберите дату и время
    </v-alert>
    <v-alert
      class="rounded-0"
      v-model="alert.success"
      color="success"
    >
      Мероприятие успешно добавлено!
    </v-alert>

    <v-row class="new-item-form d-none mt-5">
      <v-col cols="12" md="10" class="mx-auto">
        <v-container fluid>
          <form @submit.prevent.stop="makeNewMeetup" @input="hideAlerts">
          <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="params.name"
              label="Название митапа"
              placeholder="Название"
              clearable
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="params.description"
              label="Описание"
              placeholder="Подробнее о мероприятии"
              counter="125"
              clearable
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="params.author"
              label="Имя лектора"
              placeholder="Фамилия Имя Отчество"
              clearable
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="params.place"
              label="Адрес"
              placeholder="Адрес"
              clearable
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="4">
              <v-select label="Дата" variant="underlined"
                :items="params.date" 
                return-object
                @update:modelValue="setDate"
                clearable
              ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
              <v-select label="Время" variant="underlined"
                :items="defaultParams.time" 
                return-object
                @update:modelValue="setTime"
                clearable
              ></v-select>
          </v-col>
          <v-col>
            <v-file-input @change="setImg" clearable label="Загрузить файл"></v-file-input>
          </v-col>
          </v-row>
          <v-btn type="submit" class="mt-5" color="primary">Добавить</v-btn>
          </form>
        </v-container>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="10" class="mx-auto">
        <v-container fluid>
          <v-row class="justify-space-between align-center flex-wrap tools">
            <v-col class="toggle-btns">
              <v-btn-toggle color="deep-purple-darken-4" group mandatory>
                <v-btn variant="text" rounded="xl" value="all"
                  @click.prevent.stop="filterBy('allDate')">Все</v-btn>
                <v-btn variant="text" rounded="xl" value="past"
                  @click.prevent.stop="filterBy('pastDate')">Прошедшие</v-btn>
                <v-btn variant="text" rounded="xl" value="future"
                  @click.prevent.stop="filterBy('futureDate')">Ожидаемые</v-btn>
              </v-btn-toggle>
            </v-col>

            <v-col sm="auto">
              <v-select label="Сортировка" variant="underlined"
                :items="sortItems" 
                return-object
                @update:modelValue="sortBy"
                ></v-select>
            </v-col>

            <v-col>
              <v-form class="search">
                <v-text-field v-model="inputValue" variant="underlined" label="Поиск по названию..."
                  required></v-text-field>
              </v-form>
            </v-col>
          </v-row>

          <meetup-cards v-for="item in filteredItems" :key="item.id"
          :src="item.img"
          :alt="item.name"
          :name="item.name"
          :description="item.description ? item.description : defaultParams.description"
          :author="item.author"
          :place="item.place"
          :date="formatDate(new Date(item.date))"
          />
        </v-container>
      </v-col>
    </v-row>

    <v-footer class="mt-5 pa-3" color="grey-darken-3">
      <v-row>
        <v-col class="ml-auto mr-md-5" cols="auto">
          <div>&copy; {{ new Date().getFullYear() }}</div>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
