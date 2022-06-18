import { FooterModule } from '../../components/footer/footer.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout.component';
import { HeaderModule } from 'src/app/components/header/header.module';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {PostsModule} from "../../pages/admin/posts/posts.module";
import {CategoriesModule} from "../../pages/admin/categories/categories.module";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminLayoutComponent
  }
];

@NgModule({
  declarations: [
    AdminLayoutComponent,
  ],
    imports: [
        CommonModule,
        HeaderModule,
        FooterModule,
        RouterModule.forChild(routes),
        MatSidenavModule,
        MatListModule,
        PostsModule,
        CategoriesModule,
    ],
  exports: [
    AdminLayoutComponent
  ]
})
export class AdminLayoutModule {
}
