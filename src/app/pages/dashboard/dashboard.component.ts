import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";
import { DataService } from 'src/app/services/data-service.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent {


  client: Data| undefined;

  @ViewChild("chart")
  chart!: ChartComponent | any;
  public chartOptions!: Partial<ChartOptions> | any;
  public reportReady : boolean =false;
  public Noresults : boolean = false;

  constructor(private _dataServices: DataService) {

    this.client = _dataServices.getData()[0];
    console.log(this.client);

    
    this.chartOptions = {
      series: [
        {
          name: "Ingresos Operacionales",
          data: [38348460178,43290600000]
        },
        {
          name: "Ganancia Perdida",
          data: [1564709318.5,3987726000]
        },
        {
          name: "Total Bienes",
          data: [101537543738.4,100227213000]
        },
        { 
          name: "Total Pasivo",
          data: [57863689871.1,56870500000]
        },
        { 
          name: "Total Patrimonio",
          data: [57863689871.1,56870500000]

        }

      ],
      chart: {
        height: 350,
        type: "bar"
      },
      xaxis: {
        categories: [2015,2016]
      }
    };
  }
  
 

}
