import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';
import { UploadFileService } from 'src/app/services/upload-file.service';
import { RequestFile } from 'src/app/models/File';

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


  ejecucionInicial = true;


  public imagePath;

  constructor(private sanitizer : DomSanitizer,  private uploadFileService: UploadFileService, ) { 
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
    console.log(mimeType);
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
    console.log("Llego a cargar");
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

                   console.log(this.archivo);
                  this.uploadFileService.uploadFile(this.archivo)
                  .subscribe((resp: any) => {
                    if (resp.status === 200){
                      console.log(resp);
                      Swal.fire({
                        title: 'Archivo Almacenado !',
                        text: 'El archivo ha sido almacenado de manera exitosa',
                        icon: 'success'
                      });
                      console.log( resp.body.fileUrl);
                      this.ejecucionInicial = false;
                      this.showimg = false;
                      this.imgURLFinal = resp.body.fileUrl;
                      console.log(this.imgURLFinal);
                    }
                  }, (err: any) => {
                    this.mostrarError(err.error.message);

                  } );           
    } 
    this.files = [];
    this.selectedFile = false;
 
  
  }

 
  
}
