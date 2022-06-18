import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  pages: string[] = ['Posts', 'Categories']

  selectedPage: string = '';

  constructor() { }

  ngOnInit(): void {
  }

  public getSelectedPageData(event:any) {
    this.selectedPage = event.options[0].value
  }

}
