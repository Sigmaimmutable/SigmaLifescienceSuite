import React, { Component } from 'react';
import Chart from 'react-apexcharts';

// const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

class Area extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [
              {
                  name: "Runway Available",
                  data: [176, 280, 160, 300]
              },
              {
                  name: "Runway Available",
                  data: [180, 200, 500, 240]
              },
              {
                  name: "Runway Available",
                  data: [200, 180, 120, 150]
              }
            ],
            options: {
                chart: {
                    height: 350,
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
                colors: ['#FFC691', '#91EBFF', '#B6B2FF'],
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
                    categories: ['Oct 09', 'Nov 09', 'Dec 10', 'Jan 10'],
                    title: true,
                    labels: {
                        style:{
                            colors: '#fff'
                        }
                    }
                },
                yaxis: {
                    title: false,
                    labels: {
                        formatter: function (value) {
                            return '$' + value.toLocaleString() + "M"
                        },
                        style:{
                            colors: '#fff'
                        }
                    }
                },
                legend: {
                    show: false
                }
            }        
        };
    }

    // componentDidUpdate(nextProps){
    //     if(nextProps.xaxis !== this.props.xaxis){
    //         setTimeout(() => {
    //             this.setState({
    //                 series: [
    //                     {
    //                         data: this.props.series
    //                     }
    //                 ],
    //                 options: {
    //                     xaxis:{
    //                         categories: this.props.xaxis
    //                     }
    //                 }
    //             })
    //         }, 100);
    //     }
    // }
    
    render() {
        return (
            (typeof window !== 'undefined') &&
                <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    height={350}
                />
        );
    }
}

export default Area