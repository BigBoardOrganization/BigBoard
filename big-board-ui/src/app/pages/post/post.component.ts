import { CategoryService } from '../../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  public postId: number = 0;

  public isLoading: boolean = true;

  public post: any = {};

  public categories: any[] = [];

  defaultImageUrl: string = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80";

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private postService: PostService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((res: any) => {
      this.postId = res.id;

      this.getPost();
      this.getCategories();
    });
  }

  public getPost(): void {
    this.isLoading = true;

    this.postService.getPost(this.postId).subscribe({
      next: (v) => {
        this.isLoading = false;
        this.post = v;
      },
      error: () => this.router.navigate(['/']),
    });
  }

  public getCategories(): void {
    this.categoryService.getAllCategories().subscribe({
      next: (v) => {
        this.categories = v.content;
      },
    });
  }

  public getCategoryNameId(id: number): string {
    const category = this.categories.find(i => i.id === id) || {};
    return category.name;
  }
}
