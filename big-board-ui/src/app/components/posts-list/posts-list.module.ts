import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsListComponent } from './posts-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    PostsListComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule
  ],
  exports: [
    PostsListComponent
  ]
})
export class PostsListModule {
}
