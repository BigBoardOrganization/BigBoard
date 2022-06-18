import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsComponent} from "./posts.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {RouterModule, Routes} from "@angular/router";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PostsListModule} from "../../../components/posts-list/posts-list.module";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostsComponent,
  },
];


@NgModule({
  declarations: [PostsComponent],
  exports: [
    PostsComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    PostsListModule,
    FormsModule,
  ]
})
export class PostsModule { }
