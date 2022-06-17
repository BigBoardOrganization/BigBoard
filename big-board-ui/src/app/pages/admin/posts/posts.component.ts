import { Component, OnInit } from '@angular/core';
import {PostService} from "../../../services/post/post.service";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  types: string[] = ['Pages']

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    console.log(this.postService.getAllPosts(1))
  }

}
