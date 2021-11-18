import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  date = new Date().toDateString();

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void {

  }

  


  closeMenu() {

    if (!this.document.body.classList.contains('toggle-sidebar')) {
      this.renderer.addClass(this.document.body, 'toggle-sidebar');
    } else {
      this.renderer.removeClass(this.document.body, 'toggle-sidebar');
    }
  }


}
