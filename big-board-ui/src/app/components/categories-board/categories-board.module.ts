import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesBoardComponent } from './categories-board.component';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CategoriesBoardComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatRippleModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  exports: [CategoriesBoardComponent],
})
export class CategoriesBoardModule {}
