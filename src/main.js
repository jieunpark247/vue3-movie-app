import { createApp } from 'vue'
import App from './App.vue'
import router from './routes' // Same as './routes/index.js'
import store from './store'  // Same as './store/index.js'
import loadImage from './plugins/loadImage'  

createApp(App)
    .use(router) // $route , $router
    .use(store) // $store
    .use(loadImage) // $loadImage
    //자주사용되는 기능들을 플러그인으로 만든다.
    .mount('#app')