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
               <apexchart type="pie"  :options="chartOptions" :series="series" id="pie"></apexchart>
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
               v-for= "item in ROUTE_LIST"
               :key="item.MesIDRout"
               :log="item"
               @click="openRout(item.MesIDRout, item.Source, item.Recive)"
            >
            </rout-line>
         </div>
      </div>
   </div>

</div>
   
</template>

<script>
import routLine from '@/components/UI/v-rout_line'
import VueApexCharts from "vue3-apexcharts"
import chartPreset from '@/core/presetApexchart'
import timlinePreset from '@/core/presetTimeLine'
import vLegend from '@/components/UI/v-legend'
import toISODate from '@/api/workWithDate'

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
         'SIMPLE_TIME',
         'WORK_TIME',
         'REPAIR_TIME',
         'LAUNCHES',
         'REPAIRS',
         'ERRORS'
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
      ...mapActions('navigationData',['SET_TITLE', 'SET_TEXT']),
      reload(timerange){
         let device = {};
         device.id = this.$route.params.id;
         device.range = timerange;

         this.LOAD(device);
         this.GET_LIST_OF_ROUTES(device);
         this.LOAD_STATISTICALl_DATA(device);
      },
      getTimlineData(){
         let rezData = [];

         let work = {name: 'В работе', data: []};
         let start = null;
         let stop = null;

         this.LAUNCHES.forEach(element => {
            if(element.MsgNr === 23 && !start ){
               start = new Date(element.DateTime) - 0;
            }
            else if(element.MsgNr === 25 && !stop) {
               stop = new Date(element.DateTime) - 0;
            }

            if(start && stop){
               work.data.push({x: 'w', y: [start, stop]});
               start = null;
               stop = null;
            }
            
         });
         rezData.push(work);

         let repaer = {name: 'В ремонте', data: []};
         this.REPAIRS.forEach(elem =>{

            if(elem.MsgNr === 6 && !start ){
               start = new Date(elem.DateTime) - 0;
            }
            else if(elem.MsgNr === 7 && !stop) {
               stop = new Date(elem.DateTime) - 0;
            }

            if(start && stop){
               repaer.data.push({x: 'w', y: [start, stop]});
               start = null;
               stop = null;
            }

         });
         rezData.push(repaer);

         let alarm = {name: 'В авварии', data: []};
         this.ERRORS.forEach(arr => {
            let s = new Date(toISODate(arr.DateTime));
            let e = new Date(s.getTime() + 10*60000)

            alarm.data.push({x: 'w', y: [new Date(s) - 0,  new Date(e) - 0]});
         });

         rezData.push(alarm);

         return rezData;
      },
      openRout(id, Source, Recive){
         this.SET_TITLE('Маршруты');
         this.SET_TEXT(`Маршруты > ${Source} --> ${Recive}`)
         this.$router.push({ name: 'rout', params: { id: id, rout: `${Source} --> ${Recive}`} });
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

      setTimeout(() => {
         let t = context.getTimlineData();
         context.timlineData = t;      
      }, 1000);
   }
   
}
</script>

<style lang="less">
.time-line{
   max-width: 1000px;

   h2{
      margin-top: 0;
   }
}

.apexcharts-canvas{
   margin: 0 auto;
}

.info{
   display: grid;
   grid-gap: 20px;
   grid-template-columns: 1fr 1fr;
   padding: 0 10px;

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

#pie{
      width: 150px;
}

.charts__legend{
   flex-grow: 1;
   padding-right: 10px;
}

@media (max-width: 992px) {
   .info{
      grid-template-columns: 1fr;
      padding: 20px;

      &__message{
         grid-column: 1;
         grid-row: 2;
      }
   }

   .time-line{
      padding: 0 20px;
   }

   #pie{
      width: 180px;
   }
   
}

@media (max-width: 510px) {
   .time-line__wrap{
      display: none;
   }

   #pie{
      margin: 0 auto;
   }

   .charts-wrap{
      flex-direction: column;
      // align-items: center;
   }
}

</style>