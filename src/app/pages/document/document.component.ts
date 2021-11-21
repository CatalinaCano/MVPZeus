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
  templateUrl: './document.component.html'
})
export class DocumentComponent implements OnInit {

  archivo: RequestFile;
  files: File[] = [];
  selectedFile = false;
  imgURL: any;
  showimg = false;
  imgURLFinal: any;
  visionR: RequestVision;
  object: Object;
  ULR48: string;
  textoFinal: string = "";
  mostrarBoton = false;
  mostrarAudio = false;
  ejecucionInicial = true;
  token: string;

  fileSource: any;
  public imagePath;

  constructor(private sanitizer: DomSanitizer, private uploadFileService: UploadFileService, private visionService: VisionServiceService) {
  }



  ngOnInit(): void { }


  mostrarError(error: string) {
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
    if (mimeType.match(/image\/*/) != null && this.files.length === 0) {
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
    else {
      this.mostrarError('Sólo se puedes adjuntar un  archivo de tipo .jpg o .png');
      this.selectedFile = false;
    }
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.selectedFile = false;
    this.showimg = false;
  }

  cargarArchivo() {
    let fileName = this.files[0].name;
    let type = this.files[0].type;
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

      Swal.fire({
        title: 'Subiendo Imágen...',
        html: 'Por favor espere...',
        allowEscapeKey: false,
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading()
        }
      });

      this.uploadFileService.uploadFile(this.archivo)
        .subscribe((resp: any) => {
          if (resp.status === 200) {
            this.ejecucionInicial = false;
            this.showimg = false;
            this.imgURLFinal = resp.body.fileUrl;
            Swal.close();
            this.showLoading();
            this.visionR = new RequestVision(this.imgURLFinal);
            this.visionService.getUrlData(this.visionR)
              .subscribe((resp: any) => {
                if (resp.status === 202) {
                  this.ULR48 = resp.headers.get('Operation-Location');
                }
                timer(5000).subscribe(x => {
                  this.visionService.getData(this.ULR48)
                    .subscribe((resp: any) => {
                      if (resp.status === 200) {
                        this.object = JSON.parse(JSON.stringify(resp.body));
                        this.object['analyzeResult']['readResults'].forEach(element => {
                          element['lines'].forEach(line => {
                            this.textoFinal += line['text'] + ' ';
                          });
                        });

                        this.fileSource = this.visionService.getAudio();
                        this.mostrarBoton = true;
                        this.mostrarAudio = true;
                        Swal.close();

                        /*this.token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJlYXN0dXMyIiwic3Vic2NyaXB0aW9uLWlkIjoiODQwODJlNGJkZjZmNDkyOGE5OGY4ZDg3ZTQzNzhlYjgiLCJwcm9kdWN0LWlkIjoiU3BlZWNoU2VydmljZXMuRjAiLCJjb2duaXRpdmUtc2VydmljZXMtZW5kcG9pbnQiOiJodHRwczovL2FwaS5jb2duaXRpdmUubWljcm9zb2Z0LmNvbS9pbnRlcm5hbC92MS4wLyIsImF6dXJlLXJlc291cmNlLWlkIjoiL3N1YnNjcmlwdGlvbnMvNzBkYzk0ZmEtMDc0My00ZGNhLWE4NWMtY2IwOTc1M2EwM2Q4L3Jlc291cmNlR3JvdXBzL1pldXMvcHJvdmlkZXJzL01pY3Jvc29mdC5Db2duaXRpdmVTZXJ2aWNlcy9hY2NvdW50cy9zcGVlY2hkZW1vemV1cyIsInNjb3BlIjoic3BlZWNoc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoc2VydmljZXMuZWFzdHVzMiIsImV4cCI6MTYzNzQ2NTAyMywiaXNzIjoidXJuOm1zLmNvZ25pdGl2ZXNlcnZpY2VzIn0.6Yot-Z0yhwquDf3OexrfnOc_ka8IhlxRn0oHI3Sv7-Q';
                         this.visionService.getAudioFile(this.token, this.textoFinal )
                           .subscribe((resp: any)=>{
                               console.log(resp);
                           },(err:any)=>{
                             this.mostrarError(err.error.error.message);
                           });*/
                      

                        /*this.visionService.getToken()
                          .subscribe((resp: any) => {
                            console.log(resp);
                            if (resp.status === 200) {
                              console.log(resp);
                              this.fileSource = this.visionService.getAudio();
                              this.mostrarBoton = true;
                              this.mostrarAudio = true;
                            }

                          }, (err: any) => {
                            //this.mostrarError(err.error.error.message);
                          }, () => {
                            console.log('llega aqui');
                            this.token = 'eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTI1NiIsInR5cCI6IkpXVCJ9.eyJyZWdpb24iOiJlYXN0dXMyIiwic3Vic2NyaXB0aW9uLWlkIjoiODQwODJlNGJkZjZmNDkyOGE5OGY4ZDg3ZTQzNzhlYjgiLCJwcm9kdWN0LWlkIjoiU3BlZWNoU2VydmljZXMuRjAiLCJjb2duaXRpdmUtc2VydmljZXMtZW5kcG9pbnQiOiJodHRwczovL2FwaS5jb2duaXRpdmUubWljcm9zb2Z0LmNvbS9pbnRlcm5hbC92MS4wLyIsImF6dXJlLXJlc291cmNlLWlkIjoiL3N1YnNjcmlwdGlvbnMvNzBkYzk0ZmEtMDc0My00ZGNhLWE4NWMtY2IwOTc1M2EwM2Q4L3Jlc291cmNlR3JvdXBzL1pldXMvcHJvdmlkZXJzL01pY3Jvc29mdC5Db2duaXRpdmVTZXJ2aWNlcy9hY2NvdW50cy9zcGVlY2hkZW1vemV1cyIsInNjb3BlIjoic3BlZWNoc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoc2VydmljZXMuZWFzdHVzMiIsImV4cCI6MTYzNzQ2MjI1NSwiaXNzIjoidXJuOm1zLmNvZ25pdGl2ZXNlcnZpY2VzIn0.A_tKYL-cLG0ivgXl0f_DbhL4oe16mJZSOm8F0LrEydE';
                            /* this.visionService.getAudioFile(this.token, this.textoFinal )
                               .subscribe((resp: any)=>{
                                   console.log(resp);
                               },(err:any)=>{
                                 this.mostrarError(err.error.error.message);
                               });
                          });*/
                      }
                    }, (err: any) => {
                      this.mostrarError(err.error.error.message);
                    }, () => {
                    }
                    );
                })
              }, (err: any) => {
                this.mostrarError(err.error.error.message);
              }, () => {
              });
          }
        }, (err: any) => {
          this.mostrarError(err.error.error.message);
        }, () => { // When First Request Complete Call Second Request.
        });
    }
    this.files = [];
    this.selectedFile = false;
  }

  reload() {
    window.location.reload();
  }

  showLoading() {
    Swal.fire({
      title: 'Procesando Imágen...',
      html: 'Por favor espere...',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      }
    });
  }



}
