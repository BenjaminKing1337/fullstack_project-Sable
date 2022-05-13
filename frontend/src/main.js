import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import './axios'
import { Quasar } from 'quasar'
import quasarUserOptions from './quasar-user-options'

createApp(App).use(Quasar, quasarUserOptions).use(Router).mount('#app')
