<template>
   <div class="v-rout-log">
      <div class="rout-log">
         <div class="rout-log__led" :class="error || text === 'АВАРИЯ'? 'error': ''"></div>
         <div class="rout-log__text">
             {{text}}
         </div>
         <div class="rout-log__DateTime">
            {{datatime}}
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props:{
      text:{
         type: String
      },
      datatime:{
         type: String
      },
      error:{
         type: Boolean,
         default: false,
      }
   }
}
</script>

<style lang="less">
.rout-log{
   position: relative;
   display: flex;
   justify-content: space-between;
   text-align: center;
   padding: 10px 10px 15px 32px;
   max-width: 510px;
   border-bottom: 1px solid var(--clr_gray3);

   &__led{
      position: absolute;
      top: 5px;
      left: 0;
      bottom: 5px;
      width: 8px;
      border-radius: 0px 8px 8px 0px;
      background: var(--clr_state_ok );
   }

   &__DateTime{
      min-width: 146px;
      margin-left: 10px;
   }

   .error{
      background: var(--clr_state_alarm );
   }
}

</style>