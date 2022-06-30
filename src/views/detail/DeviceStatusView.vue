<template>
<div class="v-device-status">
   <div class="time-line">
      <h2>{{$route.params.name}}</h2>
      <div class="time-line__wrap">
         <apexchart type="rangeBar" height="260"
            :series="timlineData"
            :options="timlinePreset"
         >
         </apexchart>
      </div>
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
                  :time="WORK_TIME"
               />
               <v-legend
                  text="В ремонте"
                  :precent="series[0]"
                  :time="REPAIR_TIME"
                  activeColor="#2D4EC4"
               />
               <v-legend
                  text="Простой"
                  :precent="series[2]"
                  :time="SIMPLE_TIME"
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
         timlineData: [],
         timlinePreset: timlinePreset,
         data: [
               // John Adams
               {
               name: 'Thomas Jefferson',
               data: [
                  {
                     x: 'w',
                     y: [ 0, 2]
                  },
                  {
                     x: 'w',
                     y: [ 5, 9]
                  }
               ]
               },
               // George Washington
               {
               name: 'w',
               data: [
                  {
                     x: 'w',
                     y: [ 2, 3]
                  },
               ]
               },
               // Thomas Jefferson
               {
               name: 'Thomas Jefferson',
               data: [
                  {
                     x: 'w',
                     y: [ 3, 5]
                  },
                  {
                     x: 'w',
                     y: [ 9, 10]
                  },
                  {
                     x: 'w',
                     y: [ 12, 17]
                  }
               ]
               },

            ],
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
         'SIMPLE_TIME',
         'WORK_TIME',
         'REPAIR_TIME'
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
      },
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

      setTimeout(() => {
               context.timlineData = context.data;
      }, 1000);
   }
   
}
</script>

<style lang="less">
.time-line{
   max-width: 1000px;
   // border: 1px solid tomato;

   h2{
      margin-top: 0;
   }
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