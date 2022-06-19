import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PostService } from "../../../services/post/post.service";
import { PageEvent } from "@angular/material/paginator";
import { AuthenticationService } from "../../../services/authentication/authentication.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit, AfterViewInit, AfterViewChecked {

  private userId: number | undefined;

  private userRole: string | undefined;

  public postsData: any = {pageable: {}};

  public isLoading: boolean = true;

  private pageable: any = {
    page: 0,
    size: 7,
  };

  title: string = ""

  constructor(private postService: PostService,
              private authService: AuthenticationService,
              private changeDetector: ChangeDetectorRef,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.authService.currentUser.subscribe((value) => {
      this.userId = value.id
      this.userRole = value.userRole
    })
    this.getPosts()
  }

  ngAfterViewInit(): void {
    this.changeDetector.detectChanges();
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  public getPosts(): void {
    let requestBody = {};
    if (this.userRole === "ADMIN") {
      requestBody = {
        page: this.pageable.page,
        size: this.pageable.size
      }
    } else if (this.userRole === "CUSTOMER") {
      requestBody = {
        users: [this.userId],
        page: this.pageable.page,
        size: this.pageable.size
      }
    }

    this.getPostsByRequestBody(requestBody);
  }

  public pageChangeInput(event: PageEvent): void {
    this.pageable.page = event.pageIndex;
    this.getPosts();
  }

  public getPostsByTitle() {
    const requestBody: any = {
      title: this.title
    };

     if (this.userRole === "CUSTOMER") {
      requestBody.users = [this.userId];
    }

    this.getPostsByRequestBody(requestBody);
  }

  private getPostsByRequestBody(requestBody:{}) {
    this.postService.getFilteredPosts(this.pageable, requestBody).subscribe({
      next: (v) => {
        this.isLoading = false;
        this.postsData = v || {};
      },
      error: () => (this.isLoading = false),
    });
  }

  onCreateClick() {
    this.router.navigate(['create'], {relativeTo: this.route})
  }

  onEditClick(id: number) {
    this.router.navigate(['edit', id], {relativeTo: this.route})
  }

  onDeleteClick(id: number) {
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.getPosts()
      }
    });
  }
}
