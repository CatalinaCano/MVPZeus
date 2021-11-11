import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  files: File[] = [];
  selectedFile = false;
  imgURL: any;
  showimg= false;
  public imagePath;

  constructor(private sanitizer : DomSanitizer) { 
  }



  ngOnInit(): void {
  }




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
   
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(this.files[0]);
    reader.onload = () => {
                  const file = btoa(reader.result.toString());
                  this.imgURL = reader.result;
    } 
    this.files = [];
    this.selectedFile = false;
 
  
  }

 
  
}
