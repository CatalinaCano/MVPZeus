import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {

  forma!: FormGroup;
  
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

}
