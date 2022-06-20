<template>
<div class="v-device-status">
   <div class="time-line">
      <!-- <h2>Device name: {{$route.params.id}}</h2> -->
      <apexchart type="rangeBar" height="260"
         :series="timlineData"
         :options="timlinePreset"
      >
      </apexchart>
   </div>

   <div class="device-info info">
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
         <div class="charts-wrap">
            <div class="charts">
               <apexchart type="pie" width="132" :options="chartOptions" :series="series"></apexchart>
            </div>
            <div class="charts__legend">
               <v-legend
                  text="Время в работе"
                  precent="55"
                  time="03:37:14"
               />
               <v-legend
                  text="Время в ремонте"
                  precent="36"
                  time="02:03:14"
                  activeColor="#2D4EC4"
               />
               <v-legend
                  text="Время простоя"
                  precent="19"
                  time="00:57:14"
                  activeColor="#000"
               />
            </div> 
         </div>
      </div>
      <div class="info__rout-message info__preset">
         <h3>Запуски в маршруте</h3>
         <rout-line></rout-line>
         <rout-line></rout-line>
         <rout-line></rout-line>
         <rout-line></rout-line>
      </div>
   </div>

</div>
   
</template>

<script>
import routLine from '@/components/UI/v-rout_line'
import VueApexCharts from "vue3-apexcharts";
import chartPreset from '@/core/presetApexchart'
import timlinePreset from '@/core/presetTimeLine'
import vLegend from '@/components/UI/v-legend';

import { mapGetters, mapActions } from 'vuex'
export default {
   components:{
      routLine,
      vLegend,
      apexchart: VueApexCharts,
      
   },
   data(){
      return {
         series: [44, 55, 23],
         chartOptions: chartPreset,
         timlineData: [
            // Thomas Jefferson
            {
               name: 'Work',
               data: [
                  {
                     x: 'w',
                     y: [ 1, 2]
                  },
                   {
                     x: 'w',
                     y: [ 6, 7]
                  },
               ]
            },
            {
               name: 'Breaking',
               data: [
                  {
                     x: 'w',
                     y: [ 2, 4]
                  },
                  {
                     x: 'w',
                     y: [ 7, 8]
                  },
               ]
            },
            {
               name: 'Repaer',
               data: [
                  {
                     x: 'w',
                     y: [ 4, 5]
                  },
                  {
                     x: 'w',
                     y: [ 8, 12]
                  }
               ]
            },
         ],
         timlinePreset: timlinePreset
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
   // border: 1px solid tomato;
   height: 270px;
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

.charts-wrap{
   display: flex;
}

@media (max-width: 992px) {
   .info{
      grid-template-columns: 1fr;
   }
   
}

</style>