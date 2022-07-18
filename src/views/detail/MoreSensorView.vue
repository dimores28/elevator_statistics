<template>
   <div class="more-sensor">
      <div class="time-line">
         TODO Trends
         <h2>Sensor: {{$route.params.MsgNr}}</h2>
      </div>

      <div class="sensor-info">
         <div class="sensor__events sensor-info__item">
            <h3>События датчика</h3>
            <div class="sensor-info__events-wrap">

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

export default {
   data(){
      return{
         Quantity: 0
      }
   },
   computed:{
      ...mapGetters('sensors', ['QUANTITY', 'CRASH_STATISTICS']),
   },
   methods: {
      ...mapActions('sensors',['LOAD_STAT']),
   },
   mounted() {
      let Msg = {};
      Msg.MsgN = this.$route.params.MsgNr;
      Msg.devID = this.$route.params.id;

      this.LOAD_STAT(Msg);
   }
}
</script>

<style lang="less">
   .time-line{
      max-width: 1000px;
      height: 315px;
   }

   .sensor-info {
      display: grid;
      grid-gap: 20px;
      grid-template-columns: 1fr 1fr;

      &__item {
         background: var(--clr_gray3);
         padding: 8px; 
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