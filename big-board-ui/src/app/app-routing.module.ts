import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';

const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, children: [
      { path: '', loadChildren: () => import("./pages/main/main.module").then( module => module.MainModule) },
      { path: 'category/:id', loadChildren: () => import("./pages/main/main.module").then( module => module.MainModule) },
      { path: 'post/:id', loadChildren: () => import("./pages/post/post.module").then( module => module.PostModule) },

      { path: 'signin', loadChildren: () => import("./pages/login/login.module").then( module => module.LoginModule) },
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard],  children: [
      { path: '', loadChildren: () => import("./pages/admin/posts/posts.module").then( module => module.PostsModule) },
    ]
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
