import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DefaultLayoutModule } from './layouts/default-layout/default-layout.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AdminLayoutModule } from './layouts/admin-layout/admin-layout.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PostCreateEditComponent } from './components/post-create-edit/post-create-edit.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { ReactiveFormsModule } from "@angular/forms";
import { CategoryCreateEditComponent } from './components/category-create-edit/category-create-edit.component';
import {MatIconModule} from "@angular/material/icon";
import {MatSelectModule} from "@angular/material/select";


@NgModule({
  declarations: [
    AppComponent,
    PostCreateEditComponent,
    CategoryCreateEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DefaultLayoutModule,
    AdminLayoutModule,
    BrowserAnimationsModule,
    LazyLoadImageModule,
    MatSidenavModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule
  ],
  providers: [],
  exports: [
    PostCreateEditComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
