import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  forma!: FormGroup;
  files: File[] = [];
  selectedFile = false;
  
  constructor(private formBuilder: FormBuilder) { 
    this.createForm();
  }

  createForm(){
    this.forma = this.formBuilder.group({
      numeroDocumento: [Validators.required ]
    });
 }

  ngOnInit(): void {
  }

  onSelect(event) {
    if (event.addedFiles[0].type === 'text/plain' && this.files.length === 0) {
      this.files.push(...event.addedFiles);
      this.selectedFile = true;
    }
    else{
      Swal.fire('Error', 'Sólo se puedes adjuntar un único archivo, de tipo .txt', 'error');
      this.selectedFile = false;
    }
  }
  
  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.selectedFile = false;
  }

}
