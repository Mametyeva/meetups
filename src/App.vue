<script setup>
import { ref, computed } from "vue";
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
    date: "2023-07-20T20:00:00.000",
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
const inputValue = ref(null)

const filteredItems = computed(() => {
  if (inputValue.value) {
    return items.value.filter(
      (item) => item.name.startsWith(inputValue.value) || item.name.toLowerCase().startsWith(inputValue.value))
  }
  return items.value
})

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
}

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
}
</script>

<template>
  <v-app class="d-block text-center bg-grey-lighten-5 mx-auto">
    <v-card class="mb-5">
      <h1 class="pa-2">Meetups</h1>
    </v-card>

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

          <v-card class="mb-3" v-for="item in filteredItems" :key="item.id">
            <v-row class="card align-center">
              <v-col class="card-img" cols="12" md="6">
                <v-img class="d-flex align-center pa-4 photo" cover :src="item.img"
                  gradient="to top right, rgba(100,115,201,.53), rgba(25,32,72,1)">
                  <p class="text-h6 text-sm-h5 white-text font-weight-light">{{ item.name }}</p>
                </v-img>
              </v-col>
              <v-col class="card-content" cols="12" md="6">
                <div class="text-left pa-3 pa-sm-5">
                  <v-card-text class="d-flex align-top align-lg-center py-1">
                    <ion-icon name="person-outline" class="pr-2 pr-sm-3"></ion-icon>
                    <h6 class="d-inline font-weight-light">{{ item.author }}</h6>
                  </v-card-text>
                  <v-card-text class="d-flex align-top align-lg-center py-1">
                    <ion-icon name="location-outline" class="pr-2 pr-sm-3"></ion-icon>
                    <h6 class="d-inline font-weight-light">{{ item.place }}</h6>
                  </v-card-text>
                  <v-card-text class="d-flex align-top align-lg-center py-1">
                    <ion-icon name="calendar-clear-outline" class="pr-2 pr-sm-3"></ion-icon>
                    <h6 class="d-inline font-weight-light">{{ formatDate(new Date(item.date)) }}</h6>
                  </v-card-text>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-container>
      </v-col>
    </v-row>

    <v-footer class="mt-5 pa-3" color="grey-darken-3">
      <v-row>
        <v-col class="ml-auto" cols="auto">
          <div>&copy; {{ new Date().getFullYear() }}</div>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>
