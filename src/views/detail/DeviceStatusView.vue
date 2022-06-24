<template>
<div class="v-device-status">
   <div class="time-line">
      <h2>Device name: {{$route.params.id}}</h2>
      <!-- <apexchart type="rangeBar" height="260"
         :series="timlineData"
         :options="timlinePreset"
      >
      </apexchart> -->
   </div>

   <div class="device-info info">
      <div class="info__message info__preset">
         <h3>События механизма</h3>
         <div class="info__message_wrap">
            <message-line
               v-for="(mess, i) in MESSAGES"
               :key="i"
               :message="mess"
            >
            </message-line>
         </div>
      </div>
      <div class="info__charts info__preset">
         <h3>Время работы/простоя/в ремонте</h3>
         <div class="charts-wrap">
            <div class="charts">
               <apexchart type="pie" width="132" :options="chartOptions" :series="series"></apexchart>
            </div>
            <div class="charts__legend">
               <v-legend
                  text="В работе"
                  :precent="series[1]"
                  time="03:37:14"
               />
               <v-legend
                  text="В ремонте"
                  :precent="series[0]"
                  time="02:03:14"
                  activeColor="#2D4EC4"
               />
               <v-legend
                  text="Простой"
                  :precent="series[2]"
                  time="00:57:14"
                  activeColor="#000"
               />
            </div> 
         </div>
      </div>
      <div class="info__rout-message info__preset">
         <h3>Запуски в маршруте</h3>
         <div class="info__rout-message_wrap">
            <rout-line
               v-for= "(item, i) in ROUTE_LIST"
               :key="i"
               :log="item"
            >
            </rout-line>
         </div>
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
      ...mapGetters('device',
      [
         'MESSAGES', 
         'ROUTE_LIST',
         'TIME_REPAIR',
         'TIME_WORK',
         'PERIOD',
      ]),
      ...mapGetters('navigationData', ['TIME_RANGE']),
      series(){
         let work = Math.round(this.TIME_WORK * 100 / this.PERIOD);
         let repaer = Math.round(this.TIME_REPAIR * 100 / this.PERIOD);
         let downtime = 100 - work - repaer
         return [ repaer, work, downtime];
      },
      
   },
   methods:{
      ...mapActions('device',
      [
         'LOAD', 
         'GET_LIST_OF_ROUTES', 
         'LOAD_STATISTICALl_DATA',
      ]),
      reload(timerange){
         let device = {};
         device.id = this.$route.params.id;
         device.range = timerange;

         this.LOAD(device);
         this.GET_LIST_OF_ROUTES(device);
         this.LOAD_STATISTICALl_DATA(device);
      }

   },
   created(){
      let device = {};
      device.id = this.$route.params.id;
      device.range = this.TIME_RANGE;

      this.LOAD(device);
      this.GET_LIST_OF_ROUTES(device);
      this.LOAD_STATISTICALl_DATA(device);
   },
   mounted(){
      const context = this;
      this.emitter.on('select-datapicker', function(device){
          context.reload(device);
      });
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

      &_wrap{
         height: 493px;
         overflow: auto;
      }
   }

   &__rout-message{

      &_wrap{
         height: 320px;
         overflow: auto;   
      }
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