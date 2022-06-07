<template>
   <div class="v-mechanism-card card" >
      <iv class="card__led"  :class="mechanismState"></iv>

      <div class="card__content">
         <p class="card__lable">{{mechanismData.title}}</p>
         <p class="card__subline" :class="showSubline">Ошибок: {{mechanismData.errorsNum}}</p>
      </div>

   </div>
</template>

<script>
export default {
   name: 'v-mechanism-card',
   props:{
      mechanismData:{
         type: Object,
         default: {id:0, title:'H1', errorsNum: 0, state: 3}
      }
      
   },
   data: ()=>({

   }),
   computed:{
      mechanismState(){
         let retClass = '';
         console.log(this.mechanismData.state);
         switch (this.mechanismData.state) {
				case 1: retClass = "card__led_ok"; break;
				case 2: retClass = "card__led_repair"; break;
				case 3: retClass = "card__led_waqrning"; break;
				case 4: retClass = "card__led_alarm"; break;
				default: retClass = "card__led_ok"; break;
			}
         console.log(retClass);
         return retClass;
      },
      showSubline(){
         if(!this.mechanismData.errorsNum){
            return 'card__subline_hide';
         }
         else{
            return '';
         }
      }
   },
   methods:{

   }
   
}
</script>

<style lang="less">

   .card{
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

         &_ok{
            background: var(--clr_state_ok);
         }

         &_repair{
            background: var(--clr_state_repair);
         }

         &_waqrning{
            background: var(--clr_state_warning);
         }

         &_alarm{
            background: var(--clr_state_alarm);
         }
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
         // visibility: hidden;

         &_hide{
            visibility: hidden;
         }
      }

   }

   .card:hover{
         background: var(--clr_bg);
   }


</style>