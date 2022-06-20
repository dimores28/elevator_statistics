import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApexCharts from "vue3-apexcharts";
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Datepicker from '@vuepic/vue-datepicker';
import mitt from 'mitt';


import "primevue/resources/themes/mdc-dark-deeppurple/theme.css"
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import '@vuepic/vue-datepicker/dist/main.css'

import vMessageline from '@/components/UI/v-message_line'

const emitter = mitt();

let app = createApp(App)

app.component('message-line', vMessageline);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Datepicker', Datepicker);

app.config.globalProperties.emitter = emitter;

app.use(store);
app.use(router);
app.use(PrimeVue);
app.use(VueApexCharts);
app.mount('#app');

