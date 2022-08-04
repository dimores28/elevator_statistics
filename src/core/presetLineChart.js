export default {
    chart: {
        height: 260,
        type: 'line',
      },
      stroke: {
        width: 5,
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories:  [],
        tickAmount: 10,
        labels: {
          formatter: function(value, timestamp, opts) {
            return opts.dateFormatter(new Date(timestamp), 'dd MMM')
          }
        }
      },
      theme: {
        mode: 'dark', 
        palette: 'palette1', 
        monochrome: {
            enabled: false,
        }
    },
    fill: {
        type: 'gradient',
        gradient: {
            shade: 'dark',
            gradientToColors: [ '#f00'],
            type: 'horizontal',
            stops: [0, 0, 0, 0]
        },
    }
}
