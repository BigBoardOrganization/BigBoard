import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PageEvent } from "@angular/material/paginator";
import { CategoryService } from "../../../services/category/category.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, AfterViewInit, AfterViewChecked {

  public categoriesData: any = {pageable: {}};

  public isLoading: boolean = true;

  public isAdmin: boolean = false;

  private pageable: any = {
    page: 0,
    size: 7,
  };

  public name: string = '';

  constructor(private categoryService: CategoryService,
              private router: Router,
              private authService: AuthenticationService,
              private changeDetector: ChangeDetectorRef,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((value) => {
      this.isAdmin = value.userRole === "ADMIN"
    })
    this.getCategories();
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  public getCategories(): void {
    this.isLoading = true;
    this.categoryService.getPageOfCategories(this.name, this.pageable).subscribe({
      next: (v) => {
        this.isLoading = false;
        this.categoriesData = v || {};
      },
      error: () => (this.isLoading = false),
    });

  }

  public pageChangeInput(event: PageEvent): void {
    this.pageable.page = event.pageIndex;
    this.getCategories();
  }

  public getCategoriesByName() {
    this.getCategories();
  }

  public loadCategory(id: number): void {
    if (id) {
      this.router.navigate(['/category/' + id]);
    } else {
      this.router.navigate(['/'])
    }
  }

  onCreateClick() {
    this.router.navigate(['create'], {relativeTo: this.route})
  }


}
