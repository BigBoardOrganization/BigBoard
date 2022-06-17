import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, children: [
      { path: '', loadChildren: () => import("./pages/main/main.module").then( module => module.MainModule) },
      { path: 'category/:id', loadChildren: () => import("./pages/main/main.module").then( module => module.MainModule) },
      { path: 'post/:id', loadChildren: () => import("./pages/post/post.module").then( module => module.PostModule) },

    ]
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
