<template>
   <div class="more-sensor">
      <div class="line-wrap">
         <h2>Sensor: {{$route.params.MsgNr}}</h2>
         <div class="line-charts">
               <apexchart type="line" height="260" :options="chartOptions" :series="series"></apexchart>
         </div>
      </div>

      <div class="sensor-info">
         <div class="sensor__events sensor-info__item">
            <h3>События датчика</h3>
            <div class="sensor-info__events-wrap">
               <v-sens-log
                  v-for="(log, i) in LOGS"
                  :key="i"
                  :log="log"
               >
               </v-sens-log>
            </div>
         </div>
         <div class="sensor__alarms sensor-info__item">
            <h3>Количество аварий</h3>
            <div class="sensor-info__number-breakdowns">
               <div class="number-row">
                  <span>Кол-во за выбраный период</span>
                  <span>{{ QUANTITY }}</span>
               </div>
               <div class="number-row">
                  <span>Кол-во за месяц</span>
                  <span>{{ CRASH_STATISTICS[0] }}</span>
               </div>
               <div class="number-row">
                  <span>Кол-во месяцем ранее</span>
                  <span>{{ CRASH_STATISTICS[1] }}</span>
               </div>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import vSensLog from '@/components/UI/v-sensor_log';
import VueApexCharts from "vue3-apexcharts";
import lineChartOptions from "@/core/presetLineChart";
export default {
      components: {
      vSensLog,
      apexchart: VueApexCharts,
   },
   data(){
      return{
         series: [{
            name: 'Срабатываний',
            data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5]
          }],
          chartOptions: lineChartOptions
      }
   },
   computed:{
      ...mapGetters('sensors', ['QUANTITY', 'CRASH_STATISTICS', 'LOGS']),
      ...mapGetters('navigationData', ['TIME_RANGE']),
   },
   methods: {
      ...mapActions('sensors',['LOAD_STAT', 'LOAD_LOGS']),
   },
   mounted() {
      let Msg = {};
      Msg.MsgN = this.$route.params.MsgNr;
      Msg.devID = this.$route.params.id;

      this.LOAD_STAT(Msg);

      let fields = {};
      fields.MsNr = this.$route.params.MsgNr;
      fields.ID = this.$route.params.id;
      fields.SensName = this.$route.params.Name;
      fields.range = this.TIME_RANGE;

      this.LOAD_LOGS(fields);

   }
}

</script>

<style lang="less">
   .line-wrap{
      max-width: 1000px;
   }

   .sensor-info {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: 1fr 1fr;

      &__item {
         background: var(--clr_gray3);
         padding: 8px; 
      }

      &__events-wrap {
         height: 493px;
         overflow: auto;
      }

      &__number-breakdowns {
         padding-bottom: 25px;
      }
   }

   .number-row{
      display: flex;
      justify-content: space-between;
      text-align: left;
      padding: 15px 20px 10px;
      border-bottom: 1px solid #fff;
   }

   @media (max-width: 992px) {
      .sensor-info {
         grid-template-columns: 1fr;
         padding: 20px;
      }

      .time-line{
         padding: 0 20px;
      }
   }

   @media (max-width: 510px) {

   }
</style>