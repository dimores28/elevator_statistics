<template>
   <div class="v-legend">
      <div class="v-legend__led" :style="{background: activeColor}"></div>
      <div class="v-legend__text">{{text}}</div>
      <div class="v-legend__percent">{{precent}}%</div>
      <div class="v-legend__time">{{time}}</div>
   </div>
</template>

<script>
export default {
   props:{
      text:{
         type: String,
      },
      precent:{
         type: String,
      },
      time:{
         type: String,
      },
      activeColor:{
         type: String,
         default: 'green'
      }


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
.v-legend{
   display: flex;
   justify-content: space-between;
   align-content: stretch;
   position: relative;
   padding: 8px 8px 12px 20px;
   border-bottom: 1px solid white;
   max-width: 298px;

   &__led{
      position: absolute;
      top: 5px;
      left: 0;
      bottom: 5px;
      width: 8px;
      border-radius: 0 8px 8px 0;
   }

   &__percent{
      margin: 0 20px;
   }

}


</style>