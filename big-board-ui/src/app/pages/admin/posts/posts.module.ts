import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PostsComponent} from "./posts.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {RouterModule, Routes} from "@angular/router";
import {MatTableModule} from "@angular/material/table";

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
  ]
})
export class PostsModule { }
