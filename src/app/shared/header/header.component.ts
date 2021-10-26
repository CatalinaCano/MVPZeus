import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  date = new Date().toDateString();

  constructor() { }

  ngOnInit(): void {
  }

}
