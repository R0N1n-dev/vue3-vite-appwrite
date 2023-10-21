import './assets/main.css';

import { createApp } from 'vue';
import pinia from './stores';

import App from './App.vue';
import router from './router';

const app = createApp(App);
pinia.use(({ store }) => {
  store.router = markRaw(router);
});
//const pinia = createPinia()
app.use(pinia);
app.use(router);

app.mount('#app');
