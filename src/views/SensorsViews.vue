<template>
   <div class="sensors-logs">
      <DataTable
         :value="sensors"
         responsiveLayout="stack" 
         breakpoint="960px"
         v-model:selection="selected" 
         selectionMode="single"
          @click="more"
      >
         <Column field="name" header="Датчик" :sortable="true"></Column>
         <Column field="device" header="Механизм" :sortable="true"></Column>
         <Column field="numberAlarm" header="Количество аварий" :sortable="true"></Column>
         <Column field="dynamics" header="Динамика" :sortable="true"></Column>
      </DataTable>
   </div>
</template>

<script>
export default {
   props:{

   },
   data(){
      return{
         sensors:[
            {"id": 1, "name": "Подпор нижний", "device": "Нория Н1", "numberAlarm": 5, "dynamics": "down"},
            {"id": 2,"name": "Подпор нижний", "device": "Нория Н2", "numberAlarm": 3, "dynamics": "down"},
            {"id": 3,"name": "Подпор верхний", "device": "Нория Н6", "numberAlarm": 4, "dynamics": "down"},
            {"id": 4,"name": "Контроль скорости", "device": "Нория Н3", "numberAlarm": 2, "dynamics": "up"}
         ],
         selected: null,
      }
   },
   computed:{

   },
   methods:{
      more(){
          if(this.selected){
            this.$router.push({ name: 'more-sensor', params: { id: this.selected.id } });
          }
      }
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