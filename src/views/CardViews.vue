<template>
   <!-- <div>User {{ $route.params.type }}</div> -->
   <div class="card-wrapper">
         <v-card
            v-for="(card, i) in CARDS_BY_TYPE($route.params.type)"
            :key="i"
            :mechanismData="card"
            @details="seeMore"
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
       ...mapGetters('card',['CARDS_BY_TYPE'])
   },
   methods:{
      ...mapActions('card',['CARD_LOAD']),
      seeMore(id){
         this.$router.push({ name: 'details', params: { id: id } });
      }
   },
   mounted(){
      this.CARD_LOAD();
       
   }
   
}
</script>

<style lang="less">
   .card-wrapper{
   display: grid;
   grid-gap: 15px;
   grid-template-columns: repeat(auto-fit, minmax(196px, 1fr));
   padding: 20px;
   }
</style>