<template>
   <div class="v-message-line">
      <div class="message">
         <div class="message__led" :class="classLight"></div>
         <p class="message__text">{{message.message}}</p>
         <p class="message__date">{{message.DateTime}}</p>
      </div>

   </div>
</template>

<script>
export default {
   props:{
      message:{
         type: Object
      }
   },
   computed:{
      classLight(){
         if(this.message.MessageClass == 'Log'){
            return 'log';
         }
         else if(this.message.MessageClass == 'Repeir')
         {
            return 'repeir';
         }
         else if(this.message.MessageClass == 'Warning'){
            return 'warning';
         }else{
            return 'errors';
         }
      }
   }
}
</script>

<style lang="less">
   .message{
      position: relative;
      display: flex;
      max-width: 510px;
      justify-content: space-between;
      border-bottom: 1px solid var(--clr_gray3);
      padding: 10px 24px 15px 32px;

      &__led{
         position: absolute;
         width: 8px;
         top: 6px;
         bottom: 8px;
         left: 0;
         background: var(--clr_state_ok );
         border-radius: 0px 8px 8px 0px;
      }

      &__text{
         text-align: left;
         margin: 0;
      }

      &__date{
         text-align: right;
         margin: 0;
         margin-left: 10px;
         min-width: 146px;
      }
   }

   .log{
      background: var(--clr_state_ok);
   }

   .repeir{
      background: var(--clr_state_repair);
   }

   .errors{
      background: var(--clr_state_alarm);
   }

   .warning{
      background: var(--clr_state_warning);
   }
</style>