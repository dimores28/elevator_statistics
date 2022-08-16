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
        categories:  [1659688457654, 1659602057654, 1659515657654, 1659429257654, 1659342857654, 1659256457654, 1659170057654, 1659083657654, 1658997257654, 1658910857654, 1658824457654, 1658738057654, 1658651657654, 1658565257654, 1658478857654],
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
