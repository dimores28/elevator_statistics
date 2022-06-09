<template>
   <div class="v-message-line">
      <div class="message">
         <div class="message__led"></div>
         <p class="message__text">Пуск</p>
         <p class="message__date">20.06.2021 12:10:23</p>
      </div>

   </div>
</template>

<script>
export default {
   
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
      }
   }
</style>