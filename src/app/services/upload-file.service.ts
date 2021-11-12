
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse , HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RequestFile } from '../models/File';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  constructor(private http: HttpClient) { }

  
  uploadFile( archivo: RequestFile) : Observable<HttpResponse<any[]>> {
    return this.http.post(environment.url_base.concat('UploadFile'), archivo , {
      headers: new HttpHeaders({responseType: 'application/json'} ),
      observe: 'response'
    })
      .pipe( map( (resp: any) => resp));
  }
}
