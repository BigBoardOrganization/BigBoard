import { SignupModule } from './pages/signup/signup.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { DefaultLayoutComponent } from './layouts/default-layout/default-layout.component';
import { PostCreateEditComponent } from "./components/post-create-edit/post-create-edit.component";
import { PostsComponent } from "./pages/admin/posts/posts.component";
import { CategoriesComponent } from "./pages/admin/categories/categories.component";
import {CategoryCreateEditComponent} from "./components/category-create-edit/category-create-edit.component";

const routes: Routes = [
  {
    path: '', component: DefaultLayoutComponent, children: [
      {path: '', loadChildren: () => import("./pages/main/main.module").then(module => module.MainModule)},
      {path: 'category/:id', loadChildren: () => import("./pages/main/main.module").then(module => module.MainModule)},
      {path: 'post/:id', loadChildren: () => import("./pages/post/post.module").then(module => module.PostModule)},
      {path: 'profile', loadChildren: () => import("./pages/user-profile/user-profile.module").then(module => module.UserProfileModule), canActivate: [AuthGuard]},
      {path: 'signin', loadChildren: () => import("./pages/login/login.module").then(module => module.LoginModule)},
      {path: 'signup', loadChildren: () => import("./pages/signup/signup.module").then(module => module.SignupModule)},
    ]
  },
  {
    path: 'admin', component: AdminLayoutComponent, canActivate: [AuthGuard], children: [
      {path: 'posts', component: PostsComponent, canActivate: [AuthGuard]},
      {path: 'categories', component: CategoriesComponent, canActivate: [AuthGuard]},
      {path: 'posts/create', component: PostCreateEditComponent, canActivate: [AuthGuard]},
      {path: 'posts/edit/:postId', component: PostCreateEditComponent, canActivate: [AuthGuard]},
      {path: 'categories/create', component: CategoryCreateEditComponent, canActivate: [AuthGuard]},
      {path: 'categories/edit/:postId', component: CategoryCreateEditComponent, canActivate: [AuthGuard]},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
