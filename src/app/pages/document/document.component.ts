import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { RequestFile } from 'src/app/models/RequestFile';
import { VisionServiceService } from 'src/app/services/vision-service.service';
import { RequestVision } from 'src/app/models/RequestVision';
import { timer } from 'rxjs';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  archivo: RequestFile;
  files: File[] = [];
  selectedFile = false;
  imgURL: any;
  showimg= false;
  imgURLFinal:any;
  visionR: RequestVision;
  object: Object ;
  ULR48:string;
  textoFinal :string = "";

  ejecucionInicial = true;


  public imagePath;

  constructor(private sanitizer : DomSanitizer,  private uploadFileService: UploadFileService, private visionService: VisionServiceService ) { 
  }



  ngOnInit(): void { }


  mostrarError( error: string){
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: error,
      showConfirmButton: false,
      showCloseButton: false
    });
  }

  onSelect(event) {
    var mimeType = event.addedFiles[0].type;
    if ( mimeType.match(/image\/*/) != null  && this.files.length === 0) {
      this.files.push(...event.addedFiles);
      this.selectedFile = true;
      var reader = new FileReader();
    this.imagePath = event.addedFiles;
    reader.readAsDataURL(event.addedFiles[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
      this.showimg = true;
      }
    }
    else{
      this.mostrarError( 'Sólo se puedes adjuntar un  archivo de tipo .jpg o .png');
      this.selectedFile = false;
    }
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.selectedFile = false;
    this.showimg=false;
  }
  
  cargarArchivo(){
    let fileName = this.files[0].name;
    let type= this.files[0].type;
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(this.files[0]);
    reader.onload = () => {
                  const fileB64 = btoa(reader.result.toString());
                  this.imgURL = reader.result;
                  
                  this.archivo = new RequestFile(
                    fileName,
                    fileB64,
                    type
                   );

                  this.uploadFileService.uploadFile(this.archivo)
                  .subscribe((resp: any) => {
                    if (resp.status === 200){
                        
                      this.ejecucionInicial = false;
                      this.showimg = false;
                      this.imgURLFinal = resp.body.fileUrl;
                    }

                    Swal.fire({
                      title: 'Subiendo Imágen...',
                      html: 'Por favor espere...',
                      allowEscapeKey: false,
                      allowOutsideClick: false,
                      didOpen: () => {
                        Swal.showLoading()
                      }
                    });
                   
                  }, (err: any) => {
                    this.mostrarError(err.error.message);
                   
                  },()=>{ // When First Request Complete Call Second Request.
                    Swal.close();
                     this.visionR = new RequestVision(this.imgURLFinal);
                     this.visionService.getUrlData(this.visionR)
                        .subscribe((resp:any)=>{
                          if(resp.status === 202){
                            this.ULR48 = resp.headers.get('Operation-Location');
                          }
                          Swal.fire({
                            title: 'Procesando Imágen...',
                            html: 'Por favor espere...',
                            allowEscapeKey: false,
                            allowOutsideClick: false,
                            didOpen: () => {
                              Swal.showLoading()
                            }
                          });

                        },(err:any)=>{
                          this.mostrarError(err.error.message);
                        },()=>{
                          
                          timer(5000).subscribe(x => {
                            Swal.close();
                            this.visionService.getData(this.ULR48)
                            .subscribe((resp:any)=>{
                              if(resp.status === 200){
                                  this.object = JSON.parse(JSON.stringify(resp.body));   
                                  this.object['analyzeResult']['readResults'].forEach(element => {
                                    element['lines'].forEach(line => {
                                       
                                       this.textoFinal += line['text'];
                                    });

                                    
                                  });
                              }
                            }); })
                        });
                    });           
    } 
    this.files = [];
    this.selectedFile = false;
 
  
  }

 
  
}
