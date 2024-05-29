import { Component } from '@angular/core';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-graph-one',
  templateUrl: './graph-one.component.html',
  styleUrls: ['./graph-one.component.css']
})
export class GraphOneComponent {

  
  getChartOptions(): any { // Return type specified as 'any'
    return {
      series: [52.8, 26.8, 20.4],
      colors: ["#1C64F2", "#16BDCA", "#9061F9"],
      chart: {
        height: 260,
        width: "100%",
        type: "pie",
      },
      stroke: {
        colors: ["white"],
        lineCap: "",
      },
      plotOptions: {
        pie: {
          labels: {
            show: true,
          },
          size: "100%",
          dataLabels: {
            offset: -25
          }
        },
      },
      labels: ["Fee Collection", "Donations", "Government Allocations"],
      dataLabels: {
        enabled: true,
        style: {
          fontFamily: "Inter, sans-serif",
        },
      },
      legend: {
        position: "bottom",
        fontFamily: "Inter, sans-serif",
      },
      yaxis: {
        labels: {
          formatter: function (value: string) {
            return value + "%"
          },
        },
      },
      xaxis: {
        labels: {
          formatter: function (value: string) {
            return value + "%"
          },
        },
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
    };
  }

  ngOnInit(): void {
    if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
      const chart = new ApexCharts(document.getElementById("pie-chart"), this.getChartOptions());
      chart.render();
    }
  }
}