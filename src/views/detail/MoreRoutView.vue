<template>
   <div class="more-rout">
      <div class="time-line">
         TODO Trends
         <h2>Rout: {{$route.params.id}}</h2>
         
      </div>

      <div class="rout-info">
         <div class="rout-info__events rout-info__substrate">
            <h3>События в маршруте</h3>
            <div class="rout-info__events_wrap">
               <v-route-log 
                  v-for="(log, i) in LOGS" 
                  :key="i"
                  :text="log.RouteMessage"
                  :datatime="log.LastAccess"
                  :error="log.error"
               >
               </v-route-log>
            </div>
         </div>
         <div class="rout-info__charts rout-info__substrate">
            <h3>Работа/простой</h3>
         </div>
         <div class="rout-info__device-list rout-info__substrate">
            <h3>Механизмы в маршруте</h3>
            <div class="rout-info__device-list_wrap">
               <v-device
                  v-for="(dev, i) in MECHANISMS"
                  :key="i"
                  :content="dev.PText5"
               >
               </v-device>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import vRouteLog from '@/components/UI/v-rout_log';
import vDevice from '@/components/UI/v-device';

export default {
   components:{
    vRouteLog,
    vDevice,
},
   props:{

   },
   data(){
      return{

      }
   },
   computed:{
       ...mapGetters('routList',
       [
         'LOGS', 
         'MECHANISMS'
         ]),

   },
   methods:{
      ...mapActions('routList',
      [
          'LOAD_ROUT_LOGS',
          'LOAD_MECHANISMS',
          'LOAD_ROUTE_ALARM',
      ]),

   },
   mounted(){
      this.LOAD_ROUT_LOGS(this.$route.params.id);
      this.LOAD_MECHANISMS(this.$route.params.id);
      this.LOAD_ROUTE_ALARM(this.$route.params.id);
   }
}
</script>

<style lang="less">
   .time-line{
      max-width: 1000px;
      height: 315px;
   }

   .rout-info{
      display: grid;
      grid-gap: 28px;
      grid-template-columns: 1fr 1fr;

      &__events{
         grid-column: 1;
         grid-row: 1 / 3;

         &_wrap{
            height: 493px;
            overflow: auto;
         } 
      }

      &__charts{
         height: 152px;
      }


      &__device-list{
         
         overflow: auto;
          scrollbar-width: 3px;
          scrollbar-color: var(--clr_gray2);

          &_wrap{
            height: 320px;
            overflow: auto;
          }
      }



      &__substrate{
        background: var(--clr_gray3);
        padding: 8px; 
      }
      
   }
</style>