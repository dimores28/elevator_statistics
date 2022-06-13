import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueApexCharts from "vue3-apexcharts";
import Antd from 'ant-design-vue';


import vMessageline from '@/components/UI/v-message_line'

let app = createApp(App);

app.component('message-line', vMessageline);

app.use(store);
app.use(router);
app.use(Antd);
app.use(VueApexCharts);
app.mount('#app');

