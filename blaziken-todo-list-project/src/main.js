import './style.css';

import { createApp } from 'vue';
import App from './App.vue';
<<<<<<< Updated upstream

import router from './router';
//import { MotionPlugin } from '@vueuse/motion';

const app = createApp(App);

//app.use(MotionPlugin).use(router)
app.use(router).mount('#app')

// app.mount('#app')
=======
// import VueLazyLoad from 'vue-lazyload'
import router from './router';
import { MotionPlugin } from '@vueuse/motion';

const app = createApp(App);

app.use(MotionPlugin).use(router)

app.mount('#app')
>>>>>>> Stashed changes
