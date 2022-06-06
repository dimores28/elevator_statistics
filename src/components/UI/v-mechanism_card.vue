<template>
   <div class="v-mechanism-card card">
      <div class="card__led"></div>

      <div class="card__content">
         <p class="card__lable">{{mechanismData.title}}</p>
         <p class="card__subline">Ошибок: {{mechanismData.errorsNum}}</p>
      </div>

   </div>
</template>

<script>
export default {
   name: 'v-mechanism-card',
   props:{
      mechanismData:{
         type: Object,
         default: {id:0, title:'H1', errorsNum: 0, state: 0}
      }
      
   },
   data: ()=>({

   }),
   computed:{

   },
   methods:{

   }
   
}
</script>

<style lang="less">
   .card{
      width: 190px;
      background: var(--clr_menu);
      border-radius: 8px;
      color: #fff;
      padding: 8px;
      position: relative;

      &__led{
         position: absolute;
         left: 0;
         top: 0;
         bottom: 0;
         width: 10px;
         border-top-left-radius: 8px;
         border-bottom-left-radius: 8px;
         background: var(--clr_state_warning);
      }

      &__lable{
         font-family: 'Roboto';
         font-weight: 400;
         font-size: 36px;
         line-height: 42px;
         margin: 7px;
      }

      &__subline{
         font-size: 16px;
         line-height: 24px;
         letter-spacing: 0.5px;
         margin: 7px;
      }
   }

   .card:hover{
         background: var(--clr_bg);
   }


</style>