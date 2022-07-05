<template>
   <div class="v-mechanism-card card" @click="openCard(mechanismData.ID)">
      <div class="card__led"  :class="state"></div>

      <div class="card__content">
         <p class="card__lable">{{mechanismData.UAName}}</p>
         <p 
            class="card__subline"  
            :style="{opacity: Errors ? 1 : 0 }"
         >Ошибок: {{Errors}}</p>
         <div class="card__info">Моточасы: 230</div>
      </div>

   </div>
</template>

<script>
export default {
   name: 'v-mechanism-card',
   props:{
      mechanismData:{
         type: Object,
      },
      Errors:{
         type: Number,
         default: 0
      }
   },
   data: ()=>({


   }),
   computed:{
      mechanismState(){
         let retClass = '';
         switch (this.mechanismData.state) {
				case 1: retClass = "card__led_ok"; break;
				case 2: retClass = "card__led_repair"; break;
				case 3: retClass = "card__led_waqrning"; break;
				case 4: retClass = "card__led_alarm"; break;
				default: retClass = "card__led_ok"; break;
			}
         return retClass;
      },
      state(){
         let retClass = '';
            if(this.Errors <= 2){
               retClass = "card__led_ok";
            } else if(this.Errors > 2 && this.Errors <= 7) {
               retClass = "card__led_waqrning";
            } else if(this.Errors > 7) {
               retClass = "card__led_alarm";
            }

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
      openCard(id){
         this.$emit('details', id);
      }
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
      transition: all 0.5s ease-out;

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
         font-size: 16px;
         line-height: 32px;
         margin: 7px;
         text-align: center;
         // word-spacing: 9999px;
      }

      &__subline{
         font-size: 14px;
         line-height: 16px;
         letter-spacing: 0.5px;
         margin: 7px;


         &_hide{
            visibility: hidden;
         }
      }

      &__info{
         font-size: 12px;
         line-height: 18px;
         letter-spacing: 0.5px;
         margin: 4px;
      }

   }

   .card:hover{
         background: var(--clr_gray3);
         cursor: pointer;
   }


</style>