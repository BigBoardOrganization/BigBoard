import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {CategoryService} from "../../../services/category/category.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categoriesData: any = {pageable: {}};

  public isLoading: boolean = true;

  private pageable: any = {
    page: 0,
    size: 7,
  };

  public name: string = '';

  constructor(private categoryService: CategoryService, private router: Router,) { }

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(): void {
    this.isLoading = true;
    this.categoryService.getPageOfCategories(this.name, this.pageable).subscribe({
      next: (v) => {
        this.isLoading = false;
        this.categoriesData = v || {};
      },
      error: (e) => (this.isLoading = false),
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
    if(id) {
      this.router.navigate(['/category/' + id]);
    }
    else {
      this.router.navigate(['/'])
    }
  }

}
