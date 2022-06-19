import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  pages: string[] = ['Posts', 'Categories']

  selectedPage: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.checkPageSelected()
  }

  public getSelectedPageData(event: any) {
    this.selectedPage = event.options[0].value
    this.routeToSelectedPage()
  }

  private routeToSelectedPage() {
    console.log(this.selectedPage)
    this.router.navigate([this.selectedPage.toLowerCase()], {relativeTo: this.route})
  }

  private checkPageSelected() {
    let url: string = this.router.url;
    let afterAdmin = url.substring(url.lastIndexOf("admin") + 5)
    if (afterAdmin.startsWith("/posts")) {
      this.selectedPage = "Posts"
    } else if (afterAdmin.startsWith("/categories")) {
      this.selectedPage = "Categories"
    }
  }

}
