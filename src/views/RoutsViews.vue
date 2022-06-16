<template>
   <div class="table-wrapper">
            <DataTable
               :value="GET_ALL_LOGS" 
               responsiveLayout="stack" 
               breakpoint="960px" 
               v-model:selection="selected" 
               selectionMode="single"
               dataKey="id"
               @click="more"
              
            >
                <Column field="Source" header="Начало маршрута" :sortable="true"></Column>
                <Column field="Recive" header="Конец маршрута" :sortable="true"></Column>
                <Column field="RouteCulture" header="Культура" :sortable="true"></Column>
                <Column field="LastAccess" header="Время запуска" :sortable="true"></Column>
                <Column field="LastAccess" header="Время останова" :sortable="true"></Column>
            </DataTable>
   </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
     data() {
        return {
           selected: null,
        }
    },
    computed:{
      ...mapGetters('routList',['GET_ALL_LOGS']),

    },
    methods:{
      ...mapActions('routList',['LOAD_ROUT_LOGS']),
      ...mapActions('navigationData',['SET_TITLE', 'SET_TEXT']),
      more(){
         if(this.selected){
            this.SET_TEXT('Маршруты  > ' + this.selected.Source)
            this.$router.push({ name: 'rout', params: { id: this.selected.id } });
         }
      }
    },
    mounted(){
      this.SET_TITLE('Маршруты');
      this.SET_TEXT('');
      this.LOAD_ROUT_LOGS();
    }
}
</script>

<style lang="less">
.p-selectable-row td{
   font-style: normal;
   font-weight: 400;
   font-size: 16px;
   line-height: 24px;
   letter-spacing: 0.5px;
   color: #FFFFFF;
   border-bottom: 1px solid white !important;
}

.p-column-header-content{
   font-weight: 500;
   font-size: 14px;
   line-height: 16px;
   letter-spacing: 1.25px;
   text-transform: uppercase;
   color: rgba(255, 255, 255, 0.56);
}
</style>