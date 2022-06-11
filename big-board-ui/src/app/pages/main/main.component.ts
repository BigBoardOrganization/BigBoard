import { CategoryService } from './../../services/category/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public isLoading: boolean = true;

  public categories: any[] = [];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories()
  }

  private getCategories(): void {
    this.isLoading = true;

    this.categoryService.getAllCategories().subscribe(
      res => {
        this.categories = res.data;
        this.isLoading = false;
      },
      err => {
        this.isLoading = false;
      }
    )
  }

}
