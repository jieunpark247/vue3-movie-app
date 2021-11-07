import { createApp } from 'vue'
import App from './App.vue'
import router from './routes' // Same as './routes/index.js'
import store from './store'  // Same as './store/index.js'
createApp(App)
    .use(router)
    .use(store)
    .mount('#app')