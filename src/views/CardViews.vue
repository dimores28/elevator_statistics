<template>
   <div class="card-wrapper">
         <v-card
            v-for="(card, i) in CARDS_BY_TYPE($route.params.type)"
            :key="i"
            :mechanismData="card"
            @details="seeMore(card.UAIndex, card.ID)"
         >
         </v-card>
   </div>
</template>

<script>
import vCard from '@/components/UI/v-mechanism_card'
import { mapActions, mapGetters } from 'vuex';
export default {
   components:{
      vCard
   },
   data:()=>({
      cards: [],
   }),
   computed:{
       ...mapGetters('card',['CARDS_BY_TYPE', 'CARD_BY_ID']),
      chapter(){
         return this.$route.params.title;
      }
   },
   methods:{
      ...mapActions('card',['CARD_LOAD']),
      ...mapActions('navigationData',['SET_TITLE', 'SET_TEXT']),
      seeMore(index, id){
         
         this.SET_TEXT(this.chapter + ' > ' + this.CARD_BY_ID(id).UAName);
         this.SET_TITLE(this.$route.params.title)
         this.$router.push({ name: 'details', params: { id: index } });
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
   }
   
}
</script>

<style lang="less">
   .card-wrapper{
   display: grid;
   grid-gap: 15px;
   grid-template-columns: repeat(auto-fit, minmax(184px, 1fr));
   padding: 20px;
   }
</style>