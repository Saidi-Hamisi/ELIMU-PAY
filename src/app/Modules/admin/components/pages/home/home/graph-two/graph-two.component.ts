import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-graph-two',
  templateUrl: './graph-two.component.html',
  styleUrls: ['./graph-two.component.css']
})
export class GraphTwoComponent implements OnInit {

  totalIncome: number = 0;
  totalExpense: number = 0;
  chart: ApexCharts | undefined;

  constructor(private http: HttpClient) { }

  options: any = {
    series: [
      {
        name: "Income",
        color: "#31C48D",
        data: []
      },
      {
        name: "Expense",
        color: "#F05252",
        data: []
      }
    ],
    chart: {
      sparkline: {
        enabled: false
      },
      type: "bar",
      width: "100%",
      height: 230,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: "100%",
        borderRadius: 6,
        dataLabels: {
          position: "top"
        }
      }
    },
    legend: {
      show: true,
      position: "bottom"
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (val: number) => "Ksh" + val
      }
    },
    xaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        },
        formatter: (value: any) => "" + value
      },
      categories: [],
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          fontFamily: "Inter, sans-serif",
          cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
        }
      }
    },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: -20
      }
    },
    fill: {
      opacity: 1
    }
  };

  ngOnInit(): void {
    this.fetchChartData();
    this.generateLastSixMonths();
  }

  fetchChartData(): void {
    // Fetching income data
    this.http.get<any>('http://192.168.89.139:8000/api/v1/payfee/calculate_total_fee/').subscribe(incomeData => {
      // Dynamically set income data or set to 0 if not available
      this.options.series[0].data = incomeData['Fee Collection'] ? Array.isArray(incomeData['Fee Collection']) ? incomeData['Fee Collection'] : [incomeData['Fee Collection']] : [0, 0, 0, 0, 0, 0];
  
      // Fetching expense data
      this.http.get<any>('http://192.168.89.139:8000/api/v1/suppliers/suppliers/calculate_total_amount/').subscribe(expenseData => {
        // Dynamically set expense data or set to 0 if not available
        this.options.series[1].data = expenseData['supplier Collection'] ? Array.isArray(expenseData['supplier Collection']) ? expenseData['supplier Collection'] : [expenseData['supplier Collection']] : [0, 0, 0, 0, 0, 0];
  
        // Render the chart after fetching both income and expense data
        this.renderChart();
      });
    });
  }
  
  

  generateLastSixMonths(): void {
    const months: string[] = [];
    const currentDate = new Date();
    for (let i = 0; i < 6; i++) {
      const month = currentDate.toLocaleString('default', { month: 'short' });
      months.push(month);
      currentDate.setMonth(currentDate.getMonth() - 1);
    }
    this.options.xaxis.categories = months.reverse();
  }

  renderChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }
    this.chart = new ApexCharts(document.getElementById("bar-chart"), this.options);
    this.chart.render();
  }
}
