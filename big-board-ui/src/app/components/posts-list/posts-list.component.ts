import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  @Input('data') data: any = {};

  @Input('isLoading') isLoading: boolean = true;

  @Input('searchValue') searchValue: string = "";

  @Output('search') search: EventEmitter<string> = new EventEmitter<string>();

  @Output('pageChange') pageChange: EventEmitter<number> =
    new EventEmitter<number>();

  defaultImageUrl: string = "https://cdn.dribbble.com/users/844846/screenshots/2855815/no_image_to_show_.jpg";

  constructor() {
  }

  ngOnInit(): void {
  }

  public searchInput(event: any): void {
    this.search.emit(event.target.value);
  }

  public pageChangeInput(event: PageEvent): void {
    this.pageChange.emit(event.pageIndex);
  }
}
