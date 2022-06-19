import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post/post.service";
import {PageEvent} from "@angular/material/paginator";
import {AuthenticationService} from "../../../services/authentication/authentication.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

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
              private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.authService.currentUser.subscribe( (value) => {
      this.userId = value.id
      this.userRole = value.userRole
    })
    this.getPosts()
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

  public pageChangeInput(event: PageEvent): void{
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
      error: (e) => (this.isLoading = false),
    });
  }

}
