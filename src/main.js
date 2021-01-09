import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { router } from './router'
import { store } from './store/index'
import { VuelidatePlugin } from '@vuelidate/core'
// import Vivus from 'vivus'

const app = createApp(App)


app.use(router)
app.use(store)
app.use(VuelidatePlugin)
// app.use(Vivus)

app.mount('#app')
