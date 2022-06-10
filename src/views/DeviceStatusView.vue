<template>
<div class="v-device-status">
   <h2>Device name: {{$route.params.id}}</h2>
   <div class="time-line">
      TODO Trends
   </div>

   <div class="info">
      <div class="info__message info__preset">
         <h3>События механизма</h3>
         <message-line
            v-for="(mess, i) in MESSAGES_BY_ID($route.params.id)"
            :key="i"
            :message="mess"
         >

         </message-line>
      </div>
      <div class="info__charts info__preset">
         <h3>Время работы/простоя/в ремонте</h3>
         <div class="charts">
            <apexchart type="pie" width="280" :options="chartOptions" :series="series"></apexchart>
         </div>

      </div>
      <div class="info__rout-message info__preset">
         <h3>Запуски в маршруте</h3>
         <rout-line></rout-line>
      </div>
   </div>

</div>
   
</template>

<script>
import routLine from '@/components/UI/v-rout_line'
import VueApexCharts from "vue3-apexcharts";
import chartPreset from '@/core/presetApexchart'

import { mapGetters, mapActions } from 'vuex'
export default {
   components:{
      routLine,
      apexchart: VueApexCharts,
   },
   data(){
      return {
         series: [44, 55, 23],
         chartOptions: chartPreset,
      }
   },
   computed:{
      ...mapGetters('device',['MESSAGES_BY_ID']),
   },
   methods:{
      ...mapActions('device',['LOAD']),

   },
   created(){
      this.LOAD();
   }
   
}
</script>

<style lang="less">
.time-line{
   max-width: 1000px;
   border: 1px solid tomato;
}

.info{
   display: grid;
   grid-gap: 28px;
   grid-template-columns: 1fr 1fr;

   &__preset{
      background: var(--clr_gray3);
      padding: 8px;
   }

   &__message{
      grid-column: 1;
      grid-row: 1 / 3;
   }
}

</style>