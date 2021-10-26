import { Injectable } from '@angular/core';
import { Data } from '../interfaces/data.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private data: Data[] =
  [
    {
      id: 12345,
      name: 'ECOPETROL',
      supervisor: 'SUPERFINANCIERA',
      region:'CENTRO - ORIENTE',
      macrosector:'MINERO',
      description:'Compañia con 17 años en el Mcdo, con ventas de mas de 500 mil millons y una disminucion de sus ingresos del 11%. Muestra para el 2020 una utilidad neta del 1,2%, muy similar a la del 2019. presenta una rotacion de cartera de 21 dias, superior a los dias de pago de sus proveedores. Dandole un ciclo de caja de 26 dias. presenta un capital de trabajo de 25 mil millones de pesos, muy ajustado para cubrir sus obligaciones de corto plazo',
      metrics:[
        {	
          year: 2016,
          operationalRevenue:38348460178,
          lostProfit:1564709318.5,
          totalAssets:101537543738.4,
          totalLiabilities:57863689871.1,
          totalEquity:43673853867.3
        },
        {	
          year: 2015,
          operationalRevenue:43290600000,
          lostProfit:-3987726000,
          totalAssets:100227213000,
          totalLiabilities:56870500000,
          totalEquity:43356713000
        }
      ],
      indexes:[
        {
          name:'Inventario',
          value: 25769
        },
        {
          name:'Activo Corriente',
          value: 78828
        },
        {
          name:'Clientes',
          value: 32733
        },
        {
          name:'Activos Fijos',
          value: 31153
        },
        {
          name:'Activo Total',
          value: 109982
        },
        {
          name:'Proveedores',
          value: 20074
        },
        {
          name:'Pasivo Corriente',
          value: 52955
        },
        {
          name:'Pasivo Total',
          value: 60908
        },
        {
          name:'Ventas Netas',
          value: 541141
        },
        {
          name:'Costo de Venta',
          value: 511552
        },
        {
          name:'Utilidad Bruta',
          value: 29589
        },
        {
          name:'Utilidad Neta',
          value: 6594
        },
        {
          name:'Capital',
          value: 8403
        }
      ]
    }

  ];
  constructor() { }

  getData():Data[]{
    return this.data;
}

getClientByNIT( NIT: Number){
  return this.data.find(item => item.id === NIT);
}

}
