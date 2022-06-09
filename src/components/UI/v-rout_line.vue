<template>
   <div class="v-rout-line">
      <div class="rout-log">
         <div class="rout-log__souce">Силос СБ-3</div>
         <div class="rout-log__recive">Морская отгрузка</div>
         <div class="rout-log__culture">Кукуруза</div>
      </div>
   </div>
</template>

<script>
export default {
   props:{
      log:{
         type: Object,
      }
   },
   
}
</script>

<style lang="less">
.rout-log{
   display: flex;
   justify-content: space-between;
   border-bottom: 1px solid var(--clr_gray2);
   padding: 15px 8px;
}

</style>