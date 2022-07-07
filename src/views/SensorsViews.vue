<template>
   <div class="sensors-logs">
      <DataTable
         :value="MESSAGES"
         responsiveLayout="stack" 
         breakpoint="960px"
         v-model:selection="selected" 
         selectionMode="single"
          @click="more"
      >
         <Column field="Text1" header="Датчик" :sortable="true"></Column>
         <Column field="PText5" header="Механизм" :sortable="true"></Column>
         <Column field="Quantity" header="Количество аварий" :sortable="true"></Column>
         <Column field="dynamics" header="Динамика" :sortable="true"></Column>
      </DataTable>
   </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
   props:{

   },
   data(){
      return{
         selected: null,
      }
   },
   computed:{
      ...mapGetters('sensors', ['MESSAGES']),
      ...mapGetters('navigationData', ['TIME_RANGE']),
   },
   methods:{
      ...mapActions('navigationData',['SET_TITLE', 'SET_TEXT']),
      ...mapActions('sensors',['LOAD_ALL']),
      more(){
          if(this.selected){
            this.SET_TEXT('Датчики > ' + this.selected.PText5 + ' > ' + this.selected.Text1);
            this.$router.push({ name: 'more-sensor', params: { id: this.selected.PValue3 } });
          }
      }
   },
   mounted(){
      this.SET_TITLE('Датчики');
      this.SET_TEXT('');
      this.LOAD_ALL(this.TIME_RANGE);
   }
}
</script>

<style lang="less">
   .p-column-header-content{
      font-weight: 500;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 1.25px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.56);
   }

.p-selectable-row td{
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 24px;
   letter-spacing: 0.5px;
   color: #FFFFFF;
   border-bottom: 1px solid white !important;
}
</style>