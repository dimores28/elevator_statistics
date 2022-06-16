<template>
   <div class="more-rout">
      <div class="time-line">
         TODO Trends
         <h2>Rout: {{$route.params.id}}</h2>
         
      </div>

      <div class="rout-info">
         <div class="rout-info__events">
            <h3>События в маршруте</h3>
         </div>
         <div class="rout-info__charts">
            <h3>Работа/простой</h3>
         </div>
         <div class="rout-info__device-list">
            <h3>Механизмы в маршруте</h3>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props:{

   },
   data(){
      return{

      }
   },
   computed:{

   },
   methods:{

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
      }
   }
</style>