import { FooterModule } from './../../components/footer/footer.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout.component';
import { HeaderModule } from 'src/app/components/header/header.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: DefaultLayoutComponent
  }
];

@NgModule({
  declarations: [
    DefaultLayoutComponent,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    DefaultLayoutComponent
  ]
})
export class DefaultLayoutModule {
}
