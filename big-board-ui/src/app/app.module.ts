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


@NgModule({
  declarations: [
    AppComponent,
    PostCreateEditComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  exports: [
    PostCreateEditComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
