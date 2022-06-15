<template>
   <div class="more-sensor">
      <div class="time-line">
         TODO Trends
         <h2>Sensor: {{$route.params.id}}</h2>
      </div>

      <div class="sensor-info">
         <div class="sensor__events">
            <h3>События датчика</h3>
         </div>
         <div class="sensor__alarms">
            <h3>Количество аварий</h3>
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
   .sensor-info{
      display: flex;
      justify-content: space-between;
   }
</style>