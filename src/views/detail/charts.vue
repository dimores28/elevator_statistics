<template>
    <div class="graph-wrap">
      <div id="timline">
        <apexchart v-if="showTimeline" type="rangeBar" height="350" :options="chartOptions" :series="series"></apexchart>
      </div>
    </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts"
import timlinePreset from '@/core/presetTimeLine'

export default {
    components: {
        apexchart: VueApexCharts,
    },
    data(){
        return {
            series: [
            // John Adams
            {
              name: 'Thomas Jefferson',
              data: [
                {
                  x: 'w',
                  y: [ 0, 2]
                },
                {
                  x: 'w',
                  y: [ 5, 9]
                }
              ]
            },
            // George Washington
            {
              name: 'w',
              data: [
                {
                  x: 'w',
                  y: [ 2, 3]
                },
              ]
            },
            // Thomas Jefferson
            {
              name: 'Thomas Jefferson',
              data: [
                {
                  x: 'w',
                  y: [ 3, 5]
                },
                {
                  x: 'w',
                  y: [ 9, 10]
                },
                {
                  x: 'w',
                  y: [ 12, 17]
                }
              ]
            },

            ],        
            chartOptions: timlinePreset,
            showTimeline: false,
            
        }
    },
    mounted(){
        this.showTimeline = true;
    }
}
</script>

<style lang="less">

</style>