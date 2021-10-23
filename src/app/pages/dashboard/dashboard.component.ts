import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

 
  public doughnutChartType: ChartType = 'doughnut';

  constructor() {

 
   }
 
   ngOnInit(): void {  }
 
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
 

}
