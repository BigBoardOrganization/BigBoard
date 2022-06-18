import { PostsListModule } from '../../../components/posts-list/posts-list.module';
import { CategoriesBoardModule } from '../../../components/categories-board/categories-board.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './categories.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSidenavModule} from "@angular/material/sidenav";
import {FormsModule} from "@angular/forms";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CategoriesComponent,
  },
];

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CategoriesBoardModule,
    PostsListModule,

    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSidenavModule,
    FormsModule,
  ],
  exports: [CategoriesComponent],
})
export class CategoriesModule {}
