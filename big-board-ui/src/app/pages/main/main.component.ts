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

      this.getPosts();
    });
  }

  public getPosts(): void {
    this.isLoading = true;
    this.postService.getAllPosts( this.pageable ).subscribe({
      next: (v) => {
        this.isLoading = false;
        this.postsData = v || {};
      },
      error: (e) => (this.isLoading = false),
    });
  }

  public search(value: string): void {
    // this.pageable = page;
    this.getPosts();
  }

  public pageChange(page: number): void {
    this.pageable.page = page;
    this.getPosts();
  }
}
