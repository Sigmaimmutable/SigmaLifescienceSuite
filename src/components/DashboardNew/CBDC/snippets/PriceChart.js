import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class AreaChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series1: [
              {
                  name: "",
                  data: [146, 184, 178, 192, 166]
              }
            ],
            options1: {
                chart: {
                    height: 150,
                    type: 'line',
                    toolbar: {
                    show: false
                    },
                    stroke: {
                        curve: 'straight'
                    },
                    zoom: {
                        enabled: false
                    }
                },
                colors: ['#69f5e1'],
                dataLabels: {
                    enabled: false,
                },
                stroke: {
                    curve: 'smooth',
                    width: 1,
                },
                tooltip: {
                    theme: 'dark',
                    shared: true
                },
                title: {
                    text: '',
                    align: 'left'
                },
                grid: {
                    borderColor: 'rgba(255,255,255,0.2)',
                    row: {
                    colors: ['transparent', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 1
                    },
                    xaxis: {
                      lines: {
                          show: false
                      }
                    },   
                    yaxis: {
                        lines: {
                            show: false
                        }   
                    },  
                },
                markers: {
                    size: 0
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
                    categories: ['15', '13', '18', '10', '60'],
                    title: false,
                    labels: {
                        show: false,
                        style:{
                            colors: '#AAAAAA'
                        }
                    }
                },
                yaxis: {
                    title: false,
                    labels: {
                        show: false,
                        formatter: function (value) {
                            return value.toLocaleString() + ".00"
                        },
                        style:{
                            colors: '#AAAAAA'
                        }
                    }
                },
                legend: {
                    show: false
                }
            }            
        };
    }
    
    render() {
        return (
            (typeof window !== 'undefined') &&
                <Chart
                    options={this.state.options1}
                    series={this.state.series1}
                    type="line"
                    height={150}
                />
        );
    }
}

export default AreaChart