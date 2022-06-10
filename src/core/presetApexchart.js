export default {
   
      colors: ['#2D4EC4', '#179433', '#000000'],
      chart: {
         width: 300,
         type: 'pie',
         animations: {
            enabled: false
         },
      },
      stroke: {
         show: false,      
      },
      plotOptions: {
         pie: {
            expandOnClick: false,
            customScale: 1.05
         }
      },
      tooltip: {
         enabled: false,
      },
      dataLabels: {
         enabled: false
      },
      states: {
      normal: {
            filter: {
               type: 'none',
               value: 0,
            }
         },
         hover: {
            filter: {
               type: 'non',
               value: 0.15,
            }
         }
      },
      active: {
         allowMultipleDataPointsSelection: false,
         filter: {
            type: 'non',
            value: 0.35,
         }
      },
      responsive: [
       {
         breakpoint: 860,
            options: {
               chart: {
                  width: 200
               }
            }
       },
      ],
      legend:{
         show: false,
         position: 'right',
      },

}