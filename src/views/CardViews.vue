<template>
   <div class="card-wrapper">
         <div class="row">
            <v-card
            v-for="card in CARDS_BY_TYPE($route.params.type)"
               :key="card.UAIndex"
               :mechanismData="card"
               :Errors="NUMBER_WARNINGS_BY_ID(card.UAIndex)" 
               @details="seeMore(card.UAIndex, card.ID)"
               class="col"
            >
         </v-card>
         </div>
   </div>
</template>

<script>
//"NUMBER_WARNINGS_BY_ID(card.UAIndex)"
import vCard from '@/components/UI/v-mechanism_card'
import { mapActions, mapGetters } from 'vuex';
export default {
   name: 'Card',
   components:{
      vCard
   },
   data:()=>({
      cards: [],
   }),
   computed:{
       ...mapGetters('card',
       [
         'CARDS_BY_TYPE', 
         'CARD_BY_ID', 
         'NUMBER_WARNINGS_BY_ID'
       ]),
       ...mapGetters('navigationData',['TIME_RANGE']),
      chapter(){
         return this.$route.params.title;
      }
   },
   methods:{
      ...mapActions('card',['CARD_LOAD', 'LOAD_NUMBER_WARNINGS']),
      ...mapActions('navigationData',['SET_TITLE', 'SET_TEXT']),
      seeMore(index, id){
         
         this.SET_TEXT(this.chapter + ' > ' + this.CARD_BY_ID(id).UAName);
         this.SET_TITLE(this.$route.params.title)
         this.$router.push({ name: 'details', params: { id: index, name: this.CARD_BY_ID(id).UAName} });
      }
   },
   watch:{
      chapter(){
         if(this.chapter){
            this.SET_TITLE(this.chapter);
         }
      }
   },
   mounted(){
      this.SET_TITLE(this.$route.params.title)
      this.SET_TEXT('');
      this.CARD_LOAD();
      this.LOAD_NUMBER_WARNINGS(this.TIME_RANGE);

      let context = this;
      this.emitter.on('select-datapicker', function(timerange){
          context.LOAD_NUMBER_WARNINGS(timerange);
      });
   }
   
}
</script>

<style lang="less">
   .card-wrapper{
      max-width: 900px;
      margin: 0 auto;
      padding: 10px;
   }

   .row{
      display: flex;
      flex-wrap: wrap;
      margin: 0 -10px;
   }

   .col{
      width: calc(100% / 4 - 20px);
      margin: 10px;
   }

   @media screen and (max-width: 920px){
      .col{
       width: calc(100% / 3 - 20px);
      }
   }

   @media screen and (max-width: 540px){
      .col{
       width: calc(100% / 2 - 20px);
      }
   }

   @media screen and (max-width: 360px){
      .col{
       width: calc(100% / 1 - 20px);
      }

      .card-wrapper{
         padding: 10px 25px;
      }
   }


   
</style>