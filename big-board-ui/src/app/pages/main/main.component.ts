import { CategoryService } from './../../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public activeCategoryId: number = 0;

  public postsData: any = {};

  public nameSearch: string = "";

  public isLoading: boolean = true;

  private pageable: any = {
    page: 0,
    size: 20,
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.activeCategoryId = res.id;
      this.nameSearch = "";

      this.getPosts();
    });
  }

  private getPosts() {
    const requestBody: any = {
      title: this.nameSearch,
      categories: []
    }

    if(this.activeCategoryId) {
      requestBody.categories = [this.activeCategoryId]
    }

    this.postService.getFilteredPosts(this.pageable, requestBody).subscribe({
      next: (v) => {
        this.isLoading = false;
        this.postsData = v || {};
      },
      error: (e) => (this.isLoading = false),
    });
  }

  public search(value: string): void {
    this.nameSearch = value.trim();
    this.getPosts();
  }

  public pageChange(page: number): void {
    this.pageable.page = page;
    this.getPosts();
  }
}
