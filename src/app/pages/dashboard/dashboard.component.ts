import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import Swal from 'sweetalert2';
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
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {


  client: Data| undefined;
  forma!: FormGroup;
  ready: boolean = false;
  showInstruction: boolean = true;
  showButton: boolean = false;
  @ViewChild("chart")
  chart!: ChartComponent | any;
  public chartOptions!: Partial<ChartOptions> | any;
  public reportReady : boolean =false;
  public Noresults : boolean = false;

  constructor(private formBuilder: FormBuilder,private _dataServices: DataService) {
    this.createForm();
    }


    createForm(){
      this.forma = this.formBuilder.group({
        numeroDocumento: [, [Validators.required, Validators.pattern('[0-9]{5,10}'), Validators.min(4)] ]
      });
   }
    
   get NumeroDocumentoNoValido(){
    return this.forma.get('numeroDocumento').invalid && this.forma.get('numeroDocumento').touched;
   }
  
   reload(){
    window.location.reload();
   }
   guardar(){
    this.forma.controls.numeroDocumento.disable();
    this.showInstruction = false;
    this.showButton = true;
    if (this.forma.invalid) {
      Swal.fire({
        title: 'Error!',
        text: 'El formulario no es válido.',
        icon: 'error',
        showConfirmButton: true
      }
      );
      window.location.reload();
    }else{
      this.client =  this._dataServices.getClientByNIT(this.forma.value.numeroDocumento);
      console.log(this.client);
      if(this.client) {
        this.Noresults= false;
        this.ready = true;
        
      
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
      else{
        this.Noresults= true;
        Swal.fire({
          title: 'No hay Datos!',
          text: 'No se encontraron datos para el número de documento: '+ this.forma.value.numeroDocumento+'. Por favor revise el número ingresado.' ,
          icon: 'error',
          showConfirmButton: true
        });
      }
    }
  
   
   }

}
