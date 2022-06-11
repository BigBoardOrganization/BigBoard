import { CategoryService } from './../../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-board',
  templateUrl: './categories-board.component.html',
  styleUrls: ['./categories-board.component.scss'],
})
export class CategoriesBoardComponent implements OnInit {
  public categories: any[] = [];

  public isLoading: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
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

  private getCategories(): void {
    this.isLoading = true;

    this.categoryService.getAllCategories().subscribe({
      next: (v) => {
        this.categories = v.content || [];
        this.categories.unshift(this.getDefaultCategory());
        this.isLoading = false;
      },
      error: (e) => {
        this.categories = [this.getDefaultCategory()];
        this.isLoading = false;
      }
    });
  }

  private getDefaultCategory(): any {
    return {
      icon: 'style icon',
      name: 'All',
      link: '',
    };
  }
}
