<template>
   <div class="table-wrapper">
         <div class="card">
            <DataTable 
               :value="GET_ALL_LOGS" 
               responsiveLayout="stack" 
               breakpoint="960px" 
               v-model:selection="selected" 
               selectionMode="single"
               dataKey="id"
            >
                <Column field="Source" header="Начало маршрута" :sortable="true"></Column>
                <Column field="Recive" header="Конец маршрута" :sortable="true"></Column>
                <Column field="RouteCulture" header="Культура" :sortable="true"></Column>
                <Column field="LastAccess" header="Время запуска" :sortable="true"></Column>
                <Column field="LastAccess" header="Время останова" :sortable="true"></Column>
            </DataTable>
        </div>
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
      ...mapActions('routList',['LOAD_ROUT_LOGS'])
    },
    mounted(){
      this.LOAD_ROUT_LOGS();
    }
}
</script>

<style lang="less">

</style>