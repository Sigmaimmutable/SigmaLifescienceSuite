import React from 'react';

import ReactApexChart from "react-apexcharts";

class BarChart extends React.Component {
constructor(props) {
    super(props);

    this.state = {
    
    series: [{
        name: 'Vote',
        data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 76, 85, 101, 98, 87, 105, 91, 114, 94, 76, 85, 101, 98, 87, 105, 91, 114, 94, 76, 85, 101, 98, 87, 105, 91, 114, 94, 76, 85, 101, 98, 87, 105, 91, 114, 94, 76, 85, 101, 98, 87, 105, 91, 114, 94, 76, 85, 101, 98, 87, 105, 91, 114, 94, 76, 85, 101, 98, 87, 105, 91, 114, 94]
    },{
        name: 'Non Vote',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 44, 55, 57, 56, 61, 58, 63, 60, 66, 44, 55, 57, 56, 61, 58, 63, 60, 66, 44, 55, 57, 56, 61, 58, 63, 60, 66, 44, 55, 57, 56, 61, 58, 63, 60, 66, 44, 55, 57, 56, 61, 58, 63, 60, 66, 44, 55, 57, 56, 61, 58, 63, 60, 66, 44, 55, 57, 56, 61, 58, 63, 60, 66]
    }],
    options: {
        colors: ['#69f5e1','#008bff'],
        chart: {
        type: 'bar',
        height: 150,
        stacked: true,
        toolbar: {
            show: true,
            tools: {
                download: false
            }
        }
        },
        plotOptions: {
        bar: {
            show: false
        },
        },
        dataLabels: {
        enabled: false
        },
        legend:{
            labels: {
                colors: '#fff'
            }
        },
        stroke: {
        show: false,
        width: 2,
        colors: ['transparent']
        },
        grid: {
            show: false,      // you can either change hear to disable all grids   
          },
        xaxis: {
            show: false,
            labels: {
                show: false
              },
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
        categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
        },
        yaxis: {
            show: false,
        title: false
        },
        fill: {
        opacity: 1
        }
    },
    
    
    };
}



render() {
    return (
        (typeof window !== 'undefined') && <ReactApexChart options={this.state.options} series={this.state.series} type="bar" height={150} />
    );
}
}

export default BarChart;