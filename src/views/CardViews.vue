<template>
   <div>User {{ $route.params.type }}</div>
   <div class="card-wrapper">
         <v-card></v-card>
         <v-card></v-card>
         <v-card></v-card>
         <v-card></v-card>
         <v-card></v-card>
         <v-card></v-card>
         <v-card></v-card>
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
      getMechanismsByType(){
         
      }
   },
   mounted(){
      this.CARD_LOAD()
      .then(()=>{
         this.CARDS_BY_TYPE(this.$route.params.type);
      })
     
   }
   
}
</script>

<style lang="less">
   .card-wrapper{
   display: grid;
   grid-gap: 15px;
   grid-template-columns: repeat(auto-fit, minmax(154px, 1fr));
   padding: 20px;
   }
</style>