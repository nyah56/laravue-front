import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { router } from './router';
import vuetify from './plugins/vuetify';
import '@/scss/style.scss';
import { PerfectScrollbarPlugin } from 'vue3-perfect-scrollbar';
import VueApexCharts from 'vue3-apexcharts';
import VueTablerIcons from 'vue-tabler-icons';
import piniaPersist from 'pinia-plugin-persistedstate';
// print
import print from 'vue3-print-nb';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPersist);
app.use(router);
app.use(PerfectScrollbarPlugin);
app.use(pinia);
app.use(VueTablerIcons);
app.use(print);
app.use(VueApexCharts);
app.use(vuetify).mount('#app');
