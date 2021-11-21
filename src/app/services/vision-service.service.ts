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

  getToken(){
    return this.http.post(environment.url_get_token, {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Ocp-Apim-Subscription-Key':  environment.Ocp_Apim_Audio,
        //'Host':'eastus2.api.cognitive.microsoft.com',
        'Content-Length':'0'
      } ),
      observe: 'response'
    })
      .pipe( map( (resp: any) => resp));
  }

 getAudioFile(token:string, texto:string){
  let body = '<speak version=\'1.0\' xml:lang=\'en-ES\'><voice xml:lang=\'es-ES\' xml:gender=\'Male\' name=\'es-ES-AlvaroNeural\'>' +  texto +'</voice></speak>'; 
    return this.http.post(environment.url_get_audio, body, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token ,
        'Content-Type':  'application/ssml+xml',
        'X-Microsoft-OutputFormat':'audio-16khz-32kbitrate-mono-mp3',
        'Ocp-Apim-Subscription-Key':  environment.Ocp_Apim_Audio
      } ),
      observe: 'response'
    })
      .pipe( map( (resp: any) => resp));
 }

  getAudio(){
    return 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
  }
}
