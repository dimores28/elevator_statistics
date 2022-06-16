export default {

        chart: {
          height: 260,
          type: 'rangeBar'
        },
        plotOptions: {
          bar: {
            horizontal: true,
            barHeight: '50%',
            rangeBarGroupRows: true
          }
        },
        colors: [
          "#179433", "#FF0000", "#2D4EC4",
        ],
        fill: {
          type: 'solid',
          opacity: 0.5,
        },
        xaxis: {
          type: 'datetime'
        },
        legend: {
          show: false,
          position: 'right'
        },
        dataLabels: {
         enabled: false,
        },
        grid: {
         show: false,
        },
        theme: {
         mode: 'dark', 
         palette: 'palette1', 
         monochrome: {
             enabled: false,
            },
         },
         yaxis: {
            show: false,
            showAlways: false,
            labels: {
               show: false,
            },
            axisBorder: {
               show: false,
               color: '#78909C',
               offsetX: 0,
               offsetY: 0
           },
         }
      //   tooltip: {
      //     custom: function(opts) {
      //       const fromYear = new Date(opts.y1).getFullYear()
      //       const toYear = new Date(opts.y2).getFullYear()
      //       const values = opts.ctx.rangeBar.getTooltipValues(opts)
        
      //       return (
      //         ''
      //       )
      //     }
      //   }
}



