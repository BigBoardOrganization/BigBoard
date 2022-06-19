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

  @Output('search') search: EventEmitter<string> = new EventEmitter<string>();

  @Output('pageChange') pageChange: EventEmitter<number> = new EventEmitter<number>();

  defaultImageUrl: string = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80";

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
