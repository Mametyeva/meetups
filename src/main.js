import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/dist/vuetify.min.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import './assets/main.css'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(vuetify)
app.mount('#vapp')