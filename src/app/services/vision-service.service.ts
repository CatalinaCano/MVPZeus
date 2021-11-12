import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { RequestVision } from '../models/RequestVision';

@Injectable({
  providedIn: 'root'
})
export class VisionServiceService {

  constructor(private http: HttpClient) { }

  getUrlData( peticion: RequestVision) : Observable<HttpResponse<any[]>> {
    return this.http.post(environment.url_vision, peticion , {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Ocp-Apim-Subscription-Key':  environment.Ocp_Apim
      } ),
      observe: 'response'
    })
      .pipe( map( (resp: any) => resp));
  }

  getData(url:string){
    console.log(url);
    return this.http.get<any[]>(url,
                          {
                            headers: new HttpHeaders({
                              'Content-Type':  'application/json',
                              'Ocp-Apim-Subscription-Key':  environment.Ocp_Apim 
                            } ),
                            observe: 'response'
                          })
    .pipe (map((resp: any) => resp));
  }
}
