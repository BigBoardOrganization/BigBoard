import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  public options: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.setOptions();
  }


  private setOptions(): void {
    this.options = [
      {
        title: 'Visit Profile',
        icon: 'person',
        action: () => {}
      }
    ]
  }

}
