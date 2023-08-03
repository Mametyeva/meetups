<script setup>
import { defineProps, defineEmits, watch, ref } from 'vue'

const emits = defineEmits(['update:modelValue'])

const modelValue = defineProps({
    modelValue: String,
    src: String,
    alt: String,
    name: String,
    description: String,
    author: String,
    place: String,
    date: String,
})

const value = ref(modelValue)

watch(value, () => {
  emits('update:modelValue', value.value)
})
</script>

<template>
      <v-card class="mb-3">
            <v-row class="card align-center">
              <v-col class="card-img" cols="12" md="6">
                <v-img class="d-flex align-center pa-4 photo" cover :src="src" :alt="alt"
                  gradient="to top right, rgba(100,115,201,.53), rgba(25,32,72,1)">
                  <p class="title text-h6 text-sm-h5 white-text font-weight-light">{{ name }}</p>
                  <p class="description white-text font-weight-light">{{ description }}</p>
                </v-img>
              </v-col>
              <v-col class="card-content" cols="12" md="6">
                <div class="text-left pa-3 pa-sm-5">
                  <v-card-text class="d-flex align-top align-lg-center py-1">
                    <ion-icon name="person-outline" class="pr-2 pr-sm-3"></ion-icon>
                    <h6 class="d-inline font-weight-light">{{ author }}</h6>
                  </v-card-text>
                  <v-card-text class="d-flex align-top align-lg-center py-1">
                    <ion-icon name="location-outline" class="pr-2 pr-sm-3"></ion-icon>
                    <h6 class="d-inline font-weight-light">{{ place }}</h6>
                  </v-card-text>
                  <v-card-text class="d-flex align-top align-lg-center py-1">
                    <ion-icon name="calendar-clear-outline" class="pr-2 pr-sm-3"></ion-icon>
                    <h6 class="d-inline font-weight-light">{{ date }}</h6>
                  </v-card-text>
                </div>
              </v-col>
            </v-row>
          </v-card>
</template>