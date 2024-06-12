import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graph-one',
  templateUrl: './graph-one.component.html',
  styleUrls: ['./graph-one.component.css']
})
export class GraphOneComponent implements OnInit {
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchChartData();
  }

  fetchChartData(): void {
    this.http.get<any[]>('http://192.168.88.38:8000/api/v1/fee/api/v1/fee/percentage_of_each_category').subscribe(data => {
      const categories = data.map(item => item.category);
      const percentages = data.map(item => parseFloat(item.percentage)); // Parse percentage values as floats

      // Dynamically update chart options
      const chartOptions = this.getChartOptions(categories, percentages);

      // Render the chart
      if (document.getElementById("pie-chart") && typeof ApexCharts !== 'undefined') {
        const chart = new ApexCharts(document.getElementById("pie-chart"), chartOptions);
        chart.render();
      }
    });
  }

  getChartOptions(categories: string[], percentages: number[]): any {
    return {
      series: percentages,
      chart: {
        height: 260,
        width: "100%",
        type: "pie",
      },
      labels: categories,
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
}
