export interface Data {
     id: number;   
     name: string;
     supervisor: string;
     region: string;
     macrosector:string;
     description: string;
     metrics: metrics [];
     indexes: indexes [];
 }

 export interface metrics {
   year: number;
   operationalRevenue: number;
   lostProfit:number;
	 totalAssets:number;
	 totalLiabilities:number;
	 totalEquity:number;
 }

 export interface indexes {
  name: string;
  value: number;
}