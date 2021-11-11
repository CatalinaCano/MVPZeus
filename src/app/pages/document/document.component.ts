import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  files: File[] = [];
  selectedFile = false;

  constructor() { 
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


    if ((event.addedFiles[0].type === 'image/jpeg' || event.addedFiles[0].type === 'image/png') && this.files.length === 0) {
      this.files.push(...event.addedFiles);
      this.selectedFile = true;
    }
    else{
      this.mostrarError( 'Sólo se puedes adjuntar un  archivo de tipo .jpg o .png');
      this.selectedFile = false;
    }
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.selectedFile = false;
  }
  
  cargarArchivo(){
   
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(this.files[0]);
    reader.onload = () => {
                  const file = btoa(reader.result.toString());
    } 
    this.files = [];
    this.selectedFile = false;
 
  
  }

 
  
}
