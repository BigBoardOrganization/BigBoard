import { PostsListModule } from '../../components/posts-list/posts-list.module';
import { CategoriesBoardModule } from './../../components/categories-board/categories-board.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: MainComponent,
  },
];

@NgModule({
  declarations: [MainComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CategoriesBoardModule,
    PostsListModule,

    MatProgressSpinnerModule,
  ],
  exports: [MainComponent],
})
export class MainModule {}
