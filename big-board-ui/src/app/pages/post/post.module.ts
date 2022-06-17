import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MatIconModule } from '@angular/material/icon';
import { PostsListModule } from '../../components/posts-list/posts-list.module';
import { CategoriesBoardModule } from '../../components/categories-board/categories-board.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostComponent } from './post.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: PostComponent,
  },
];

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CategoriesBoardModule,
    PostsListModule,
    MatIconModule,
    MatButtonModule,
    LazyLoadImageModule,

    MatProgressSpinnerModule,
  ],
  exports: [PostComponent],
})
export class PostModule {}
