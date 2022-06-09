<template>
<div class="v-device-status">
   <h2>Device name: {{$route.params.id}}</h2>
   <div class="time-line">
      TODO Trends
   </div>

   <div class="info">
      <div class="info__message info__preset">
         <h3>События механизма</h3>
         <message-line></message-line>
         <message-line></message-line>
         <message-line></message-line>
      </div>
      <div class="info__charts info__preset">
         <h3>Время работы/простоя/в ремонте</h3>

      </div>
      <div class="info__rout-message info__preset">
         <h3>Запуски в маршруте</h3>

      </div>
   </div>

</div>
   
</template>

<script>
export default {
   data:()=>({

   }),
   computed:{

   },
   methods:{

   },
   created(){

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
   }

   &__message{
      grid-column: 1;
      grid-row: 1 / 3;
   }
}

</style>